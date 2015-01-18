using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ESOnline2.Domain
{
     [MetadataType(typeof(DireccionMetadata))]
    public partial class Direccion
    {
    }

    public class DireccionMetadata
    {
        [Key]
        [DatabaseGenerated(System.ComponentModel.DataAnnotations.Schema.DatabaseGeneratedOption.Identity)]
        public int ID { get; set; }
        
        [Required(ErrorMessage = "Por favor seleccione el tipo de dirección")]
        [Display(Name = "Tipo de dirección")]
        public string Tipo { get; set; }

        [Required(ErrorMessage = "Por favor ingrese una dirección")]
        [Display(Name = "Descripcion")]
        public string Descripcion { get; set; }
        
        public int Cliente_ID { get; set; }

        public virtual Cliente Cliente { internal get; set; }
    }

}
