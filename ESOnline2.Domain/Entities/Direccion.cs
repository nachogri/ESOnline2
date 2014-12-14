using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ESOnline2.Domain.Entities
{
   [Table("Direcciones")]
    public class Direccion
    {

        [Key]
        [DatabaseGenerated(System.ComponentModel.DataAnnotations.Schema.DatabaseGeneratedOption.Identity)]
        public int ID { get; set; }
        
        [Required(ErrorMessage = "Por favor seleccione el tipo de dirección")]
        [Display(Name = "Tipo de dirección")]
        public string Tipo { get; set; }

        [Required]
        [Display(Name = "Descripcion")]
        public string Descripcion { get; set; }

        //[Required]
        //[Display(Name = "Linea 1")]
        //public string Linea1 { get; set; }

        //[Display(Name = "Linea 2")]
        //public string Linea2 { get; set; }

        //[Required(ErrorMessage = "Por favor seleccione una ciudad")]
        //[Display(Name = "Ciudad")]
        //public Ciudad Ciudad { get; set; }

        //[Required(ErrorMessage = "Por favor seleccione una provincia")]
        //[Display(Name = "Provincia")]
        //public Provincia Provincia { get; set; }

        //[Display(Name = "Código Postal")]
        //public string CP { get; set; }

        //[Display(GroupName = "Contactos")]
        //public string Contacto { get; set; }

        //[Display(Name = "Horarios de atención")]
        //public string HorariosAtencion { get; set; }
    } 

}
