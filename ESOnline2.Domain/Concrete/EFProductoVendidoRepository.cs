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
        private ESOnlineDBEntities context;

        public EFProductoVendidoRepository(ESOnlineDBEntities pContext)
        {
            context = pContext;
        }


        public IEnumerable<ProductoVendido> GetAll()
        {
           context.ProductosVendidos.Include("Producto").ToList();            

            return context.ProductosVendidos.AsEnumerable();              
        }

        public IEnumerable<ProductoVendido> GetProductosVencidos()
        {
            context.ProductosVendidos.Include("Producto").ToList();

            DateTime fromDate = DateTime.Today.AddYears(-2);
            DateTime expirationDate=DateTime.Today;
            return context.ProductosVendidos.Where(p => p.FechaVencimiento > fromDate && p.FechaVencimiento <= expirationDate).AsEnumerable();
        }
    }
}
