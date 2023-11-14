-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3306
-- Tiempo de generación: 11-11-2023 a las 17:00:01
-- Versión del servidor: 5.7.36
-- Versión de PHP: 7.4.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `financiera`
--

DELIMITER $$
--
-- Procedimientos
--
DROP PROCEDURE IF EXISTS `GenerarPagosInteresesMensuales`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `GenerarPagosInteresesMensuales` ()  BEGIN
    DECLARE icveinversionista_var INT;
    DECLARE icvedetalleinver_var INT;
    DECLARE dmonto_var DECIMAL(10,2);

    -- Cursor para seleccionar inversiones activas que no tienen un pago registrado este mes
    DECLARE curInversiones CURSOR FOR
        SELECT inv.icveinversionista, det.icvedetalleinver, det.dmonto
        FROM inversionistas inv
        JOIN inverdetalle det ON inv.icveinversionista = det.icveinversionista
        LEFT JOIN paginteresesinv pag ON pag.icvedetalleinver = det.icvedetalleinver
                                       AND MONTH(pag.dfechapago) = MONTH(CURDATE())
                                       AND YEAR(pag.dfechapago) = YEAR(CURDATE())
        WHERE det.cstatus = 'ACTIVO'
            AND pag.icvedetalleinver IS NULL
            AND MONTH(det.dfecharegistro) = MONTH(CURDATE())
            AND YEAR(det.dfecharegistro) = YEAR(CURDATE());

    OPEN curInversiones;

    read_loop: LOOP
        FETCH curInversiones INTO icveinversionista_var, icvedetalleinver_var, dmonto_var;
        IF done THEN
            LEAVE read_loop;
        END IF;

        -- Insertar un nuevo registro en paginteresesinv para el mes actual
        INSERT INTO paginteresesinv (icveinversionista, icvedetalleinver, fmonto_pagado, dfechapago)
        VALUES (icveinversionista_var, icvedetalleinver_var, dmonto_var, CURDATE());
    END LOOP;

    CLOSE curInversiones;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `catbancos`
--

DROP TABLE IF EXISTS `catbancos`;
CREATE TABLE IF NOT EXISTS `catbancos` (
  `icvebanco` int(11) NOT NULL AUTO_INCREMENT,
  `ccveinstitucion` char(10) COLLATE utf32_spanish2_ci NOT NULL,
  `cnombrebanco` varchar(180) COLLATE utf32_spanish2_ci NOT NULL,
  PRIMARY KEY (`icvebanco`)
) ENGINE=InnoDB AUTO_INCREMENT=84 DEFAULT CHARSET=utf32 COLLATE=utf32_spanish2_ci;

--
-- Volcado de datos para la tabla `catbancos`
--

