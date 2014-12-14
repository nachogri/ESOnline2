using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ESOnline2.Domain.Entities
{
   [Table("Telefonos")]
    public class Telefono
    {        
        [Key]
        [DatabaseGenerated(System.ComponentModel.DataAnnotations.Schema.DatabaseGeneratedOption.Identity)]
        public int ID { get; set; }

        [Required(ErrorMessage = "Por favor seleccione un tipo de teléfono")]
        [Display(Name="Tipo de teléfono")]        
        public string Tipo { get; set; }

        [Required(ErrorMessage = "Por favor introduzca el número")]
        [Display(Name = "Número")]        
        [DataType(DataType.PhoneNumber)]
        public string Numero { get; set; }
    }
       
}
