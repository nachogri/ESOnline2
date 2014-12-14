using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using ESOnline2.Domain.Entities;

namespace ESOnline2.Domain.Abstract
{
    public interface IClienteRepository
    {
        IEnumerable<Cliente> GetAll();
        Cliente Get(int id);
        Cliente Add(Cliente cliente);
        void Remove(int id);
        bool Update(Cliente cliente);
    }
}