INSERT INTO `catbancos` (`icvebanco`, `ccveinstitucion`, `cnombrebanco`) VALUES
(1, '40138', 'ABC CAPITAL'),
(2, '40133', 'ACTINVER'),
(3, '40062', 'AFIRME'),
(4, '90661', 'ALTERNATIVOS'),
(5, '90706', 'ARCUS'),
(6, '90659', 'ASP INTEGRA OPC'),
(7, '40128', 'AUTOFIN'),
(8, '40127', 'AZTECA'),
(9, '37166', 'BaBien'),
(10, '40030', 'BAJIO'),
(11, '40002', 'BANAMEX'),
(12, '40154', 'BANCO COVALTO'),
(13, '37006', 'BANCOMEXT'),
(14, '40137', 'BANCOPPEL'),
(15, '40160', 'BANCO S3'),
(16, '40152', 'BANCREA'),
(17, '37019', 'BANJERCITO'),
(18, '40147', 'BANKAOOL'),
(19, '40106', 'BANK OF AMERICA'),
(20, '40159', 'BANK OF CHINA'),
(21, '37009', 'BANOBRAS'),
(22, '40072', 'BANORTE'),
(23, '40058', 'BANREGIO'),
(24, '40060', 'BANSI'),
(25, '2001', 'BANXICO'),
(26, '40129', 'BARCLAYS'),
(27, '40145', 'BBASE'),
(28, '40012', 'BBVA MEXICO'),
(29, '40112', 'BMONEX'),
(30, '90677', 'CAJA POP MEXICA'),
(31, '90683', 'CAJA TELEFONIST'),
(32, '90630', 'CB INTERCAM'),
(33, '40143', 'CIBANCO'),
(34, '90631', 'CI BOLSA'),
(35, '90901', 'CLS'),
(36, '90903', 'CoDi Valida'),
(37, '40130', 'COMPARTAMOS'),
(38, '40140', 'CONSUBANCO'),
(39, '90652', 'CREDICAPITAL'),
(40, '90688', 'CREDICLUB'),
(41, '90680', 'CRISTOBAL COLON'),
(42, '40151', 'DONDE'),
(43, '90616', 'FINAMEX'),
(44, '90634', 'FINCOMUN'),
(45, '90689', 'FOMPED'),
(46, '90685', 'FONDO (FIRA)'),
(47, '90601', 'GBM'),
(48, '37168', 'HIPOTECARIA FED'),
(49, '40021', 'HSBC'),
(50, '40155', 'ICBC'),
(51, '40036', 'INBURSA'),
(52, '90902', 'INDEVAL'),
(53, '40150', 'INMOBILIARIO'),
(54, '40136', 'INTERCAM BANCO'),
(55, '90686', 'INVERCAP'),
(56, '40059', 'INVEX'),
(57, '40110', 'JP MORGAN'),
(58, '90653', 'KUSPIT'),
(59, '90670', 'LIBERTAD'),
(60, '90602', 'MASARI'),
(61, '40042', 'MIFEL'),
(62, '40158', 'MIZUHO BANK'),
(63, '90600', 'MONEXCB'),
(64, '40108', 'MUFG'),
(65, '40132', 'MULTIVA BANCO'),
(66, '37135', 'NAFIN'),
(67, '90638', 'NU MEXICO'),
(68, '90710', 'NVIO'),
(69, '40148', 'PAGATODO'),
(70, '90620', 'PROFUTURO'),
(71, '40156', 'SABADELL'),
(72, '40014', 'SANTANDER'),
(73, '40044', 'SCOTIABANK'),
(74, '40157', 'SHINHAN'),
(75, '90646', 'STP'),
(76, '90703', 'TESORED'),
(77, '90684', 'TRANSFER'),
(78, '90656', 'UNAGRA'),
(79, '90617', 'VALMEX'),
(80, '90605', 'VALUE'),
(81, '90608', 'VECTOR'),
(82, '40113', 'VE POR MAS'),
(83, '40141', 'VOLKSWAGEN');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `catroles`
--

