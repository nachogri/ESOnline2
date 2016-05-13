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
        private ESOnlineDBEntities context;
               
        public EFClienteRepository(ESOnlineDBEntities context)
        {
            this.context = context;
        }

        public IEnumerable<Cliente> GetAll()
        {
           context.ProductosVendidos.Include("Producto").ToList();

            IEnumerable<Cliente> clientes=context.Clientes.AsEnumerable();
            
            return context.Clientes.AsEnumerable();
        }

        public IEnumerable<Cliente> GetAllWithVencimientos()
        {         
            context.ProductosVendidos.Include("Producto").ToList();

            IEnumerable<Cliente> clientes = context.Clientes.AsEnumerable();

            foreach (Cliente cli in clientes)
            {
                CalculateVencimientos(cli);
            }

            return clientes.Where(c => c.ProductosVencidos.Count >= 1);
        }

        public Cliente Get(int id)
        {
            Cliente cliente = new Cliente();
            try
            {
                cliente = context.Clientes.Find(id);
            }
            catch (InvalidOperationException invOperEx)
            {                
                context = new ESOnlineDBEntities();    
                cliente = context.Clientes.Find(id);                
            }           
                        
            CalculateVencimientos(cliente);

            return cliente;
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


        private static void CalculateVencimientos(Cliente cli)
        {        
            cli.ProductosVigentes = new HashSet<ProductoVendido>();        
            cli.ProductosVencidos = new HashSet<ProductoVendido>();

            foreach (ProductoVendido prod in cli.ProductosVendidos)
            {
                if (prod.FechaVencimiento <= DateTime.Today.AddYears(-4))
                    cli.ProductosVencidos.Add(prod);
                else
                    cli.ProductosVigentes.Add(prod);
            }
        }
        
    }
}
