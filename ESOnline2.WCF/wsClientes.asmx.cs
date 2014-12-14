using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.Script.Serialization;
using System.Web.Script.Services;
using ESOnline2.Domain.Concrete;


namespace ESOnline2.WCF
{
    /// <summary>
    /// Summary description for wsClientes
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [ScriptService]
    public class wsClientes : System.Web.Services.WebService
    {

        [WebMethod]
        [ScriptMethod(ResponseFormat= ResponseFormat.Json)]
        public string GetClientes()
        {
            JavaScriptSerializer jsonSerializer = new JavaScriptSerializer();            
            EFClienteRepository clienteRepo = new EFClienteRepository();
            
            return jsonSerializer.Serialize(clienteRepo.GetAll());                 
        }
    }
}
