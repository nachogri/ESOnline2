using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ESOnline2.Domain.Entities
{
    
    public enum TipoTelefono
    {      
           Casa,
           Movil,
           Trabajo,
           Fax,           
           Pager,
           Otro,
           Personalizado        
    }

}
