SELECT 
PRODUCTOS.PROD_ID, 
PRODUCTOS.PROD_NRO_IDENTIFICADOR, 
PRODUCTOS.PROD_CLIENTE_ID,
PRODUCTOS.PROD_TP_ID, 
DateSerial(Left(PRODUCTOS.PROD_FECHA_ULT_RECARGA,4),Mid(PRODUCTOS.PROD_FECHA_ULT_RECARGA,5,2),Right(PRODUCTOS.PROD_FECHA_ULT_RECARGA,2)) AS FECHAVENTA,
DATEADD("m",12,DateSerial(Left(PRODUCTOS.PROD_FECHA_ULT_RECARGA,4),Mid(PRODUCTOS.PROD_FECHA_ULT_RECARGA,5,2),Right(PRODUCTOS.PROD_FECHA_ULT_RECARGA,2))) AS VENCIMIENTO,
DateSerial(Left(PRODUCTOS.PROD_FECHA_ULT_RECARGA,4),Mid(PRODUCTOS.PROD_FECHA_ULT_RECARGA,5,2),Right(PRODUCTOS.PROD_FECHA_ULT_RECARGA,2)) AS FECHAFABRICACION
FROM PRODUCTOS INNER JOIN CLIENTES
ON PRODUCTOS.PROD_CLIENTE_ID=CLIENTES.CLI_ID
WHERE PRODUCTOS.PROD_FECHA_BAJA='NO' AND PRODUCTOS.PROD_ID NOT IN (9484,17061);