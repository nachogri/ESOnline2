using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ESOnline2.Domain.Abstract;

namespace ESOnline2.Domain.Concrete
{
    public class EFProductoVendidoRepository:IProductoVendidoRepository
    {
        private ESOnlineDBEntities context = new ESOnlineDBEntities();
        public IEnumerable<ProductoVendido> GetAll()
        {
            context.Dispose();
            context = new ESOnlineDBEntities();
            
            context.ProductosVendidos.Include("Producto").ToList(); 
            return context.ProductosVendidos.AsEnumerable();
        }
    }
}
