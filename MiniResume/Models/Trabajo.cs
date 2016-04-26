using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace MiniResume.Models
{
    public class Trabajo
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Titulo { get; set; }
        [Required]
        public string Fecha { get; set; }
        public int PersonaId { get; set; }

        [ForeignKey("PersonaId")]
        public Persona Persona { get; set; }
    }
}