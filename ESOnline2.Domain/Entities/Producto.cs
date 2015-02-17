using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Mvc;


namespace ESOnline2.Domain.Entities
{
    [MetadataType(typeof(ProductoMetadata))]
    public partial class Producto
    {
    }

    public class ProductoMetadata
    {
        [Key]
        [DatabaseGeneratedAttribute(System.ComponentModel.DataAnnotations.Schema.DatabaseGeneratedOption.Identity)]
        [HiddenInput(DisplayValue = false)]
        public int ID { get; set; }

        [Required(ErrorMessage = "Por favor introduzca el nombre del producto")]
        [Display(Name = "Nombre del producto")]
        public string Nombre { get; set; }
        
        [Display(Name = "Vencimiento del producto")]
        public string Vencimiento { get; set; }
      
        [Display(Name = "Imagen")]
        [DataType(DataType.ImageUrl)]
        public byte[] Imagen { get; set; }
    }
}
