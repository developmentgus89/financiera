-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3306
-- Tiempo de generación: 25-08-2023 a las 06:00:47
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
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;

--
-- Volcado de datos para la tabla `cattasascomisiones`
--

INSERT INTO `cattasascomisiones` (`icvetasascomisiones`, `cdescripciontascom`, `ftasainteres`, `cattasacomobs`) VALUES
(1, 'TASA INTERES A1', 8.9, 'NINGUNA'),
(2, 'TASA INTERES A2', 9.9, 'CLIENTES A2'),
(3, 'TASA INTERÉS A3', 10.9, 'CLIENTE A3'),
(4, 'TASA INTERES B1', 15.9, 'CLIENTES B1'),
(5, 'TASA DE INTERES B2', 16.9, 'CLIENTE B2'),
(6, 'TASA INTERES B3', 17.9, 'CLIENTES B3'),
(7, 'TASA DE INTERES C1', 22.9, 'CLIENTES C1'),
(8, 'TASA INTERES C2', 23.9, 'CLIENTES C2'),
(9, 'TASA INTERES C3', 26.9, 'CLIENTES C3'),
(10, 'TASA INTERES C4', 29.9, 'CLIENTES C4');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cattipocliente`
--

DROP TABLE IF EXISTS `cattipocliente`;
CREATE TABLE IF NOT EXISTS `cattipocliente` (
  `icvetipocliente` int(11) NOT NULL,
  `cdescriptipocliente` varchar(45) CHARACTER SET latin1 NOT NULL,
  `cabreviiatipo` varchar(11) CHARACTER SET latin1 NOT NULL,
  `icvetasascomisiones` int(11) NOT NULL,
  PRIMARY KEY (`icvetipocliente`),
  KEY `icvetasacomis_idx` (`icvetasascomisiones`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;

--
-- Volcado de datos para la tabla `cattipocliente`
--

INSERT INTO `cattipocliente` (`icvetipocliente`, `cdescriptipocliente`, `cabreviiatipo`, `icvetasascomisiones`) VALUES
(1, 'A1', 'A1', 1);

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
  PRIMARY KEY (`icvecliente`),
  KEY `tipocliente_idx` (`icvetipocliente`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;

--
-- Volcado de datos para la tabla `clientes`
--

INSERT INTO `clientes` (`icvecliente`, `cnombre`, `capaterno`, `camaterno`, `iedad`, `icvetipocliente`, `dfechanaciemiento`, `dfechaalta`, `cestatus`) VALUES
(1, 'ADRIAN GUSTAVO', 'ANGULO', 'MELENDEZ', 33, 1, '2023-12-31', '2023-08-20', '1');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `domicilio`
--

DROP TABLE IF EXISTS `domicilio`;
CREATE TABLE IF NOT EXISTS `domicilio` (
  `icvedomicilio` int(11) NOT NULL AUTO_INCREMENT,
  `icvecliente` int(11) DEFAULT NULL,
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
  PRIMARY KEY (`icvedomicilio`),
  KEY `icvecliente` (`icvecliente`)
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
-- Estructura de tabla para la tabla `inversionistas`
--

DROP TABLE IF EXISTS `inversionistas`;
CREATE TABLE IF NOT EXISTS `inversionistas` (
  `icveinversionista` int(11) NOT NULL AUTO_INCREMENT,
  `cnombre` varchar(50) CHARACTER SET latin1 NOT NULL,
  `capaterno` varchar(50) CHARACTER SET latin1 NOT NULL,
  `camaterno` varchar(50) CHARACTER SET latin1 DEFAULT NULL,
  `iedad` int(11) DEFAULT NULL,
  `cdomicilio` varchar(100) CHARACTER SET latin1 DEFAULT NULL,
  `ctelefono` varchar(15) CHARACTER SET latin1 DEFAULT NULL,
  `fcantidadinvertida` decimal(10,2) DEFAULT NULL,
  `cuentabancaria` varchar(20) CHARACTER SET latin1 DEFAULT NULL,
  `cemail` varchar(100) CHARACTER SET latin1 DEFAULT NULL,
  `dfecha_pago` date DEFAULT NULL,
  `dfecha_alta` date DEFAULT NULL,
  PRIMARY KEY (`icveinversionista`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `paginteresesinv`
--

DROP TABLE IF EXISTS `paginteresesinv`;
CREATE TABLE IF NOT EXISTS `paginteresesinv` (
  `icvepago` int(11) NOT NULL AUTO_INCREMENT,
  `icveinversionista` int(11) NOT NULL,
  `fmonto_pagado` decimal(10,2) NOT NULL,
  `dfechapago` date NOT NULL,
  PRIMARY KEY (`icvepago`),
  KEY `icveinversionista` (`icveinversionista`)
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
  ADD CONSTRAINT `icvetasacomis` FOREIGN KEY (`icvetasascomisiones`) REFERENCES `cattasascomisiones` (`icvetasascomisiones`);

--
-- Filtros para la tabla `clientes`
--
ALTER TABLE `clientes`
  ADD CONSTRAINT `tipocliente` FOREIGN KEY (`icvetipocliente`) REFERENCES `cattipocliente` (`icvetipocliente`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
