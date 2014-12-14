using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ESOnline2.Domain.Entities
{
   [Table("Contactos")]
    public class Contacto
    {
        [Key]
        [DatabaseGenerated(System.ComponentModel.DataAnnotations.Schema.DatabaseGeneratedOption.Identity)]
        public int ID { get; set; }

        [Required(ErrorMessage = "Por favor introduzca el nombre del contacto")]
        [Display(Name="Nombre del contacto")]        
        public string Nombre { get; set; }

        [Display(Name = "Cargo del contacto")]
        public string Cargo { get; set; }
    }
}
