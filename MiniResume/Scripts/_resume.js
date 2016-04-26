
var app = angular.module("resume", ["ngResource", "ngRoute"]);

app.factory("trabajoService", function ($resource) {
    return $resource('/api/trabajoes/:id',
        { id: '@id' }, {
            update: { method: 'PUT' }
        });
});

app.factory("personaService", function ($resource) {
    return $resource('/api/personas/:id',
    { id: '@id' },
    {
        update: { method: 'PUT' }
    });
});

app.controller("mainController", function ($scope) {


});

app.controller("trabajoController", function ($scope, trabajoService) {


    $scope.trabajoes = trabajoService.query();

    $scope.trabajo = {
        Id: 0,
        Titulo: '',
        Fecha: '',
        PersonaId: 0
    };

    $scope.deleteTrabajo = function (trabajo) {
        trabajoService.remove(trabajo, $scope.refreshData);
    };

    $scope.refreshData = function () {
        $scope.trabajoes = trabajoService.query();
    };

    $scope.showAddDialog = function () {
        $('#modal-dialog').modal('show');
    };

    $scope.saveTrabajo = function () {
        trabajoService.save($scope.trabajo, $scope.refreshData);
        $('#modal-dialog').modal('hide');
        $scope.clearCurrentTrabajo();

    };

    $scope.clearCurrentTrabajo = function () {
        $scope.persona = {
            Id: 0,
            Titulo: '',
            Fecha: '',
            PersonaId: 0
        };
    };


});

app.controller("personaController", function ($scope, personaService) {

    $scope.title = '';
    $scope.errors = [];

    $scope.errorMessage = function (response) {
        var errors = [];
        for (var key in response.data.ModelState) {
            for (var i = 0; i < response.data.ModelState[key].length; i++) {
                errors.push(response.data.ModelState[key][i]);
            }
        }
        $scope.errors = errors;
    };

    $scope.personas = personaService.query();

    $scope.persona = {
        Id: 0,
        Nombre: '',
        Correo: ''
    };

    $scope.selectPersona = function (prsn) {
        $scope.persona = prsn;
        $scope.showAddDialog();
        $scope.showUpdateDialog();
    };

    $scope.deletePersona = function (persona) {
        personaService.remove(persona, $scope.refreshData, $scope.errorMessage);
    };

    $scope.refreshData = function () {
        $scope.personas = personaService.query();
        $('#modal-dialog').modal('hide');
    };

    $scope.showUpdateDialog = function () {
        $scope.title = 'Actualizar Persona';
        $('#modal-dialog').modal('show');
    };

    $scope.showAddDialog = function () {
        $scope.clearCurrentPersona;
        $scope.clearErrors();
        $scope.title = 'Anadir Persona';
        $('#modal-dialog').modal('show');
    };

    $scope.clearErrors = function () {
        $scope.errors = [];
    };

    $scope.savePersona = function () {
        if ($scope.persona.Id > 0) {
            personaService.update($scope.persona, $scope.refreshData, $scope.errorMessage);
        } else {
            personaService.save($scope.persona, $scope.refreshData, $scope.errorMessage);
        }

    };

    $scope.clearCurrentPersona = function () {
        $scope.persona = { Id: 0, Name: '' };
    };

});

app.config(function ($routeProvider) {
    $routeProvider
    .when('/', {
        controller: "mainController"
    })
    .when('/trabajos', {
        templateUrl: "/Content/Views/Trabajos.html",
        controller: "trabajoController"
    })
    .when('/personas', {
        templateUrl: "/Content/Views/Personas.html",
        controller: "personaController"
    })
});