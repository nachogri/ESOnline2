//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace ESOnline2.Domain
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    
    public partial class Cliente
    {
        public Cliente()
        {
            this.Direcciones = new HashSet<Direccion>();
            this.Emails = new HashSet<Email>();
            this.Telefonos = new HashSet<Telefono>();
            this.Webs = new HashSet<Web>();
        }
    
        public int ID { get; set; }

        [Required(ErrorMessage = "Por favor introduzca el nombre del cliente")]
        [Display(Name = "Nombre del cliente")]
        public string Nombre { get; set; }
        
        [Display(Name = "Apellido del cliente")]
        public string Apellido { get; set; }
               
        [Display(Name = "N�mero de CUIL del cliente")]
        [StringLength(13, ErrorMessage = "El n�mero de {0} tiene que tener {2} caracteres.", MinimumLength = 11)]
        public string CUIL { get; set; }
        
        [Display(Name = "N�mero de CUIT del cliente")]
        [StringLength(13, ErrorMessage = "El n�mero de {0} tiene que tener {2} caracteres.", MinimumLength = 11)]
        public string CUIT { get; set; }

        [Display(Name = "Notas")]
        [DataType(DataType.MultilineText)]
        public string Notas { get; set; }
        
        [Display(Name = "Imagen")]
        [DataType(DataType.ImageUrl)]
        public byte[] Imagen { get; set; }
        
        [Display(Name = "Favorito")]
        public bool Favorito { get; set; }

        [Display(GroupName = "Direcciones")]
        public virtual ICollection<Direccion> Direcciones { get; set; }
        
        [Display(GroupName = "Emails")]
        public virtual ICollection<Email> Emails { get; set; }
        
        [Display(GroupName = "Telefonos")]
        public virtual ICollection<Telefono> Telefonos { get; set; }
        
        [Display(GroupName = "Webs")]
        public virtual ICollection<Web> Webs { get; set; }
    }
}
