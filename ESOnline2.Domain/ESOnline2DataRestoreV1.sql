SET IDENTITY_INSERT [dbo].[Clientes] ON
INSERT INTO [dbo].[Clientes] ([ID], [Nombre], [Apellido], [CUIL], [CUIT], [Notas], [Favorito]) VALUES (1, N'Nacho', N'Gri', NULL, NULL, NULL, 1)
INSERT INTO [dbo].[Clientes] ([ID], [Nombre], [Apellido], [CUIL], [CUIT], [Notas], [Favorito]) VALUES (2, N'Melisa', N'Ongaro', NULL, NULL, NULL, 0)
INSERT INTO [dbo].[Clientes] ([ID], [Nombre], [Apellido], [CUIL], [CUIT], [Notas], [Favorito]) VALUES (3, N'Franco', N'Gri', NULL, NULL, NULL, 1)
INSERT INTO [dbo].[Clientes] ([ID], [Nombre], [Apellido], [CUIL], [CUIT], [Notas], [Favorito]) VALUES (4, N'Repuestos Tito', NULL, NULL, NULL, NULL, 0)
INSERT INTO [dbo].[Clientes] ([ID], [Nombre], [Apellido], [CUIL], [CUIT], [Notas], [Favorito]) VALUES (5, N'Farmacia Benedetto', NULL, NULL, NULL, NULL, 0)
INSERT INTO [dbo].[Clientes] ([ID], [Nombre], [Apellido], [CUIL], [CUIT], [Notas], [Favorito]) VALUES (6, N'Colegio San Martin', NULL, NULL, NULL, NULL, 0)
INSERT INTO [dbo].[Clientes] ([ID], [Nombre], [Apellido], [CUIL], [CUIT], [Notas], [Favorito]) VALUES (7, N'My Lunch', NULL, NULL, NULL, NULL, 0)
INSERT INTO [dbo].[Clientes] ([ID], [Nombre], [Apellido], [CUIL], [CUIT], [Notas], [Favorito]) VALUES (8, N'Kupa Trupa', NULL, NULL, NULL, NULL, 1)
INSERT INTO [dbo].[Clientes] ([ID], [Nombre], [Apellido], [CUIL], [CUIT], [Notas], [Favorito]) VALUES (9, N'Deportes 15', NULL, NULL, NULL, NULL, 0)
INSERT INTO [dbo].[Clientes] ([ID], [Nombre], [Apellido], [CUIL], [CUIT], [Notas], [Favorito]) VALUES (10, N'UAI', NULL, NULL, NULL, NULL, 0)
INSERT INTO [dbo].[Clientes] ([ID], [Nombre], [Apellido], [CUIL], [CUIT], [Notas], [Favorito]) VALUES (11, N'Broken', NULL, NULL, NULL, NULL, 0)
INSERT INTO [dbo].[Clientes] ([ID], [Nombre], [Apellido], [CUIL], [CUIT], [Notas], [Favorito]) VALUES (12, N'Benito Sports', NULL, NULL, NULL, NULL, 0)
SET IDENTITY_INSERT [dbo].[Clientes] OFF
GO

SET IDENTITY_INSERT [dbo].[Direcciones] ON
INSERT INTO [dbo].[Direcciones] ([ID], [Tipo], [Descripcion], [Cliente_ID]) VALUES (14, N'Unica', N'calle 150, 1954, BERAZATEGUI', 3)
INSERT INTO [dbo].[Direcciones] ([ID], [Tipo], [Descripcion], [Cliente_ID]) VALUES (18, N'Central', N'calle Mitre, 600, Berazategui', 4)
INSERT INTO [dbo].[Direcciones] ([ID], [Tipo], [Descripcion], [Cliente_ID]) VALUES (20, N'Central', N'calle 150, 1954, Berazategui, Buenos Aires', 1)
INSERT INTO [dbo].[Direcciones] ([ID], [Tipo], [Descripcion], [Cliente_ID]) VALUES (21, N'Sucursal', N'calle 148 3400, Berazategui, Buenos Aires', 5)
INSERT INTO [dbo].[Direcciones] ([ID], [Tipo], [Descripcion], [Cliente_ID]) VALUES (22, N'Central', N'calle Peron, 5000, Berazategui, Buenos Aires', 5)
SET IDENTITY_INSERT [dbo].[Direcciones] OFF
GO

SET IDENTITY_INSERT [dbo].[Emails] ON
INSERT INTO [dbo].[Emails] ([ID], [Tipo], [Casilla], [Cliente_ID]) VALUES (4, N'Personal', N'FRANCO.GRI@HOTMAIL.COM', 3)
INSERT INTO [dbo].[Emails] ([ID], [Tipo], [Casilla], [Cliente_ID]) VALUES (5, N'Personal', N'asd@asd.com', 12)
SET IDENTITY_INSERT [dbo].[Emails] OFF
GO

SET IDENTITY_INSERT [dbo].[Telefonos] ON
INSERT INTO [dbo].[Telefonos] ([ID], [Tipo], [Numero], [Cliente_ID]) VALUES (13, N'Casa', N'2022971481', 2)
INSERT INTO [dbo].[Telefonos] ([ID], [Tipo], [Numero], [Cliente_ID]) VALUES (15, N'Casa', N'42563343', 3)
INSERT INTO [dbo].[Telefonos] ([ID], [Tipo], [Numero], [Cliente_ID]) VALUES (23, N'Casa', N'42565466', 4)
INSERT INTO [dbo].[Telefonos] ([ID], [Tipo], [Numero], [Cliente_ID]) VALUES (25, N'Movil', N'2025381754', 1)
INSERT INTO [dbo].[Telefonos] ([ID], [Tipo], [Numero], [Cliente_ID]) VALUES (26, N'Trabajo', N'42566262', 5)
INSERT INTO [dbo].[Telefonos] ([ID], [Tipo], [Numero], [Cliente_ID]) VALUES (28, N'Casa', N'465461', 12)
INSERT INTO [dbo].[Telefonos] ([ID], [Tipo], [Numero], [Cliente_ID]) VALUES (29, N'Movil', N'45453434', 12)
SET IDENTITY_INSERT [dbo].[Telefonos] OFF
GO

SET IDENTITY_INSERT [dbo].[Webs] ON
INSERT INTO [dbo].[Webs] ([ID], [Tipo], [URL], [Cliente_ID]) VALUES (2, N'Personal', N'www.youtube.com', 3)
SET IDENTITY_INSERT [dbo].[Webs] OFF
GO

SET IDENTITY_INSERT [dbo].[Productos] ON
INSERT INTO [dbo].[Productos] ([ID], [Nombre], [Vencimiento]) VALUES (1, N'Drago 20 lts', N'12')
INSERT INTO [dbo].[Productos] ([ID], [Nombre], [Vencimiento]) VALUES (2, N'Drago 40 lts', N'24')
INSERT INTO [dbo].[Productos] ([ID], [Nombre], [Vencimiento]) VALUES (3, N'Drago 50 lts', N'24')
INSERT INTO [dbo].[Productos] ([ID], [Nombre], [Vencimiento]) VALUES (4, N'Drago 10 lts', N'12')
INSERT INTO [dbo].[Productos] ([ID], [Nombre], [Vencimiento]) VALUES (5, N'Drago 15 lts', N'12')
INSERT INTO [dbo].[Productos] ([ID], [Nombre], [Vencimiento]) VALUES (6, N'Drago Polvo 10 lts', N'6')
SET IDENTITY_INSERT [dbo].[Productos] OFF
