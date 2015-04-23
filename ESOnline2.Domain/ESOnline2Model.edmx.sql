
-- --------------------------------------------------
-- Entity Designer DDL Script for SQL Server 2005, 2008, 2012 and Azure
-- --------------------------------------------------
-- Date Created: 04/22/2015 23:05:34
-- Generated from EDMX file: C:\Users\Nacho\Source\Repos\ESOnline2\ESOnline2.Domain\ESOnline2Model.edmx
-- --------------------------------------------------

SET QUOTED_IDENTIFIER OFF;
GO
USE [ESOnlineDB];
GO
IF SCHEMA_ID(N'dbo') IS NULL EXECUTE(N'CREATE SCHEMA [dbo]');
GO

-- --------------------------------------------------
-- Dropping existing FOREIGN KEY constraints
-- --------------------------------------------------

IF OBJECT_ID(N'[dbo].[FK_dbo_Direcciones_dbo_Clientes_Cliente_ID]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[Direcciones] DROP CONSTRAINT [FK_dbo_Direcciones_dbo_Clientes_Cliente_ID];
GO
IF OBJECT_ID(N'[dbo].[FK_dbo_Emails_dbo_Clientes_Cliente_ID]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[Emails] DROP CONSTRAINT [FK_dbo_Emails_dbo_Clientes_Cliente_ID];
GO
IF OBJECT_ID(N'[dbo].[FK_dbo_Telefonos_dbo_Clientes_Cliente_ID]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[Telefonos] DROP CONSTRAINT [FK_dbo_Telefonos_dbo_Clientes_Cliente_ID];
GO
IF OBJECT_ID(N'[dbo].[FK_dbo_Webs_dbo_Clientes_Cliente_ID]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[Webs] DROP CONSTRAINT [FK_dbo_Webs_dbo_Clientes_Cliente_ID];
GO
IF OBJECT_ID(N'[dbo].[FK_ProductoVendidoCliente]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[ProductosVendidos] DROP CONSTRAINT [FK_ProductoVendidoCliente];
GO
IF OBJECT_ID(N'[dbo].[FK_ProductoProductoVendido]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[ProductosVendidos] DROP CONSTRAINT [FK_ProductoProductoVendido];
GO

-- --------------------------------------------------
-- Dropping existing tables
-- --------------------------------------------------

IF OBJECT_ID(N'[dbo].[C__MigrationHistory]', 'U') IS NOT NULL
    DROP TABLE [dbo].[C__MigrationHistory];
GO
IF OBJECT_ID(N'[dbo].[Clientes]', 'U') IS NOT NULL
    DROP TABLE [dbo].[Clientes];
GO
IF OBJECT_ID(N'[dbo].[Direcciones]', 'U') IS NOT NULL
    DROP TABLE [dbo].[Direcciones];
GO
IF OBJECT_ID(N'[dbo].[Emails]', 'U') IS NOT NULL
    DROP TABLE [dbo].[Emails];
GO
IF OBJECT_ID(N'[dbo].[Telefonos]', 'U') IS NOT NULL
    DROP TABLE [dbo].[Telefonos];
GO
IF OBJECT_ID(N'[dbo].[Webs]', 'U') IS NOT NULL
    DROP TABLE [dbo].[Webs];
GO
IF OBJECT_ID(N'[dbo].[Productos]', 'U') IS NOT NULL
    DROP TABLE [dbo].[Productos];
GO
IF OBJECT_ID(N'[dbo].[ProductosVendidos]', 'U') IS NOT NULL
    DROP TABLE [dbo].[ProductosVendidos];
GO

-- --------------------------------------------------
-- Creating all tables
-- --------------------------------------------------

-- Creating table 'C__MigrationHistory'
CREATE TABLE [dbo].[C__MigrationHistory] (
    [MigrationId] nvarchar(150)  NOT NULL,
    [ContextKey] nvarchar(300)  NOT NULL,
    [Model] varbinary(max)  NOT NULL,
    [ProductVersion] nvarchar(32)  NOT NULL
);
GO

-- Creating table 'Clientes'
CREATE TABLE [dbo].[Clientes] (
    [ID] int IDENTITY(1,1) NOT NULL,
    [Nombre] nvarchar(4000)  NOT NULL,
    [Apellido] nvarchar(4000)  NULL,
    [CUIL] nvarchar(13)  NULL,
    [CUIT] nvarchar(13)  NULL,
    [Notas] nvarchar(4000)  NULL,
    [Imagen] varbinary(4000)  NULL,
    [Favorito] bit  NOT NULL
);
GO

-- Creating table 'Direcciones'
CREATE TABLE [dbo].[Direcciones] (
    [ID] int IDENTITY(1,1) NOT NULL,
    [Tipo] nvarchar(4000)  NOT NULL,
    [Descripcion] nvarchar(4000)  NOT NULL,
    [Cliente_ID] int  NOT NULL
);
GO

-- Creating table 'Emails'
CREATE TABLE [dbo].[Emails] (
    [ID] int IDENTITY(1,1) NOT NULL,
    [Tipo] nvarchar(4000)  NOT NULL,
    [Casilla] nvarchar(4000)  NOT NULL,
    [Cliente_ID] int  NOT NULL
);
GO

-- Creating table 'Telefonos'
CREATE TABLE [dbo].[Telefonos] (
    [ID] int IDENTITY(1,1) NOT NULL,
    [Tipo] nvarchar(4000)  NOT NULL,
    [Numero] nvarchar(4000)  NOT NULL,
    [Cliente_ID] int  NOT NULL
);
GO

-- Creating table 'Webs'
CREATE TABLE [dbo].[Webs] (
    [ID] int IDENTITY(1,1) NOT NULL,
    [Tipo] nvarchar(4000)  NOT NULL,
    [URL] nvarchar(4000)  NOT NULL,
    [Cliente_ID] int  NOT NULL
);
GO

-- Creating table 'Productos'
CREATE TABLE [dbo].[Productos] (
    [ID] int IDENTITY(1,1) NOT NULL,
    [Nombre] nvarchar(max)  NOT NULL,
    [Vencimiento] int  NULL,
    [Imagen] varbinary(4000)  NULL
);
GO

-- Creating table 'ProductosVendidos'
CREATE TABLE [dbo].[ProductosVendidos] (
    [ID] int IDENTITY(1,1) NOT NULL,
    [FechaVenta] datetime  NOT NULL,
    [ClienteID] int  NOT NULL,
    [ProductoID] int  NULL,
    [NumeroSerie] nvarchar(max)  NULL,
    [CodigoBarra] varbinary(max)  NULL,
    [Fabricacion] int  NOT NULL
);
GO

-- --------------------------------------------------
-- Creating all PRIMARY KEY constraints
-- --------------------------------------------------

-- Creating primary key on [MigrationId], [ContextKey] in table 'C__MigrationHistory'
ALTER TABLE [dbo].[C__MigrationHistory]
ADD CONSTRAINT [PK_C__MigrationHistory]
    PRIMARY KEY CLUSTERED ([MigrationId], [ContextKey] ASC);
GO

-- Creating primary key on [ID] in table 'Clientes'
ALTER TABLE [dbo].[Clientes]
ADD CONSTRAINT [PK_Clientes]
    PRIMARY KEY CLUSTERED ([ID] ASC);
GO

-- Creating primary key on [ID], [Cliente_ID] in table 'Direcciones'
ALTER TABLE [dbo].[Direcciones]
ADD CONSTRAINT [PK_Direcciones]
    PRIMARY KEY CLUSTERED ([ID], [Cliente_ID] ASC);
GO

-- Creating primary key on [ID], [Cliente_ID] in table 'Emails'
ALTER TABLE [dbo].[Emails]
ADD CONSTRAINT [PK_Emails]
    PRIMARY KEY CLUSTERED ([ID], [Cliente_ID] ASC);
GO

-- Creating primary key on [ID], [Cliente_ID] in table 'Telefonos'
ALTER TABLE [dbo].[Telefonos]
ADD CONSTRAINT [PK_Telefonos]
    PRIMARY KEY CLUSTERED ([ID], [Cliente_ID] ASC);
GO

-- Creating primary key on [ID], [Cliente_ID] in table 'Webs'
ALTER TABLE [dbo].[Webs]
ADD CONSTRAINT [PK_Webs]
    PRIMARY KEY CLUSTERED ([ID], [Cliente_ID] ASC);
GO

-- Creating primary key on [ID] in table 'Productos'
ALTER TABLE [dbo].[Productos]
ADD CONSTRAINT [PK_Productos]
    PRIMARY KEY CLUSTERED ([ID] ASC);
GO

-- Creating primary key on [ID], [ClienteID] in table 'ProductosVendidos'
ALTER TABLE [dbo].[ProductosVendidos]
ADD CONSTRAINT [PK_ProductosVendidos]
    PRIMARY KEY CLUSTERED ([ID], [ClienteID] ASC);
GO

-- --------------------------------------------------
-- Creating all FOREIGN KEY constraints
-- --------------------------------------------------

-- Creating foreign key on [Cliente_ID] in table 'Direcciones'
ALTER TABLE [dbo].[Direcciones]
ADD CONSTRAINT [FK_dbo_Direcciones_dbo_Clientes_Cliente_ID]
    FOREIGN KEY ([Cliente_ID])
    REFERENCES [dbo].[Clientes]
        ([ID])
    ON DELETE CASCADE ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_dbo_Direcciones_dbo_Clientes_Cliente_ID'
CREATE INDEX [IX_FK_dbo_Direcciones_dbo_Clientes_Cliente_ID]
ON [dbo].[Direcciones]
    ([Cliente_ID]);
GO

-- Creating foreign key on [Cliente_ID] in table 'Emails'
ALTER TABLE [dbo].[Emails]
ADD CONSTRAINT [FK_dbo_Emails_dbo_Clientes_Cliente_ID]
    FOREIGN KEY ([Cliente_ID])
    REFERENCES [dbo].[Clientes]
        ([ID])
    ON DELETE CASCADE ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_dbo_Emails_dbo_Clientes_Cliente_ID'
CREATE INDEX [IX_FK_dbo_Emails_dbo_Clientes_Cliente_ID]
ON [dbo].[Emails]
    ([Cliente_ID]);
GO

-- Creating foreign key on [Cliente_ID] in table 'Telefonos'
ALTER TABLE [dbo].[Telefonos]
ADD CONSTRAINT [FK_dbo_Telefonos_dbo_Clientes_Cliente_ID]
    FOREIGN KEY ([Cliente_ID])
    REFERENCES [dbo].[Clientes]
        ([ID])
    ON DELETE CASCADE ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_dbo_Telefonos_dbo_Clientes_Cliente_ID'
CREATE INDEX [IX_FK_dbo_Telefonos_dbo_Clientes_Cliente_ID]
ON [dbo].[Telefonos]
    ([Cliente_ID]);
GO

-- Creating foreign key on [Cliente_ID] in table 'Webs'
ALTER TABLE [dbo].[Webs]
ADD CONSTRAINT [FK_dbo_Webs_dbo_Clientes_Cliente_ID]
    FOREIGN KEY ([Cliente_ID])
    REFERENCES [dbo].[Clientes]
        ([ID])
    ON DELETE CASCADE ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_dbo_Webs_dbo_Clientes_Cliente_ID'
CREATE INDEX [IX_FK_dbo_Webs_dbo_Clientes_Cliente_ID]
ON [dbo].[Webs]
    ([Cliente_ID]);
GO

-- Creating foreign key on [ClienteID] in table 'ProductosVendidos'
ALTER TABLE [dbo].[ProductosVendidos]
ADD CONSTRAINT [FK_ProductoVendidoCliente]
    FOREIGN KEY ([ClienteID])
    REFERENCES [dbo].[Clientes]
        ([ID])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_ProductoVendidoCliente'
CREATE INDEX [IX_FK_ProductoVendidoCliente]
ON [dbo].[ProductosVendidos]
    ([ClienteID]);
GO

-- Creating foreign key on [ProductoID] in table 'ProductosVendidos'
ALTER TABLE [dbo].[ProductosVendidos]
ADD CONSTRAINT [FK_ProductoProductoVendido]
    FOREIGN KEY ([ProductoID])
    REFERENCES [dbo].[Productos]
        ([ID])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_ProductoProductoVendido'
CREATE INDEX [IX_FK_ProductoProductoVendido]
ON [dbo].[ProductosVendidos]
    ([ProductoID]);
GO

-- --------------------------------------------------
-- Script has ended
-- --------------------------------------------------