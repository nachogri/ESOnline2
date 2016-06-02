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
    
    public partial class ProductoVendido
    {
        public int ID { get; set; }
        public System.DateTime FechaVenta { get; set; }
        public int ClienteID { get; set; }
        public int ProductoID { get; set; }
        public string NumeroSerie { get; set; }
        public byte[] CodigoBarra { get; set; }
        public int Fabricacion { get; set; }
        public System.DateTime FechaVencimiento { get; set; }
        public Nullable<System.DateTime> FechaAviso { get; set; }
    
        public virtual Cliente Cliente { internal get; set; }
        public virtual Producto Producto { get; internal set; }
    }
}
