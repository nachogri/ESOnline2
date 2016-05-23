CREATE TABLE [dbo].[ProductosVendidos] (
    [ID]               INT             IDENTITY (1, 1) NOT NULL,
    [FechaVenta]       DATETIME        NOT NULL,
    [ClienteID]        INT             NOT NULL,
    [ProductoID]       INT             NOT NULL,
    [NumeroSerie]      NVARCHAR (MAX)  NULL,
    [CodigoBarra]      VARBINARY (MAX) NULL,
    [Fabricacion]      INT             NOT NULL,
    [FechaVencimiento] DATETIME        NOT NULL,
    CONSTRAINT [PK_ProductosVendidos] PRIMARY KEY CLUSTERED ([ID] ASC, [ClienteID] ASC),
    CONSTRAINT [FK_ProductoVendidoCliente] FOREIGN KEY ([ClienteID]) REFERENCES [dbo].[Clientes] ([ID]) ON DELETE CASCADE,
    CONSTRAINT [FK_ProductoProductoVendido] FOREIGN KEY ([ProductoID]) REFERENCES [dbo].[Productos] ([ID]) ON DELETE CASCADE
);


GO
CREATE NONCLUSTERED INDEX [IX_FK_ProductoVendidoCliente]
    ON [dbo].[ProductosVendidos]([ClienteID] ASC);


GO
CREATE NONCLUSTERED INDEX [IX_FK_ProductoProductoVendido]
    ON [dbo].[ProductosVendidos]([ProductoID] ASC);

