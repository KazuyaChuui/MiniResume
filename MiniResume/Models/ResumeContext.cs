using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace MiniResume.Models
{
    public class ResumeContext: DbContext
    {

        public DbSet<Persona> Persona { get; set; }

        public DbSet<Trabajo> Trabajo { get; set; }

    }
}