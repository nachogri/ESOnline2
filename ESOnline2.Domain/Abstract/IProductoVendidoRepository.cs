using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ESOnline2.Domain.Abstract
{
    public interface IProductoVendidoRepository
    {
        IEnumerable<ProductoVendido> GetAll();

        IEnumerable<ProductoVendido> GetProductosVencidos();
    }
}
