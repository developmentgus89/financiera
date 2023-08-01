-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3306
-- Tiempo de generación: 01-08-2023 a las 00:40:15
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
  `cnombrerol` varchar(50) NOT NULL,
  `bstatus` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`icveroles`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cattipocliente`
--

DROP TABLE IF EXISTS `cattipocliente`;
CREATE TABLE IF NOT EXISTS `cattipocliente` (
  `icvetipocliente` int(11) NOT NULL,
  `cdescriptipocliente` varchar(45) NOT NULL,
  `cabreviiatipo` varchar(11) NOT NULL,
  PRIMARY KEY (`icvetipocliente`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `clientes`
--

DROP TABLE IF EXISTS `clientes`;
CREATE TABLE IF NOT EXISTS `clientes` (
  `icvecliente` int(11) NOT NULL AUTO_INCREMENT,
  `cnombre` varchar(50) NOT NULL,
  `capaterno` varchar(50) NOT NULL,
  `camaterno` varchar(50) NOT NULL,
  `iedad` int(11) NOT NULL,
  `icvetipocliente` int(11) NOT NULL,
  `dfechanaciemiento` date NOT NULL,
  `dfechaalta` date NOT NULL,
  `cestatus` char(2) NOT NULL,
  PRIMARY KEY (`icvecliente`),
  KEY `tipocliente_idx` (`icvetipocliente`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `domicilio`
--

DROP TABLE IF EXISTS `domicilio`;
CREATE TABLE IF NOT EXISTS `domicilio` (
  `icvedomicilio` int(11) NOT NULL AUTO_INCREMENT,
  `icvecliente` int(11) DEFAULT NULL,
  `ccalle` varchar(100) NOT NULL,
  `cnuminterior` varchar(10) DEFAULT NULL,
  `cnumexterior` varchar(10) DEFAULT NULL,
  `ccolonia` varchar(100) DEFAULT NULL,
  `cdelegmunicipio` varchar(100) DEFAULT NULL,
  `centfederativa` varchar(100) DEFAULT NULL,
  `cpais` varchar(50) DEFAULT NULL,
  `ccodpostal` varchar(10) DEFAULT NULL,
  `cfotofrente` varchar(255) DEFAULT NULL,
  `ccomprodomicilio` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`icvedomicilio`),
  KEY `icvecliente` (`icvecliente`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

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
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `inversionistas`
--

DROP TABLE IF EXISTS `inversionistas`;
CREATE TABLE IF NOT EXISTS `inversionistas` (
  `icveinversionista` int(11) NOT NULL AUTO_INCREMENT,
  `cnombre` varchar(50) NOT NULL,
  `capaterno` varchar(50) NOT NULL,
  `camaterno` varchar(50) DEFAULT NULL,
  `iedad` int(11) DEFAULT NULL,
  `cdomicilio` varchar(100) DEFAULT NULL,
  `ctelefono` varchar(15) DEFAULT NULL,
  `fcantidadinvertida` decimal(10,2) DEFAULT NULL,
  `cuentabancaria` varchar(20) DEFAULT NULL,
  `cemail` varchar(100) DEFAULT NULL,
  `dfecha_pago` date DEFAULT NULL,
  `dfecha_alta` date DEFAULT NULL,
  PRIMARY KEY (`icveinversionista`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

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
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `permisosacceso`
--

DROP TABLE IF EXISTS `permisosacceso`;
CREATE TABLE IF NOT EXISTS `permisosacceso` (
  `icvepermisoacceso` int(11) NOT NULL AUTO_INCREMENT,
  `cpantalla` varchar(100) NOT NULL,
  `cdescripcion` varchar(200) NOT NULL,
  PRIMARY KEY (`icvepermisoacceso`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

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
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
CREATE TABLE IF NOT EXISTS `usuarios` (
  `icveusuario` int(11) NOT NULL AUTO_INCREMENT,
  `cusername` varchar(50) NOT NULL,
  `cpassword` varchar(255) NOT NULL,
  `cnombre` varchar(100) NOT NULL,
  `capellido` varchar(100) NOT NULL,
  `dfechavencimiento` date DEFAULT NULL,
  `icverol` int(11) DEFAULT NULL,
  `cavatar` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`icveusuario`),
  UNIQUE KEY `cusername` (`cusername`),
  KEY `icverol` (`icverol`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`icveusuario`, `cusername`, `cpassword`, `cnombre`, `capellido`, `dfechavencimiento`, `icverol`, `cavatar`) VALUES
(1, 'gangulo', '$2y$10$OjRNp4Ca7VtDHR5aB.ysT.Q9vJUx4KfkHpZ28k41a4sPNTqKXCu1C', 'Gustavo', 'Angulo', '2023-12-31', 1, NULL);

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `clientes`
--
ALTER TABLE `clientes`
  ADD CONSTRAINT `tipocliente` FOREIGN KEY (`icvetipocliente`) REFERENCES `cattipocliente` (`icvetipocliente`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
