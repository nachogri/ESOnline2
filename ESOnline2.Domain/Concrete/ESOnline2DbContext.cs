using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Data.Entity;
using ESOnline2.Domain.Entities;


namespace ESOnline2.Domain.Concrete
{
    public class ESOnline2DbContext: DbContext 
    {
        public ESOnline2DbContext(): base("name=ESOnline2DbContext")
        { 
                                     
        }

        public DbSet<Cliente> Clientes { get; set; }
        public DbSet<Direccion> Direcciones { get; set; }
        public DbSet<Email> Emails { get; set; }
        public DbSet<Telefono> Telefonos { get; set; }
        public DbSet<Web> Webs { get; set; }
    }
}
