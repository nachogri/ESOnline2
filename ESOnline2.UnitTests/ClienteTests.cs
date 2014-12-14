using System;
using System.Text;
using System.Collections.Generic;
using System.Linq;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using ESOnline2.Domain.Abstract;
using ESOnline2.Domain.Entities;
using ESOnline2.WebUI.Controllers;
using System.Web.Mvc;
using Moq;

namespace ESOnline2.UnitTests
{   
    [TestClass]
    public class ClienteTests
    {
        public ClienteTests()
        {
           
        }

        private TestContext testContextInstance;
        
       
        public TestContext TestContext
        {
            get
            {
                return testContextInstance;
            }
            set
            {
                testContextInstance = value;
            }
        }

        [TestMethod]
        public void Index_Contains_All_Clientes()
        {
            //Create a Mock repository
            Mock<IClienteRepository> mock = new Mock<IClienteRepository>();
            mock.Setup(m=>m.Clientes).Returns(new Cliente[]{
            new Cliente{ID=1,Nombre="Nacho"},
            new Cliente{ID=2,Nombre="Melisa"},
            new Cliente{ID=3,Nombre="Franco"}
            }.AsQueryable());

            //Arrange - create a controller
            ClienteController target = new ClienteController(mock.Object);
            
            //Action
            Cliente[] result = ((IEnumerable<Cliente>)target.Index().ViewData.Model).ToArray();

            //Assert
            Assert.AreEqual(result.Length, 3);
            Assert.AreEqual("Nacho", result[0].Nombre);
            Assert.AreEqual("Melisa", result[1].Nombre);
            Assert.AreEqual("Franco", result[2].Nombre);
        }

        [TestMethod]
        public void Can_Edit_Cliente()
        { 
            //Arrange - create a mock repository
            Mock<IClienteRepository> mock = new Mock<IClienteRepository>();
            mock.Setup(m => m.Clientes).Returns(new Cliente[]{
                new Cliente{ ID=1, Nombre="Nacho"},
                new Cliente{ ID=2, Nombre="Melisa"},
                new Cliente{ ID=3, Nombre="Franco"}}.AsQueryable());
            //Arrange - create the controller
            ClienteController target = new ClienteController(mock.Object);

            //Act
            Cliente c1 = target.Edit(1).ViewData.Model as Cliente;
            Cliente c2 = target.Edit(2).ViewData.Model as Cliente;
            Cliente c3 = target.Edit(3).ViewData.Model as Cliente;

            //Assert
            Assert.AreEqual(1, c1.ID);
            Assert.AreEqual(2, c2.ID);
            Assert.AreEqual(3, c3.ID);
        }

        [TestMethod]
        public void Cannot_Edit_NonExistent_Cliente() 
        {
         //Arrange - create the mock repository
            Mock<IClienteRepository> mock = new Mock<IClienteRepository>();
            mock.Setup(m => m.Clientes).Returns(new Cliente[]{
                new Cliente{ID=1,Nombre="Nacho"},
                new Cliente{ID=2,Nombre="Melisa"},
                new Cliente{ID=3,Nombre="Franco"}
            }.AsQueryable());

            //Arrange - crate the controller
            ClienteController target = new ClienteController(mock.Object);

            //Act
            Cliente result = (Cliente)target.Edit(4).ViewData.Model;

            //Assert
            Assert.IsNull(result);
        }

        [TestMethod]
        public void Can_Save_Valid_Changes()
        { 
            //Arrange - create mock repository
            Mock<IClienteRepository> mock = new Mock<IClienteRepository>();

            //Arrange - create the controller
            ClienteController target = new ClienteController(mock.Object);

            //Arrange - create a cliente
            Cliente cliente = new Cliente();
            cliente.Nombre = "Test";

            //Act - try to save the cliente
            ActionResult result =target.Edit(cliente);

            //Assert - check that the repository was called
            mock.Verify(m => m.SaveCliente(cliente));

            //Assert - check the method result type
            Assert.IsNotInstanceOfType(result,typeof(ViewResult));
        }

        [TestMethod]
        public void Can_Save_Invalid_Changes()
        {
            //Arrange - create mock repository
            Mock<IClienteRepository> mock = new Mock<IClienteRepository>();

            //Arrange - create the controller
            ClienteController target = new ClienteController(mock.Object);

            //Arrange - create a cliente
            Cliente cliente = new Cliente();
            cliente.Nombre = "Test";

            //Arrange - add an error to the model state
            target.ModelState.AddModelError("error", "error");

            //Act - try to save the error
            ActionResult result = target.Edit(cliente);

            //Assert - check that the repository was not called
            mock.Verify(m => m.SaveCliente(It.IsAny<Cliente>()), Times.Never());

            //Assert - check the method result type
            Assert.IsInstanceOfType(result,typeof(ViewResult));

        }
    }
}
