namespace ESOnline2.Domain.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class InitialCreate : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Clientes",
                c => new
                    {
                        ID = c.Int(nullable: false, identity: true),
                        Nombre = c.String(nullable: false, maxLength: 4000),
                        Apellido = c.String(maxLength: 4000),
                        CUIL = c.String(maxLength: 13),
                        CUIT = c.String(maxLength: 13),
                        Notas = c.String(maxLength: 4000),
                        Imagen = c.Binary(maxLength: 4000),
                        Favorito = c.Boolean(nullable: false),
                    })
                .PrimaryKey(t => t.ID);
            
            CreateTable(
                "dbo.Direcciones",
                c => new
                    {
                        ID = c.Int(nullable: false, identity: true),
                        Tipo = c.String(nullable: false, maxLength: 4000),
                        Descripcion = c.String(nullable: false, maxLength: 4000),
                        Cliente_ID = c.Int(),
                    })
                .PrimaryKey(t => t.ID)
                .ForeignKey("dbo.Clientes", t => t.Cliente_ID)
                .Index(t => t.Cliente_ID);
            
            CreateTable(
                "dbo.Emails",
                c => new
                    {
                        ID = c.Int(nullable: false, identity: true),
                        Tipo = c.String(nullable: false, maxLength: 4000),
                        Casilla = c.String(nullable: false, maxLength: 4000),
                        Cliente_ID = c.Int(),
                    })
                .PrimaryKey(t => t.ID)
                .ForeignKey("dbo.Clientes", t => t.Cliente_ID)
                .Index(t => t.Cliente_ID);
            
            CreateTable(
                "dbo.Telefonos",
                c => new
                    {
                        ID = c.Int(nullable: false, identity: true),
                        Tipo = c.String(nullable: false, maxLength: 4000),
                        Numero = c.String(nullable: false, maxLength: 4000),
                        Cliente_ID = c.Int(),
                    })
                .PrimaryKey(t => t.ID)
                .ForeignKey("dbo.Clientes", t => t.Cliente_ID)
                .Index(t => t.Cliente_ID);
            
            CreateTable(
                "dbo.Webs",
                c => new
                    {
                        ID = c.Int(nullable: false, identity: true),
                        Tipo = c.String(nullable: false, maxLength: 4000),
                        URL = c.String(nullable: false, maxLength: 4000),
                        Cliente_ID = c.Int(),
                    })
                .PrimaryKey(t => t.ID)
                .ForeignKey("dbo.Clientes", t => t.Cliente_ID)
                .Index(t => t.Cliente_ID);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Webs", "Cliente_ID", "dbo.Clientes");
            DropForeignKey("dbo.Telefonos", "Cliente_ID", "dbo.Clientes");
            DropForeignKey("dbo.Emails", "Cliente_ID", "dbo.Clientes");
            DropForeignKey("dbo.Direcciones", "Cliente_ID", "dbo.Clientes");
            DropIndex("dbo.Webs", new[] { "Cliente_ID" });
            DropIndex("dbo.Telefonos", new[] { "Cliente_ID" });
            DropIndex("dbo.Emails", new[] { "Cliente_ID" });
            DropIndex("dbo.Direcciones", new[] { "Cliente_ID" });
            DropTable("dbo.Webs");
            DropTable("dbo.Telefonos");
            DropTable("dbo.Emails");
            DropTable("dbo.Direcciones");
            DropTable("dbo.Clientes");
        }
    }
}
