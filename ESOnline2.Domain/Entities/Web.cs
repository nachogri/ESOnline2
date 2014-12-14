using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ESOnline2.Domain.Entities
{
   [Table("Webs")]
    public class Web
    {
        [Key]
        [DatabaseGenerated(System.ComponentModel.DataAnnotations.Schema.DatabaseGeneratedOption.Identity)]
        public int ID { get; set; }

        [Required(ErrorMessage = "Por favor seleccione un tipo de web")]
        [Display(Name = "Tipo de web")]        
        public string Tipo { get; set; }

        [Required]
        [Display(Name = "URL")]
        [DataType(DataType.Url,ErrorMessage = "Por favor introduzca una url válida")]
        public string URL { get; set; }
    }

}
