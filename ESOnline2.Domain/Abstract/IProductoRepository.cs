using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using ESOnline2.Domain.Entities;

namespace ESOnline2.Domain.Abstract
{
    public interface IProductoRepository
    {
        IEnumerable<Producto> GetAll();
        Producto Get(int id);
        Producto Add(Producto producto);
        void Remove(int id);
        bool Update(Producto producto);
    }
}
