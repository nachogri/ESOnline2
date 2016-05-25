CREATE TABLE [dbo].[Clientes] (
    [ID]       INT              IDENTITY (1, 1) NOT NULL,
    [Nombre]   NVARCHAR (4000)  NOT NULL,
    [Apellido] NVARCHAR (4000)  NULL,
    [CUIL]     NVARCHAR (13)    NULL,
    [CUIT]     NVARCHAR (13)    NULL,
    [Notas]    NVARCHAR (4000)  NULL,
    [Imagen]   VARBINARY (4000) NULL,
    [Favorito] BIT              NOT NULL,
    CONSTRAINT [PK_Clientes] PRIMARY KEY CLUSTERED ([ID] ASC)
);

