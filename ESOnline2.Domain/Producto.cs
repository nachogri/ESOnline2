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
    
    public partial class Producto
    {
        public int ID { get; set; }
        public string Nombre { get; set; }
        public Nullable<int> Vencimiento { get; set; }
        public byte[] Imagen { get; set; }
    }
}
