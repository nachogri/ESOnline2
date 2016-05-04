using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using ESOnline2.Domain.Abstract;
using ESOnline2.Domain;

namespace ESOnline2.Domain.Concrete
{
    public class EFProductoRepository:IProductoRepository
    {
        private ESOnlineDBEntities context;        

        public EFProductoRepository(ESOnlineDBEntities pContext)
        {
            context = pContext;
        }

        public IEnumerable<Producto> GetAll()
        {            
            return context.Productos.AsEnumerable();
        }

        public Producto Get(int id)
        {
            return context.Productos.Find(id);
        }

        public Producto Add(Producto producto)
        {
            if (producto == null)
            {
                throw new ArgumentNullException("Producto");
            }

            context.Productos.Add(producto);
            context.SaveChanges();

            return producto;
        }

        public void Remove(int id)
        {
            Producto producto = context.Productos.Find(id);
            context.Productos.Remove(producto);                        
            context.SaveChanges();

            //context.Dispose();
            //context = new ESOnlineDBEntities();
        }

        public bool Update(Producto producto)
        {
            if (producto == null)
            {
                throw new ArgumentNullException("Producto");
            }

            Producto dbentry = context.Productos.Find(producto.ID);

            if (dbentry != null)
            {
                dbentry.Nombre = producto.Nombre;
                dbentry.Vencimiento = producto.Vencimiento;
                dbentry.Imagen = producto.Imagen;                
            }

            context.SaveChanges();
            return true;
        }
    }
}
