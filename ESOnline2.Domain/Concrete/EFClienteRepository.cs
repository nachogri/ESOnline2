using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using ESOnline2.Domain.Abstract;
using ESOnline2.Domain;

namespace ESOnline2.Domain.Concrete
{
    public class EFClienteRepository: IClienteRepository
    {
        private ESOnlineDBEntities context = new ESOnlineDBEntities();
               
        public EFClienteRepository()
        {
                             
        }

        public IEnumerable<Cliente> GetAll()
        {
            return context.Clientes.AsEnumerable();
        }

        public Cliente Get(int id)
        {
           
            return context.Clientes.Find(id);
        }

        public Cliente Add(Cliente cliente)
        {
            if (cliente == null)
            {
                throw new ArgumentNullException("Cliente");
            }
          

            context.Clientes.Add(cliente);
            context.SaveChanges();

            return cliente;
        }

        public void Remove(int id)
        {
           
            Cliente cliente = context.Clientes.Find(id);
            context.Clientes.Remove(cliente);

            context.SaveChanges();
        }

        public bool Update(Cliente cliente)
        {
            if (cliente == null)
            {
                throw new ArgumentNullException("Cliente");
            }
           
            Cliente dbentry = context.Clientes.Find(cliente.ID);
            
            if (dbentry != null)
            {
                dbentry.Nombre = cliente.Nombre;
                dbentry.Apellido = cliente.Apellido;
                dbentry.CUIL = cliente.CUIL;
                dbentry.CUIT = cliente.CUIT;
                dbentry.Notas = cliente.Notas;
                dbentry.Imagen = cliente.Imagen;
                dbentry.Favorito = cliente.Favorito;
                dbentry.Direcciones = cliente.Direcciones;
                dbentry.Emails = cliente.Emails;
                dbentry.Telefonos = cliente.Telefonos;
                dbentry.Webs = cliente.Webs;
                
                dbentry.ProductosVendidos = cliente.ProductosVendidos;
            }


            context.SaveChanges();
            return true;
        }
    }
}
