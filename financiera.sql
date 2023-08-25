-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3306
-- Tiempo de generación: 25-08-2023 a las 01:04:38
-- Versión del servidor: 8.0.27
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
  `icveroles` int NOT NULL AUTO_INCREMENT,
  `cnombrerol` varchar(50) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `bstatus` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`icveroles`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cattasascomisiones`
--

DROP TABLE IF EXISTS `cattasascomisiones`;
CREATE TABLE IF NOT EXISTS `cattasascomisiones` (
  `icvetasascomisiones` int NOT NULL AUTO_INCREMENT,
  `cdescripciontascom` varchar(45) COLLATE latin1_spanish_ci NOT NULL,
  `ftasainteres` double NOT NULL COMMENT 'Este sería el manejo de interés que se le cobrará al cliente',
  `cattasacomobs` varchar(100) COLLATE latin1_spanish_ci DEFAULT NULL,
  PRIMARY KEY (`icvetasascomisiones`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;

--
-- Volcado de datos para la tabla `cattasascomisiones`
--

INSERT INTO `cattasascomisiones` (`icvetasascomisiones`, `cdescripciontascom`, `ftasainteres`, `cattasacomobs`) VALUES
(1, 'TASA INTERES A1', 8.9, 'NINGUNA');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cattipocliente`
--

DROP TABLE IF EXISTS `cattipocliente`;
CREATE TABLE IF NOT EXISTS `cattipocliente` (
  `icvetipocliente` int NOT NULL,
  `cdescriptipocliente` varchar(45) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `cabreviiatipo` varchar(11) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `icvetasascomisiones` int NOT NULL,
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
  `icvecliente` int NOT NULL AUTO_INCREMENT,
  `cnombre` varchar(50) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `capaterno` varchar(50) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `camaterno` varchar(50) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `iedad` int NOT NULL,
  `icvetipocliente` int NOT NULL,
  `dfechanaciemiento` date NOT NULL,
  `dfechaalta` date NOT NULL,
  `cestatus` char(2) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
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
  `icvedomicilio` int NOT NULL AUTO_INCREMENT,
  `icvecliente` int DEFAULT NULL,
  `ccalle` varchar(100) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `cnuminterior` varchar(10) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `cnumexterior` varchar(10) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `ccolonia` varchar(100) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `cdelegmunicipio` varchar(100) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `centfederativa` varchar(100) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `cpais` varchar(50) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `ccodpostal` varchar(10) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `cfotofrente` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `ccomprodomicilio` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  PRIMARY KEY (`icvedomicilio`),
  KEY `icvecliente` (`icvecliente`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `histpagoscapitalinv`
--

DROP TABLE IF EXISTS `histpagoscapitalinv`;
CREATE TABLE IF NOT EXISTS `histpagoscapitalinv` (
  `icvepagohist` int NOT NULL AUTO_INCREMENT,
  `icveinversionista` int DEFAULT NULL,
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
  `icveinversionista` int NOT NULL AUTO_INCREMENT,
  `cnombre` varchar(50) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `capaterno` varchar(50) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `camaterno` varchar(50) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `iedad` int DEFAULT NULL,
  `cdomicilio` varchar(100) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `ctelefono` varchar(15) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `fcantidadinvertida` decimal(10,2) DEFAULT NULL,
  `cuentabancaria` varchar(20) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `cemail` varchar(100) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
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
  `icvepago` int NOT NULL AUTO_INCREMENT,
  `icveinversionista` int NOT NULL,
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
  `icvepermisoacceso` int NOT NULL AUTO_INCREMENT,
  `cpantalla` varchar(100) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `cdescripcion` varchar(200) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  PRIMARY KEY (`icvepermisoacceso`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rolespermiso`
--

DROP TABLE IF EXISTS `rolespermiso`;
CREATE TABLE IF NOT EXISTS `rolespermiso` (
  `icverolpermiso` int NOT NULL AUTO_INCREMENT,
  `icveroles` int DEFAULT NULL,
  `icvepermisoacceso` int DEFAULT NULL,
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
  `icveusuario` int NOT NULL AUTO_INCREMENT,
  `cusername` varchar(50) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `cpassword` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `cnombre` varchar(100) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `capellido` varchar(100) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `dfechavencimiento` date DEFAULT NULL,
  `icverol` int DEFAULT NULL,
  `cavatar` varchar(45) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
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
