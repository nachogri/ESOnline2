using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ESOnline2.Domain
{
    [MetadataType(typeof(WebMetadata))]
    public partial class Web
    {
    }

    public class WebMetadata {
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
        public int Cliente_ID { get; set; }

        public virtual Cliente Cliente { internal get; set; }
    }
}
