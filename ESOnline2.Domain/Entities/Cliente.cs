using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Mvc;

namespace ESOnline2.Domain
{
    [MetadataType(typeof(ClienteMetadata))]
    public partial class Cliente
    {
    }

    public class ClienteMetadata
    {        
        [Key]
        [DatabaseGeneratedAttribute(System.ComponentModel.DataAnnotations.Schema.DatabaseGeneratedOption.Identity)]
        [HiddenInput(DisplayValue = false)]
        public int ID { get; set; }

        [Required(ErrorMessage = "Por favor introduzca el nombre del cliente")]
        [Display(Name = "Nombre del cliente")]
        public string Nombre { get; set; }

        [Display(Name = "Apellido del cliente")]
        public string Apellido { get; set; }

        [Display(GroupName = "Telefonos")]
        public virtual ICollection<Telefono> Telefonos { get; set; }

        [Display(GroupName = "Emails")]
        public virtual ICollection<Email> Emails { get; set; }

        [Display(GroupName = "Direcciones")]
        public virtual ICollection<Direccion> Direcciones { get; set; }

        [Display(Name = "Número de CUIL del cliente")]
        [RegularExpression(@"/^\d{2}\-\d{8}\-\d{1}$/", ErrorMessage="El formáto de CUIL no es válido")]
        [StringLength(13, ErrorMessage = "El número de {0} tiene que tener {2} caracteres.", MinimumLength = 11)]
        public string CUIL { get; set; }

        [Display(Name = "Número de CUIT del cliente")]
        [RegularExpression(@"/^\d{2}\-\d{8}\-\d{1}$/", ErrorMessage = "El formáto de CUIT no es válido")]
        [StringLength(13, ErrorMessage = "El número de {0} tiene que tener {2} caracteres.", MinimumLength = 11)]
        public string CUIT { get; set; }

        [Display(Name = "Notas")]
        [DataType(DataType.MultilineText)]
        public string Notas { get; set; }

        [Display(GroupName = "Webs")]
        public virtual ICollection<Web> Webs { get; set; }

        [Display(Name = "Imagen")]
        [DataType(DataType.ImageUrl)]
        public byte[] Imagen { get; set; }

        [Display(Name = "Favorito")]
        public bool Favorito { get; set; }

        [Display(GroupName = "Productos")]
        public virtual ICollection<ProductoVendido> ProductosVendidos { get; set; }
    }
}
