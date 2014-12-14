using System;
using System.Web.Mvc;
using System.Web.Routing;
using Ninject;
using ESOnline2.Domain.Entities;
using ESOnline2.Domain.Abstract;
using ESOnline2.Domain.Concrete;
using System.Collections.Generic;
using System.Linq;
using Moq;

namespace ESOnline2.WebUI.Infrastructure
{
    public class NinjectControllerFactory: DefaultControllerFactory
    {
        private IKernel ninjectKernel;

        public NinjectControllerFactory()
        {
            ninjectKernel = new StandardKernel();
            AddBidings();
        }

        protected override IController GetControllerInstance(RequestContext requestContext, Type controllerType)
        {
            return controllerType == null ? null : (IController)ninjectKernel.Get(controllerType);
        }

        private void AddBidings() 
        {
            //Mock<IClienteRepository> mock = new Mock<IClienteRepository>();
            //mock.Setup(m => m.Clientes).Returns(new List<Cliente>{ 
            //    new Cliente{ Nombre="Nacho", Apellido="Gri"},
            //    new Cliente{ Nombre="Meli", Apellido="Ongaro"},
            //    new Cliente{ Nombre="Franco", Apellido="Gri"}
            //}.AsQueryable());

            ninjectKernel.Bind<IClienteRepository>().To<EFClienteRepository>();
        }
    }
}