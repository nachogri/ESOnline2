using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ESOnline2.Domain
{
    [MetadataType(typeof(TelefonoMetadata))]
    public partial class Telefono
    {
    }

    public class TelefonoMetadata {
        [Key]
        [DatabaseGenerated(System.ComponentModel.DataAnnotations.Schema.DatabaseGeneratedOption.Identity)]
        public int ID { get; set; }

        [Required(ErrorMessage = "Por favor seleccione un tipo de teléfono")]
        [Display(Name = "Tipo de teléfono")]        
        public string Tipo { get; set; }

        [Required(ErrorMessage = "Por favor introduzca el número de teléfono")]
        [Display(Name = "Número")]
        [DataType(DataType.PhoneNumber)]
        public string Numero { get; set; }
        public int Cliente_ID { get; set; }

        public virtual Cliente Cliente { internal get; set; }
    }
}
