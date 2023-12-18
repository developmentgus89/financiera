-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3306
-- Tiempo de generación: 16-12-2023 a las 08:29:45
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
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;

--
-- Volcado de datos para la tabla `cattasascomisiones`
--

INSERT INTO `cattasascomisiones` (`icvetasascomisiones`, `cdescripciontascom`, `ftasainteres`, `cattasacomobs`) VALUES
(1, 'TASA SEMANAL DEL 10 % FINANCIERA MAYORQUIN', 10, 'TASA DE INICIO PARA CLIENTES'),
(2, 'TASA MENSUAL DEL 5 %', 5, 'TAS DE INTERES A INVERSIONISTA'),
(3, 'TASA SEMANL DEL 12%', 12, 'CLEINTES TIPO B1'),
(4, 'TASA MENSUAL INV 10%', 10, 'PAGO MENSUAL'),
(5, 'TASA DE INTERES MENSUAL A INVER 7.5 %', 7.5, 'INTERES INVERSIONISTA 7.5%');

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
-- Estructura de tabla para la tabla `inverdetalle`
--

DROP TABLE IF EXISTS `inverdetalle`;
CREATE TABLE IF NOT EXISTS `inverdetalle` (
  `icvedetalleinver` int(11) NOT NULL AUTO_INCREMENT,
  `icveinversionista` int(11) NOT NULL,
  `icvetasascomisiones` int(11) NOT NULL,
  `dfecharegistro` date NOT NULL,
  `dmonto` decimal(10,2) NOT NULL,
  `cstatus` char(1) COLLATE utf16_spanish_ci NOT NULL,
  `invtipooperacion` varchar(2) COLLATE utf16_spanish_ci DEFAULT NULL,
  `invdetobservaciones` varchar(150) COLLATE utf16_spanish_ci DEFAULT NULL,
  PRIMARY KEY (`icvedetalleinver`),
  KEY `cveinverpeople_idx` (`icveinversionista`),
  KEY `cvetaxes_idx` (`icvetasascomisiones`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf16 COLLATE=utf16_spanish_ci COMMENT='	';

--
-- Volcado de datos para la tabla `inverdetalle`
--

INSERT INTO `inverdetalle` (`icvedetalleinver`, `icveinversionista`, `icvetasascomisiones`, `dfecharegistro`, `dmonto`, `cstatus`, `invtipooperacion`, `invdetobservaciones`) VALUES
(1, 1, 1, '2023-10-25', '35333.00', 'A', 'I', 'INVERSION INCIAL - SE AGREGARON 333 PESOS'),
(2, 1, 3, '2023-11-15', '56000.00', 'A', 'I', 'ASASASA'),
(3, 2, 1, '2023-12-03', '1000333.00', 'A', 'I', 'INVERSION INCIAL'),
(4, 3, 1, '2023-12-03', '1500000.00', 'A', 'I', 'INVERSION INCIAL'),
(5, 4, 1, '2023-12-03', '100000.00', 'A', 'I', 'INVERSION INCIAL'),
(6, 2, 1, '2023-12-05', '230000.00', 'A', 'I', 'SEGUNDA INVERSIÓN PARA NANCY'),
(7, 4, 2, '2023-12-05', '45000.00', 'A', 'I', 'SEGUNDA INVERSION PARA ESLAVA'),
(8, 1, 3, '2023-12-01', '10666.53', 'A', 'I', 'PRUEBAS DE DEMOSTRACION AL CLIENTE'),
(9, 2, 3, '2023-12-05', '666666.00', 'A', 'I', 'SOLO BELLAS OBSERACIONES'),
(10, 5, 4, '2023-12-05', '55000.00', 'A', 'I', 'INVERSION INCIAL'),
(11, 4, 1, '2023-12-05', '1000000.00', 'A', 'I', 'ENTRA POR CONFIANZA'),
(12, 1, 2, '2023-10-02', '50000.00', 'A', 'I', 'CUARTA INVERSION O CUALQUIER OBSERVACION'),
(13, 3, 1, '2023-12-05', '500666.00', 'A', 'I', 'SEGUNDA INVERSION'),
(14, 1, 4, '2023-12-07', '5555.75', 'A', 'I', 'QUINTA INVERSION O LE PUEDO PONER LO QUE SE ME DE LA GANA'),
(15, 2, 5, '2023-12-14', '30000.00', 'A', 'I', 'CUARTA INVERSION O LO QUE QUIERA PONER AQUI');

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
(1, 'ADRIAN GUSTAVO', 'ANGULOS', 'MELENDEZ', 34, '5587386942', '207554.53', 2, 28, '66666999999999', 'gusangulomel89@gmail.com', '2023-10-12', '0.00', NULL),
(2, 'NANCY ISELA', 'ARREDONDO', 'CURIEL', 36, '5545251345', '1966999.00', 2, 8, '4534567845238945', 'ycnan87@hotmial.com', '2023-12-03', '0.00', NULL),
(3, 'NOEMI', 'MAYORQUIN', 'MELENDEZ', 48, '6645012820', '2000666.00', 2, 28, '456723445578345461', 'mayorquinmn@gmail.com', '2023-12-03', '0.00', NULL),
(4, 'JOSÉ ISRAEL', 'ESLAVA', 'JIMÉNEZ', 37, '5523232323', '1145000.00', 2, 22, '865545346597899', 'eslava@cibercom.com', '2023-12-03', '0.00', NULL),
(5, 'PAULINA', 'MAGALLANES', 'LOPEZ', 23, '5556581111', '55000.00', 2, 8, '12323222', 'mailpruebas@mail.com', '2023-12-05', '0.00', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pagcapitalinv`
--

DROP TABLE IF EXISTS `pagcapitalinv`;
CREATE TABLE IF NOT EXISTS `pagcapitalinv` (
  `icvepagocapitalinv` int(11) NOT NULL AUTO_INCREMENT,
  `icveinverdetalle` int(11) NOT NULL,
  `fmontopagado` decimal(10,2) NOT NULL,
  `dfecha_pago` datetime NOT NULL,
  `comprobante` varchar(120) COLLATE latin1_spanish_ci NOT NULL,
  `statuspago` char(2) COLLATE latin1_spanish_ci DEFAULT NULL,
  PRIMARY KEY (`icvepagocapitalinv`),
  KEY `icveinversionista` (`icveinverdetalle`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci COMMENT='Tabla para llevar el registro de pagos directos a capital del inversionista';

--
-- Volcado de datos para la tabla `pagcapitalinv`
--

INSERT INTO `pagcapitalinv` (`icvepagocapitalinv`, `icveinverdetalle`, `fmontopagado`, `dfecha_pago`, `comprobante`, `statuspago`) VALUES
(1, 14, '20000.00', '2023-12-15 22:28:31', '../docs/CapitalPayments/Notion_app_logo-14.png', 'P'),
(2, 14, '20000.00', '2023-12-15 22:37:49', '../docs/CapitalPayments/KotlinIcon-14.png', 'P');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `paginteresesinv`
--

DROP TABLE IF EXISTS `paginteresesinv`;
CREATE TABLE IF NOT EXISTS `paginteresesinv` (
  `icvepago` int(11) NOT NULL AUTO_INCREMENT,
  `icveinversionista` int(11) NOT NULL,
  `icvedetalleinver` int(11) NOT NULL,
  `montoinvhist` decimal(10,2) NOT NULL DEFAULT '0.00' COMMENT 'Inversión al momento cuando se genera el registro del pago',
  `fmonto_pagado` decimal(10,2) NOT NULL,
  `dfecharegistro` datetime NOT NULL,
  `cstatuspago` char(2) COLLATE latin1_spanish_ci NOT NULL COMMENT 'NP = No Pagado\nP = Pagado',
  `dtfechapagconfirmado` datetime DEFAULT NULL,
  `comprobantepago` varchar(250) COLLATE latin1_spanish_ci DEFAULT NULL,
  PRIMARY KEY (`icvepago`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;

--
-- Volcado de datos para la tabla `paginteresesinv`
--

INSERT INTO `paginteresesinv` (`icvepago`, `icveinversionista`, `icvedetalleinver`, `montoinvhist`, `fmonto_pagado`, `dfecharegistro`, `cstatuspago`, `dtfechapagconfirmado`, `comprobantepago`) VALUES
(1, 1, 8, '10666.53', '1066.65', '2023-11-05 23:35:51', 'P', NULL, NULL),
(2, 1, 8, '10666.53', '1066.65', '2023-12-05 23:37:28', 'NP', NULL, NULL),
(3, 1, 2, '56000.00', '6720.00', '2023-11-05 23:38:24', 'NP', NULL, NULL),
(4, 4, 7, '45000.00', '2250.00', '2023-12-06 00:59:22', 'NP', NULL, NULL),
(5, 1, 14, '55555.00', '5555.50', '2023-11-06 21:04:19', 'P', '2023-11-15 22:31:06', '../docs/sql_icon-5.png'),
(6, 3, 13, '500666.00', '50066.60', '2023-12-12 23:31:16', 'NP', NULL, NULL),
(7, 4, 5, '100000.00', '10000.00', '2023-12-12 23:35:51', 'NP', NULL, NULL),
(8, 4, 11, '1000000.00', '100000.00', '2023-12-12 23:36:26', 'NP', NULL, NULL),
(9, 2, 9, '666666.00', '79999.92', '2023-11-14 11:39:47', 'P', '2023-11-14 21:18:15', '../docs/79999-9.jpg'),
(10, 2, 6, '230000.00', '23000.00', '2023-11-13 11:40:49', 'P', '2023-11-13 20:55:33', '../docs/23000-10.jpg'),
(11, 1, 2, '56000.00', '6720.00', '2023-12-14 17:05:35', 'NP', NULL, NULL),
(12, 5, 10, '55000.00', '5500.00', '2023-12-14 18:13:50', 'NP', NULL, NULL),
(13, 2, 6, '230000.00', '23000.00', '2023-12-14 21:05:48', 'NP', NULL, NULL),
(14, 2, 3, '1000333.00', '100033.30', '2023-12-14 21:11:50', 'P', '2023-12-14 21:12:16', '../docs/1066-14.jpg'),
(15, 2, 9, '666666.00', '79999.92', '2023-12-14 21:21:24', 'P', '2023-12-14 21:26:17', '../docs/tipos de datos-15.jpg'),
(16, 2, 15, '70000.00', '5250.00', '2023-11-14 22:41:54', 'NP', NULL, NULL),
(17, 2, 15, '30000.00', '2250.00', '2023-12-15 21:45:07', 'NP', NULL, NULL),
(18, 1, 14, '5555.75', '555.58', '2023-12-15 22:40:20', 'P', '2023-12-16 02:05:27', '../docs/objetivo-18.png'),
(19, 1, 1, '35333.00', '3533.30', '2023-12-16 01:05:00', 'NP', NULL, NULL),
(20, 1, 12, '50000.00', '2500.00', '2023-12-16 01:05:09', 'NP', NULL, NULL);

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

-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `vw_paysinterests`
-- (Véase abajo para la vista actual)
--
DROP VIEW IF EXISTS `vw_paysinterests`;
CREATE TABLE IF NOT EXISTS `vw_paysinterests` (
`icvepago` int(11)
,`icvedetalleinver` int(11)
,`dmonto` decimal(10,2)
,`montoinvehist` decimal(10,2)
,`importe` decimal(10,2)
,`fecha` datetime
,`statuspago` char(2)
,`dtfechapagconfirmado` datetime
,`icveinversionista` int(11)
,`cnombre` varchar(50)
,`capaterno` varchar(50)
,`camaterno` varchar(50)
);

-- --------------------------------------------------------

--
-- Estructura para la vista `vw_paysinterests`
--
DROP TABLE IF EXISTS `vw_paysinterests`;

DROP VIEW IF EXISTS `vw_paysinterests`;
CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `vw_paysinterests`  AS SELECT `pagos`.`icvepago` AS `icvepago`, `inverdetalle`.`icvedetalleinver` AS `icvedetalleinver`, `inverdetalle`.`dmonto` AS `dmonto`, `pagos`.`montoinvhist` AS `montoinvehist`, `pagos`.`fmonto_pagado` AS `importe`, `pagos`.`dfecharegistro` AS `fecha`, `pagos`.`cstatuspago` AS `statuspago`, `pagos`.`dtfechapagconfirmado` AS `dtfechapagconfirmado`, `inversionistas`.`icveinversionista` AS `icveinversionista`, `inversionistas`.`cnombre` AS `cnombre`, `inversionistas`.`capaterno` AS `capaterno`, `inversionistas`.`camaterno` AS `camaterno` FROM ((`paginteresesinv` `pagos` join `inversionistas` on((`pagos`.`icveinversionista` = `inversionistas`.`icveinversionista`))) join `inverdetalle` on((`inverdetalle`.`icveinversionista` = `pagos`.`icveinversionista`))) ORDER BY `pagos`.`dfecharegistro` DESC ;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `cattipocliente`
--
ALTER TABLE `cattipocliente`
  ADD CONSTRAINT `cvetasacomision` FOREIGN KEY (`icvetasascomisiones`) REFERENCES `cattasascomisiones` (`icvetasascomisiones`);

--
-- Filtros para la tabla `domicilio`
--
ALTER TABLE `domicilio`
  ADD CONSTRAINT `cveclientedom` FOREIGN KEY (`icvecliente`) REFERENCES `clientes` (`icvecliente`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
