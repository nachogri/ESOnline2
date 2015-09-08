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
    [MetadataType(typeof(ProductoVendidoMetadata))]
    public partial class ProductoVendido
    {
    }

    public class ProductoVendidoMetadata
    {
        [Key]
        [DatabaseGeneratedAttribute(System.ComponentModel.DataAnnotations.Schema.DatabaseGeneratedOption.Identity)]
        [HiddenInput(DisplayValue = false)]
        public int ID { get; set; }

        [Display(Name = "Fecha de venta")]        
        public DateTime FechaVenta { get; set; }

        [Display(Name = "Fecha de vencimiento")]
        public DateTime FechaVencimiento { get; set; }

        [Display(Name = "Cliente")]        
        public Cliente Cliente { get; set; }

        [Display(Name = "Producto")]
        public Producto Producto { get; set; }

        [Display(Name = "Numero de serie")]
        public string NumeroSerie { get; set; }

        [Display(Name = "Codigo de barras")]
        public Byte[] CodigoBarra { get; set; }

        [Display(Name = "Año de fabricacion")]        
        public int Fabricacion { get; set; }
    }
}