DROP TABLE IF EXISTS `catroles`;
CREATE TABLE IF NOT EXISTS `catroles` (
  `icveroles` int(11) NOT NULL AUTO_INCREMENT,
  `cnombrerol` varchar(50) CHARACTER SET latin1 NOT NULL,
  `bstatus` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`icveroles`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cattasascomisiones`
--

DROP TABLE IF EXISTS `cattasascomisiones`;
CREATE TABLE IF NOT EXISTS `cattasascomisiones` (
  `icvetasascomisiones` int(11) NOT NULL AUTO_INCREMENT,
  `cdescripciontascom` varchar(45) COLLATE latin1_spanish_ci NOT NULL,
  `ftasainteres` double NOT NULL COMMENT 'Este sería el manejo de interés que se le cobrará al cliente',
  `cattasacomobs` varchar(100) COLLATE latin1_spanish_ci DEFAULT NULL,
  PRIMARY KEY (`icvetasascomisiones`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;

--
-- Volcado de datos para la tabla `cattasascomisiones`
--

INSERT INTO `cattasascomisiones` (`icvetasascomisiones`, `cdescripciontascom`, `ftasainteres`, `cattasacomobs`) VALUES
(1, 'TASA SEMANAL DEL 10 % FINANCIERA MAYORQUIN', 10, 'TASA DE INICIO PARA CLIENTES'),
(2, 'TASA SEMANAL DEL 8 %', 8.06, 'TASA PARA CLIENTES PREFERENCIALES EDITADO'),
(3, 'TASA SEMANL DEL 12%', 12, 'CLEINTES TIPO B1');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cattipocliente`
--

DROP TABLE IF EXISTS `cattipocliente`;
CREATE TABLE IF NOT EXISTS `cattipocliente` (
  `icvetipocliente` int(11) NOT NULL AUTO_INCREMENT,
  `cdescriptipocliente` varchar(250) CHARACTER SET latin1 NOT NULL,
  `cabreviiatipo` varchar(11) CHARACTER SET latin1 NOT NULL,
  `icvetasascomisiones` int(11) NOT NULL,
  PRIMARY KEY (`icvetipocliente`),
  KEY `cvetasacomision_idx` (`icvetasascomisiones`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;

--
-- Volcado de datos para la tabla `cattipocliente`
--

INSERT INTO `cattipocliente` (`icvetipocliente`, `cdescriptipocliente`, `cabreviiatipo`, `icvetasascomisiones`) VALUES
(1, 'CLIENTES INICIALES DE LA FINANCIERA', 'A1', 1),
(3, 'CLIENTES QUE SE ATRASAN DE DOS A TRES DIAS', 'B1', 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `clientes`
--

DROP TABLE IF EXISTS `clientes`;
CREATE TABLE IF NOT EXISTS `clientes` (
  `icvecliente` int(11) NOT NULL AUTO_INCREMENT,
  `cnombre` varchar(50) CHARACTER SET latin1 NOT NULL,
  `capaterno` varchar(50) CHARACTER SET latin1 NOT NULL,
  `camaterno` varchar(50) CHARACTER SET latin1 NOT NULL,
  `iedad` int(11) NOT NULL,
  `icvetipocliente` int(11) NOT NULL,
  `dfechanaciemiento` date NOT NULL,
  `dfechaalta` date NOT NULL,
  `cestatus` char(2) CHARACTER SET latin1 NOT NULL,
  `ctelefono` varchar(45) COLLATE latin1_spanish_ci NOT NULL,
  PRIMARY KEY (`icvecliente`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;

--
-- Volcado de datos para la tabla `clientes`
--

INSERT INTO `clientes` (`icvecliente`, `cnombre`, `capaterno`, `camaterno`, `iedad`, `icvetipocliente`, `dfechanaciemiento`, `dfechaalta`, `cestatus`, `ctelefono`) VALUES
(1, 'GUSTAVO', 'ANGULO', 'MELENDEZ', 18, 1, '1989-12-29', '2023-10-25', 'A', '5587386942'),
(2, 'NANCY ISELA', 'ARREDONDO', 'CURIEL', 35, 1, '1987-11-01', '2023-10-25', 'A', '5545256957'),
(3, 'EDGAR', 'DE SANTIAGO', 'GONZALEZ', 50, 3, '1971-09-26', '2021-08-09', 'A', '5545342321');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `domicilio`
--

DROP TABLE IF EXISTS `domicilio`;
CREATE TABLE IF NOT EXISTS `domicilio` (
  `icvedomicilio` int(11) NOT NULL AUTO_INCREMENT,
  `ccalle` varchar(100) CHARACTER SET latin1 NOT NULL,
  `cnuminterior` varchar(10) CHARACTER SET latin1 DEFAULT NULL,
  `cnumexterior` varchar(10) CHARACTER SET latin1 DEFAULT NULL,
  `ccolonia` varchar(100) CHARACTER SET latin1 DEFAULT NULL,
  `cdelegmunicipio` varchar(100) CHARACTER SET latin1 DEFAULT NULL,
  `centfederativa` varchar(100) CHARACTER SET latin1 DEFAULT NULL,
  `cpais` varchar(50) CHARACTER SET latin1 DEFAULT NULL,
  `ccodpostal` varchar(10) CHARACTER SET latin1 DEFAULT NULL,
  `cfotofrente` varchar(255) CHARACTER SET latin1 DEFAULT NULL,
  `ccomprodomicilio` varchar(255) CHARACTER SET latin1 DEFAULT NULL,
  `icveinversionista` int(11) DEFAULT NULL,
  `icvecliente` int(11) DEFAULT NULL,
  PRIMARY KEY (`icvedomicilio`),
  KEY `cveclientedom_idx` (`icvecliente`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `histpagoscapitalinv`
--

DROP TABLE IF EXISTS `histpagoscapitalinv`;
CREATE TABLE IF NOT EXISTS `histpagoscapitalinv` (
  `icvepagohist` int(11) NOT NULL AUTO_INCREMENT,
  `icveinversionista` int(11) DEFAULT NULL,
  `fmontopagado` decimal(10,2) DEFAULT NULL,
  `dfecha_pago` date DEFAULT NULL,
  PRIMARY KEY (`icvepagohist`),
  KEY `icveinversionista` (`icveinversionista`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `inverdetalle`
--

DROP TABLE IF EXISTS `inverdetalle`;
CREATE TABLE IF NOT EXISTS `inverdetalle` (
  `icvedetalleinver` int(11) NOT NULL AUTO_INCREMENT,
  `icveinversionista` int(11) NOT NULL,
  `dfecharegistro` date NOT NULL,
  `dmonto` decimal(10,2) NOT NULL,
  `cstatus` char(1) COLLATE utf16_spanish_ci NOT NULL,
  `invtipooperacion` varchar(2) COLLATE utf16_spanish_ci DEFAULT NULL,
  `invdetobservaciones` varchar(150) COLLATE utf16_spanish_ci DEFAULT NULL,
  PRIMARY KEY (`icvedetalleinver`),
  KEY `cveinversionista_idx` (`icveinversionista`),
  KEY `cveinverpeople_idx` (`icveinversionista`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf16 COLLATE=utf16_spanish_ci COMMENT='	';

--
-- Volcado de datos para la tabla `inverdetalle`
--

INSERT INTO `inverdetalle` (`icvedetalleinver`, `icveinversionista`, `dfecharegistro`, `dmonto`, `cstatus`, `invtipooperacion`, `invdetobservaciones`) VALUES
(1, 1, '2023-11-07', '100000.00', 'A', 'I', 'INVERSION INCIAL'),
(2, 2, '2023-11-07', '200000.00', 'A', 'I', 'INVERSION INCIAL'),
(3, 3, '2023-11-08', '15000.00', 'A', 'I', 'INVERSION INCIAL'),
(4, 4, '2023-11-09', '85000.00', 'A', 'I', 'INVERSION INCIAL'),
(5, 1, '2023-10-15', '20000.00', 'A', 'I', 'INVERSION 2'),
(6, 1, '2023-11-01', '40000.00', 'A', 'I', 'ASASAS'),
(7, 1, '2023-12-20', '40000.00', 'A', 'I', 'QWQWQWQW'),
(8, 4, '2023-12-04', '15000.00', 'A', 'I', 'DES'),
(9, 4, '2024-01-15', '50000.00', 'A', 'I', 'WEWEWEWE'),
(10, 4, '2024-02-01', '5000.00', 'A', 'I', 'FGFGFGFGFG'),
(11, 4, '2024-02-29', '5000.00', 'A', 'I', 'HJHJHJHJHJ'),
(12, 5, '2023-11-10', '20000.00', 'A', 'I', 'INVERSION INCIAL'),
(13, 5, '2023-11-27', '45000.00', 'A', 'I', 'CVCVCVCV'),
(14, 5, '2023-11-29', '35000.00', 'A', 'I', 'KLKLKLKLKL'),
(15, 5, '2023-11-23', '23500.00', 'A', 'I', 'POPOPOPOPO');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `inversionistas`
--

DROP TABLE IF EXISTS `inversionistas`;
CREATE TABLE IF NOT EXISTS `inversionistas` (
  `icveinversionista` int(11) NOT NULL AUTO_INCREMENT,
  `cnombre` varchar(50) CHARACTER SET latin1 NOT NULL,
  `capaterno` varchar(50) CHARACTER SET latin1 NOT NULL,
  `camaterno` varchar(50) CHARACTER SET latin1 NOT NULL,
  `iedad` int(11) NOT NULL,
  `ctelefono` varchar(15) CHARACTER SET latin1 DEFAULT NULL,
  `fcantidadinvertida` decimal(10,2) DEFAULT NULL,
  `itipocuenta` int(11) DEFAULT NULL,
  `icvebanco` int(11) NOT NULL,
  `cuentabancaria` varchar(200) CHARACTER SET latin1 DEFAULT NULL,
  `cemail` varchar(100) CHARACTER SET latin1 DEFAULT NULL,
  `dfecha_alta` date DEFAULT NULL,
  `cantpagadacapital` decimal(10,2) DEFAULT NULL,
  `invstatus` char(2) COLLATE latin1_spanish_ci DEFAULT NULL,
  PRIMARY KEY (`icveinversionista`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;

--
-- Volcado de datos para la tabla `inversionistas`
--

INSERT INTO `inversionistas` (`icveinversionista`, `cnombre`, `capaterno`, `camaterno`, `iedad`, `ctelefono`, `fcantidadinvertida`, `itipocuenta`, `icvebanco`, `cuentabancaria`, `cemail`, `dfecha_alta`, `cantpagadacapital`, `invstatus`) VALUES
(1, 'GUSTAVO', 'ANGULO', 'MELENDEZ', 32, '5556581111', '200000.00', 2, 9, '55555555555555', 'mail123@mail.com', '2023-11-01', '0.00', NULL),
(2, 'ISRAEL', 'ESLAVA', 'JIMÉNEZ', 37, '5532423901', '200000.00', 2, 17, '600523889777411', 'correo@correo.com', '2023-11-07', '0.00', NULL),
(3, 'LA MINA', 'GARCÍA', 'MARTÍNEZ', 42, '5513967215', '15000.00', 2, 11, '4578996', 'correo@gamil.com', '2023-11-08', '0.00', NULL),
(4, 'MARI ESTHELAA', 'ANGULO', 'MELENDEZ', 56, '5587386942', '160000.00', 3, 3, '12121212333444', 'r@unadmexico.mx', '2023-11-09', '0.00', NULL),
(5, 'NANCY ISELA', 'ARREDONDO', 'CURIEL', 36, '5545256745', '123500.00', 2, 23, '1222221134546677788000', 'ycnan87@gmail.com', '2023-11-10', '0.00', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `paginteresesinv`
--

DROP TABLE IF EXISTS `paginteresesinv`;
CREATE TABLE IF NOT EXISTS `paginteresesinv` (
  `icvepago` int(11) NOT NULL AUTO_INCREMENT,
  `icveinversionista` int(11) NOT NULL,
  `icvedetalleinver` int(11) NOT NULL,
  `fmonto_pagado` decimal(10,2) NOT NULL,
  `dfechapago` date NOT NULL,
  PRIMARY KEY (`icvepago`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `permisosacceso`
--

DROP TABLE IF EXISTS `permisosacceso`;
CREATE TABLE IF NOT EXISTS `permisosacceso` (
  `icvepermisoacceso` int(11) NOT NULL AUTO_INCREMENT,
  `cpantalla` varchar(100) CHARACTER SET latin1 NOT NULL,
  `cdescripcion` varchar(200) CHARACTER SET latin1 NOT NULL,
  PRIMARY KEY (`icvepermisoacceso`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rolespermiso`
--

DROP TABLE IF EXISTS `rolespermiso`;
CREATE TABLE IF NOT EXISTS `rolespermiso` (
  `icverolpermiso` int(11) NOT NULL AUTO_INCREMENT,
  `icveroles` int(11) DEFAULT NULL,
  `icvepermisoacceso` int(11) DEFAULT NULL,
  PRIMARY KEY (`icverolpermiso`),
  KEY `icveroles` (`icveroles`),
  KEY `icvepermisoacceso` (`icvepermisoacceso`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
CREATE TABLE IF NOT EXISTS `usuarios` (
  `icveusuario` int(11) NOT NULL AUTO_INCREMENT,
  `cusername` varchar(50) CHARACTER SET latin1 NOT NULL,
  `cpassword` varchar(255) CHARACTER SET latin1 NOT NULL,
  `cnombre` varchar(100) CHARACTER SET latin1 NOT NULL,
  `capellido` varchar(100) CHARACTER SET latin1 NOT NULL,
  `dfechavencimiento` date DEFAULT NULL,
  `icverol` int(11) DEFAULT NULL,
  `cavatar` varchar(45) CHARACTER SET latin1 DEFAULT NULL,
  PRIMARY KEY (`icveusuario`),
  UNIQUE KEY `cusername` (`cusername`),
  KEY `icverol` (`icverol`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`icveusuario`, `cusername`, `cpassword`, `cnombre`, `capellido`, `dfechavencimiento`, `icverol`, `cavatar`) VALUES
(1, 'gangulo', '$2y$10$OjRNp4Ca7VtDHR5aB.ysT.Q9vJUx4KfkHpZ28k41a4sPNTqKXCu1C', 'Gustavo', 'Angulo', '2023-12-31', 1, NULL),
(2, 'nmayorquin', '$2y$10$rsS/To2KkElV0uNXekRY0emltoWDuPdsuFXX.n.ZXukJAwaT7yI.6', 'Noemi', 'Mayorquin', '2023-12-31', 1, NULL);

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `cattipocliente`
--
ALTER TABLE `cattipocliente`
  ADD CONSTRAINT `cvetasacomision` FOREIGN KEY (`icvetasascomisiones`) REFERENCES `cattasascomisiones` (`icvetasascomisiones`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `domicilio`
--
ALTER TABLE `domicilio`
  ADD CONSTRAINT `cveclientedom` FOREIGN KEY (`icvecliente`) REFERENCES `clientes` (`icvecliente`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `inverdetalle`
--
ALTER TABLE `inverdetalle`
  ADD CONSTRAINT `cveinverpeople` FOREIGN KEY (`icveinversionista`) REFERENCES `inversionistas` (`icveinversionista`) ON DELETE CASCADE ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
