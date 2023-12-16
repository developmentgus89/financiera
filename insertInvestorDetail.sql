-- Insertar en la tabla "inversionistas"
INSERT INTO inversionistas (cnombre, capaterno, camaterno, iedad, ctelefono, fcantidadinvertida, cuentabancaria, cemail, dfecha_alta, cantpagadacapital) 
VALUES ('MIRNA', 'GARCIA', 'MARTINEZ', 42, 551416, 6350, 454545454, 'digacominf.dsia@naval.sm', '2023-11-03', 0);

-- Recuperar el valor de "icveinversionista" recién insertado
SET @last_icveinversionista = LAST_INSERT_ID();

-- Insertar en la tabla "inverdetalle" usando el valor recuperado
INSERT INTO inverdetalle (icveinversionista, dfecharegistro, dmonto, cstatus, invtipooperacion, invdetobservaciones)
VALUES (@last_icveinversionista, '2023-11-03', 6350, 'A', 'I', 'INVERSIÓN INICIAL');