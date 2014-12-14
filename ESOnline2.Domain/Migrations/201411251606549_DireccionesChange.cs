namespace ESOnline2.Domain.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class DireccionesChange : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.Direcciones", "Ciudad_ID", "dbo.Ciudades");
            DropForeignKey("dbo.Direcciones", "Provincia_ID", "dbo.Provincias");
            DropIndex("dbo.Direcciones", new[] { "Ciudad_ID" });
            DropIndex("dbo.Direcciones", new[] { "Provincia_ID" });
            DropColumn("dbo.Direcciones", "Linea1");
            DropColumn("dbo.Direcciones", "Linea2");
            DropColumn("dbo.Direcciones", "CP");
            DropColumn("dbo.Direcciones", "Contacto");
            DropColumn("dbo.Direcciones", "HorariosAtencion");
            DropColumn("dbo.Direcciones", "Ciudad_ID");
            DropColumn("dbo.Direcciones", "Provincia_ID");
            DropTable("dbo.Ciudades");
            DropTable("dbo.Provincias");
        }
        
        public override void Down()
        {
            CreateTable(
                "dbo.Provincias",
                c => new
                    {
                        ID = c.Int(nullable: false, identity: true),
                        Nombre = c.String(nullable: false, maxLength: 4000),
                    })
                .PrimaryKey(t => t.ID);
            
            CreateTable(
                "dbo.Ciudades",
                c => new
                    {
                        ID = c.Int(nullable: false, identity: true),
                        Nombre = c.String(nullable: false, maxLength: 4000),
                        Partido = c.String(nullable: false, maxLength: 4000),
                    })
                .PrimaryKey(t => t.ID);
            
            AddColumn("dbo.Direcciones", "Provincia_ID", c => c.Int(nullable: false));
            AddColumn("dbo.Direcciones", "Ciudad_ID", c => c.Int(nullable: false));
            AddColumn("dbo.Direcciones", "HorariosAtencion", c => c.String(maxLength: 4000));
            AddColumn("dbo.Direcciones", "Contacto", c => c.String(maxLength: 4000));
            AddColumn("dbo.Direcciones", "CP", c => c.String(maxLength: 4000));
            AddColumn("dbo.Direcciones", "Linea2", c => c.String(maxLength: 4000));
            AddColumn("dbo.Direcciones", "Linea1", c => c.String(nullable: false, maxLength: 4000));
            CreateIndex("dbo.Direcciones", "Provincia_ID");
            CreateIndex("dbo.Direcciones", "Ciudad_ID");
            AddForeignKey("dbo.Direcciones", "Provincia_ID", "dbo.Provincias", "ID", cascadeDelete: true);
            AddForeignKey("dbo.Direcciones", "Ciudad_ID", "dbo.Ciudades", "ID", cascadeDelete: true);
        }
    }
}
