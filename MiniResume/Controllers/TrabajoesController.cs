using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using MiniResume.Models;

namespace MiniResume.Controllers
{
    public class TrabajoesController : ApiController
    {
        private ResumeContext db = new ResumeContext();

        // GET: api/Trabajoes
        public IQueryable<Trabajo> GetTrabajo()
        {
            return db.Trabajo;
        }

        // GET: api/Trabajoes/5
        [ResponseType(typeof(Trabajo))]
        public IHttpActionResult GetTrabajo(int id)
        {
            Trabajo trabajo = db.Trabajo.Find(id);
            if (trabajo == null)
            {
                return NotFound();
            }

            return Ok(trabajo);
        }

        // PUT: api/Trabajoes/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutTrabajo(int id, Trabajo trabajo)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != trabajo.Id)
            {
                return BadRequest();
            }

            db.Entry(trabajo).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TrabajoExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Trabajoes
        [ResponseType(typeof(Trabajo))]
        public IHttpActionResult PostTrabajo(Trabajo trabajo)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Trabajo.Add(trabajo);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = trabajo.Id }, trabajo);
        }

        // DELETE: api/Trabajoes/5
        [ResponseType(typeof(Trabajo))]
        public IHttpActionResult DeleteTrabajo(int id)
        {
            Trabajo trabajo = db.Trabajo.Find(id);
            if (trabajo == null)
            {
                return NotFound();
            }

            db.Trabajo.Remove(trabajo);
            db.SaveChanges();

            return Ok(trabajo);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool TrabajoExists(int id)
        {
            return db.Trabajo.Count(e => e.Id == id) > 0;
        }
    }
}