-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 14-03-2019 a las 21:15:28
-- Versión del servidor: 5.7.20-log
-- Versión de PHP: 7.2.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `rbdb`
--

DELIMITER $$
--
-- Procedimientos
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `spBuscarPregunta` (IN `_id` INT)  NO SQL
BEGIN
SELECT nombres as usuario,titulo,preguntas.descripcion,fecha,preguntas.imagen,temas.descripcion as tema,preguntas.like,preguntas.dislike,preguntas.views,estado FROM preguntas INNER JOIN usuarios on preguntas.usuario=usuarios.email 
INNER JOIN temas on preguntas.id_pregunta= temas.id_pregunta where preguntas.id_pregunta=_id;

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `spBusqueda` (IN `dato` VARCHAR(50))  NO SQL
BEGIN
SET lc_time_names = 'es_ES';
SELECT (SELECT nombres from usuarios where email=pre.usuario) as usuario,pre.id_pregunta,titulo,pre.descripcion,imagen,
DATE_FORMAT(fecha,'%d de %b del %Y') as fecha,
pre.views,pre.like,pre.dislike, (SELECT COUNT(*) FROM respuestas WHERE id_pregunta=pre.id_pregunta) as respuestas,temas.descripcion as tema, 
(SELECT COUNT(*) FROM temas WHERE temas.id_pregunta=pre.id_pregunta) as num_temas  
 FROM preguntas as pre
INNER JOIN temas on temas.id_pregunta=pre.id_pregunta 
where pre.estado='ABIERTA' and (pre.titulo like dato or pre.id_pregunta IN  (SELECT id_pregunta from temas as t where t.descripcion like dato)) order by pre.views DESC,pre.id_pregunta  limit 50;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `spDislikePregunta` (IN `_id` INT)  NO SQL
BEGIN 

UPDATE preguntas SET preguntas.dislike = preguntas.dislike + 1 where id_pregunta=_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `spEstadisticasCont` ()  NO SQL
begin 
SELECT (select count(*) from preguntas) as total_preguntas, (select count(*) from respuestas) as total_respuestas,  (select count(*) from usuarios) as total_usuarios, (select count(*) from preguntas  where preguntas.estado= 'ABIERTA' ) as preguntas_abiertas;
end$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `spEstPreguntasMes` ()  NO SQL
BEGIN
SET lc_time_names = 'es_ES';
select  CONCAT(UPPER(SUBSTRING(MonthName(fecha),1,1)),LOWER(SUBSTRING(MonthName(fecha),2)))  as label, count(*) as y from preguntas  Group By label ;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `spGuardarPregunta` (IN `_usuario` VARCHAR(45), IN `_titulo` VARCHAR(160), IN `_descripcion` TEXT, IN `_imagen` VARCHAR(100))  NO SQL
begin 

if(_imagen = '')THEN

insert into preguntas VALUES(_usuario,null,_titulo,_descripcion,null,NOW(),0,0,0,'ABIERTA');

ELSE insert into preguntas VALUES(_usuario,null,_titulo,_descripcion,_imagen,NOW(),0,0,0,'ABIERTA');

end if;




end$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `spGuardarRespuesta` (IN `_idPregunta` INT, IN `_usuario` VARCHAR(45), IN `_descripcion` TEXT)  NO SQL
begin
insert into respuestas VALUES(null,_usuario,_idPregunta,_descripcion,NOW(),0,0);

end$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `spGuardarTema` (`_usuario` VARCHAR(45), `_tema` VARCHAR(20))  BEGIN

INSERT INTO temas (descripcion,id_pregunta) (SELECT _tema, max(id_pregunta) FROM preguntas where usuario=_usuario);

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `spLikePregunta` (IN `_id` INT)  NO SQL
BEGIN 

UPDATE preguntas SET preguntas.like = preguntas.like + 1 where id_pregunta=_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `spMisPreguntas` (IN `_user` VARCHAR(40))  NO SQL
BEGIN
SET lc_time_names = 'es_ES';
SELECT (SELECT nombres from usuarios where email=pre.usuario) as usuario,pre.id_pregunta,titulo,pre.descripcion,imagen,
DATE_FORMAT(fecha,'%d de %b del %Y') as fecha,
pre.views,pre.like,pre.dislike, (SELECT COUNT(*) FROM respuestas WHERE id_pregunta=pre.id_pregunta) as respuestas,temas.descripcion as tema, 
(SELECT COUNT(*) FROM temas WHERE temas.id_pregunta=pre.id_pregunta) as num_temas  
 FROM preguntas as pre
INNER JOIN temas on temas.id_pregunta=pre.id_pregunta where pre.usuario=_user order by pre.fecha DESC,pre.id_pregunta  limit 50;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `spPreguntasDestacadas` ()  BEGIN
SET lc_time_names = 'es_ES';
SELECT (SELECT nombres from usuarios where email=pre.usuario) as usuario,pre.id_pregunta,titulo,pre.descripcion,imagen,
DATE_FORMAT(fecha,'%d de %b del %Y') as fecha,
pre.views,pre.like,pre.dislike, (SELECT COUNT(*) FROM respuestas WHERE id_pregunta=pre.id_pregunta) as respuestas,temas.descripcion as tema, 
(SELECT COUNT(*) FROM temas WHERE temas.id_pregunta=pre.id_pregunta) as num_temas  
 FROM preguntas as pre
