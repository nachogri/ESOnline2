using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ESOnline2.Domain.Entities
{
    [Table("Ciudades")]
    public class Ciudad
    {
        [Key]
        [DatabaseGenerated(System.ComponentModel.DataAnnotations.Schema.DatabaseGeneratedOption.Identity)]
        public int ID { get; set; }

        [Required(ErrorMessage = "Por favor seleccione la ciudad")]
        [Display(Name="Nombre de la ciudad")]
        public string Nombre { get; set; }

        [Required(ErrorMessage = "Por favor seleccione el partido")]
        [Display(Name = "Nombre del partido")]
        public string Partido { get; set; }
    }
}
