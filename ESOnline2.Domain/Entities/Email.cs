using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ESOnline2.Domain.Entities
{
    [Table("Emails")]
    public class Email
    {
        [Key]
        [DatabaseGenerated(System.ComponentModel.DataAnnotations.Schema.DatabaseGeneratedOption.Identity)]
        public int ID { get; set; }

        [Required(ErrorMessage = "Por favor seleccione un tipo de email")]
        [Display(Name = "Tipo de Email")]        
        public string Tipo { get; set; }

        [Required(ErrorMessage = "Por favor introduzca una casilla")]
        [Display(Name = "Casilla")]
        [DataType(DataType.EmailAddress,ErrorMessage = "El formato de la casilla es inválido")]        
        public string Casilla { get; set; }
    }
  
}