INNER JOIN temas on temas.id_pregunta=pre.id_pregunta where pre.estado='ABIERTA' order by pre.views DESC,pre.id_pregunta  limit 50;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `spVerRespuestas` (IN `_idPregunta` INT)  NO SQL
BEGIN

SELECT id_respuesta,usuario, nombres,id_pregunta,descripcion, DATE_FORMAT(fecha_respuesta,'%d de %b del %Y') as fecha_respuesta ,respuestas.like,respuestas.dislike FROM respuestas INNER join usuarios on usuarios.email= usuario where id_pregunta=_idPregunta;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `spViewPregunta` (IN `_id` INT(6))  NO SQL
BEGIN 

UPDATE preguntas SET preguntas.views = preguntas.views + 1 where id_pregunta=_id;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `notificaciones`
--

CREATE TABLE `notificaciones` (
  `id_notificaciones` int(10) UNSIGNED ZEROFILL NOT NULL,
  `usuarios_email` varchar(45) NOT NULL,
  `fecha` datetime NOT NULL,
  `estado` varchar(45) NOT NULL DEFAULT 'ACTIVA',
  `descripcion` varchar(45) NOT NULL,
  `tipo` varchar(15) NOT NULL,
  `identificador` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `preguntas`
--

CREATE TABLE `preguntas` (
  `usuario` varchar(45) NOT NULL,
  `id_pregunta` int(6) UNSIGNED ZEROFILL NOT NULL,
  `titulo` varchar(160) NOT NULL,
  `descripcion` text NOT NULL,
  `imagen` varchar(100) DEFAULT NULL,
  `fecha` datetime NOT NULL,
  `views` int(11) NOT NULL DEFAULT '0',
  `like` int(11) NOT NULL DEFAULT '0',
  `dislike` int(11) NOT NULL DEFAULT '0',
  `estado` varchar(10) DEFAULT 'ABIERTA'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `preguntas`
--

INSERT INTO `preguntas` (`usuario`, `id_pregunta`, `titulo`, `descripcion`, `imagen`, `fecha`, `views`, `like`, `dislike`, `estado`) VALUES
('juanvem2504@gmail.com', 000003, '¿Puedo Compilar Binario desde el Mismo Código Fuente para cualquier Sistema Operativo y Arquitectura?', ' ', NULL, '2019-02-02 00:00:00', 15, 7, 6, 'ABIERTA'),
('juanvem2504@gmail.com', 000004, 'Cambiar propiedad CSS definida por el usuario con Javascript', 'Al volver a poner una propiedad que ya esta definida se eliminará esa propiedad.', NULL, '2019-02-01 00:00:00', 9, 30, 15, 'ABIERTA'),
('juanve@gmail.com', 000039, '¿Como obtener el ultimo registro del mes anterior php myslq?', 'Tengo la tabla de nombre \"servicios\" de la cual deseo obtener el ultimo registro del mes anterior donde el \"sg_vehiculo\" es igual al valor que le asigne.\n\nPero lo que deseo en este caso es que automáticamente me detecte el mes anterior sin enviar un dato mediante POST o GET.\n\n¿Como puedo realizar eso?', 'juanve@gmail.com-cons.png', '2019-02-04 14:29:03', 4, 2, 4, 'ABIERTA'),
('juanvem2504@gmail.com', 000040, 'asd', 'lñl', NULL, '2019-03-11 20:46:54', 0, 0, 0, 'ABIERTA');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `respuestas`
--

CREATE TABLE `respuestas` (
  `id_respuesta` int(10) UNSIGNED ZEROFILL NOT NULL,
  `usuario` varchar(45) NOT NULL,
  `id_pregunta` int(6) UNSIGNED ZEROFILL NOT NULL,
  `descripcion` text NOT NULL,
  `fecha_respuesta` datetime NOT NULL,
  `like` int(11) NOT NULL,
  `dislike` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `respuestas`
--

INSERT INTO `respuestas` (`id_respuesta`, `usuario`, `id_pregunta`, `descripcion`, `fecha_respuesta`, `like`, `dislike`) VALUES
(0000000001, 'luisnovoa10000@gmail.com', 000004, 'Se realiza en el archivo .css del directorio donde tienes el HTML', '2019-02-26 15:56:48', 2, 0),
(0000000005, 'deimer@gmail.com', 000039, 'Visita el foro de Mysql', '2019-02-26 17:29:45', 0, 0),
(0000000006, 'deimer@gmail.com', 000004, 'Visita el foro de JavaScript', '2019-02-26 17:29:56', 0, 0),
(0000000007, 'deimer@gmail.com', 000004, 'Se realiza en el archivo .css del directorio donde tienes el HTML', '2019-02-26 18:17:15', 0, 0),
(0000000008, 'deimer@gmail.com', 000004, 'claro', '2019-02-26 19:05:03', 0, 0),
(0000000009, 'kevinanaya278@gmail.com', 000039, 'si, está bien', '2019-02-26 19:16:08', 0, 0),
(0000000010, 'kevinanaya278@gmail.com', 000004, 'claro', '2019-02-26 19:17:25', 0, 0),
(0000000011, 'kevinanaya278@gmail.com', 000004, 'si claro muchacho', '2019-02-26 19:21:18', 0, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `temas`
--

CREATE TABLE `temas` (
  `descripcion` varchar(20) NOT NULL,
  `id_pregunta` int(6) UNSIGNED ZEROFILL NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `temas`
--

INSERT INTO `temas` (`descripcion`, `id_pregunta`) VALUES
('Windows', 000003),
('Linux', 000003),
('Mac', 000003),
('Compilar', 000003),
('Html5', 000004),
('css3', 000004),
('Mysql ', 000039),
('Php ', 000039),
('Jaa ', 000040);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `email` varchar(45) NOT NULL,
  `pass` varchar(150) NOT NULL,
  `nombres` varchar(80) NOT NULL,
  `imagen` varchar(45) DEFAULT NULL,
  `rol` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`email`, `pass`, `nombres`, `imagen`, `rol`) VALUES
('deimer@gmail.com', '$2y$10$hXpxUM9MUiRtsWqD0RfEKeiIuJ3eJL7l.Z9cv2.yrV1JLnl7iRAgO', 'Deimer Navarro', '', NULL),
('juanv04@gmail.com', '$2y$10$YSuDnXMC.F95kuI.D5MibuyVWfHz9lJS5m1.I4rxbsdpI/0ENhpmO', 'juan', '', NULL),
('juanve@gmail.com', '$2y$10$UD9jyW18WpbHa5AqfKgWh.8JnItAFD0lyvM.BzgQZnNJhVe1WQSIm', 'Luis Novoa', '', NULL),
('juanvem2504@gmail.com', '$2y$10$LglSGumDThRWk.UnO1FzlOFvlML6vSf4R3PnUmPrXFppBUflgZNw2', 'Kevin Anaya', '', NULL),
('kevinanaya278@gmail.com', '$2y$10$KrMsulwHJ25b9QBSlACWZOlMo5YIstuOcPuR97xnpenIwFPUyZS2G', 'Kevin Anaya', '', NULL),
('luisnovoa10000@gmail.com', '$2y$10$1MmQimAnaDouq5LPVLtuaO7wum//rFndjCz1ivvLRSDvS78m3uXXK', 'Luis novoa', '', NULL),
('luisnovoa@gmail.com', '$2y$10$6hgFabww2IFJk18YA/Kxh.E7LrUOsHvk0LgJJvJLTIU4fT.p2WzE2', 'luis', '', NULL);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `notificaciones`
--
ALTER TABLE `notificaciones`
  ADD PRIMARY KEY (`id_notificaciones`),
  ADD KEY `fk_notificaciones_usuarios_idx` (`usuarios_email`);

--
-- Indices de la tabla `preguntas`
--
ALTER TABLE `preguntas`
  ADD PRIMARY KEY (`id_pregunta`),
  ADD KEY `fk_preguntas_usuarios_idx` (`usuario`);

--
-- Indices de la tabla `respuestas`
--
ALTER TABLE `respuestas`
  ADD PRIMARY KEY (`id_respuesta`),
  ADD KEY `fk_respuestas_usuarios1_idx` (`usuario`),
  ADD KEY `fk_respuestas_preguntas1_idx` (`id_pregunta`);

--
-- Indices de la tabla `temas`
--
ALTER TABLE `temas`
  ADD KEY `fk_temas_preguntas1_idx` (`id_pregunta`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `notificaciones`
--
ALTER TABLE `notificaciones`
  MODIFY `id_notificaciones` int(10) UNSIGNED ZEROFILL NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `preguntas`
--
ALTER TABLE `preguntas`
  MODIFY `id_pregunta` int(6) UNSIGNED ZEROFILL NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT de la tabla `respuestas`
--
ALTER TABLE `respuestas`
  MODIFY `id_respuesta` int(10) UNSIGNED ZEROFILL NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `notificaciones`
--
ALTER TABLE `notificaciones`
  ADD CONSTRAINT `fk_notificaciones_usuarios` FOREIGN KEY (`usuarios_email`) REFERENCES `usuarios` (`email`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `preguntas`
--
ALTER TABLE `preguntas`
  ADD CONSTRAINT `fk_preguntas_usuarios` FOREIGN KEY (`usuario`) REFERENCES `usuarios` (`email`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `respuestas`
--
ALTER TABLE `respuestas`
  ADD CONSTRAINT `fk_respuestas_preguntas1` FOREIGN KEY (`id_pregunta`) REFERENCES `preguntas` (`id_pregunta`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_respuestas_usuarios1` FOREIGN KEY (`usuario`) REFERENCES `usuarios` (`email`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `temas`
--
ALTER TABLE `temas`
  ADD CONSTRAINT `fk_temas_preguntas1` FOREIGN KEY (`id_pregunta`) REFERENCES `preguntas` (`id_pregunta`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
