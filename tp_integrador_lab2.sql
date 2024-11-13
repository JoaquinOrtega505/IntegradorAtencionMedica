-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 13-11-2024 a las 14:53:52
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `tp_integrador_lab2`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `agenda`
--

CREATE TABLE `agenda` (
  `id_agenda` int(11) NOT NULL,
  `id_medico` int(11) DEFAULT NULL,
  `id_paciente` int(11) DEFAULT NULL,
  `fecha` date NOT NULL,
  `hora` time NOT NULL,
  `motivo_consulta` varchar(255) DEFAULT NULL,
  `estado` enum('pendiente','atendido','cancelado') DEFAULT 'pendiente',
  `id_especialidad` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `agenda`
--

INSERT INTO `agenda` (`id_agenda`, `id_medico`, `id_paciente`, `fecha`, `hora`, `motivo_consulta`, `estado`, `id_especialidad`) VALUES
(20, 1, 1, '2024-11-12', '09:00:00', 'Chequeo general', 'pendiente', 1),
(21, 1, 2, '2024-11-12', '09:30:00', 'Dolor de cabeza', 'pendiente', 1),
(22, 1, 3, '2024-11-12', '10:00:00', 'Consulta de rutina', 'pendiente', 1),
(23, 1, 4, '2024-11-12', '10:30:00', 'Dolor abdominal', 'pendiente', 1),
(24, 2, 6, '2024-11-12', '09:00:00', 'Control anual', 'pendiente', 2),
(25, 2, 7, '2024-11-12', '09:30:00', 'Dolor de cabeza', 'pendiente', 2),
(26, 2, 8, '2024-11-12', '10:00:00', 'Consulta de rutina', 'pendiente', 2),
(27, 2, 9, '2024-11-12', '10:30:00', 'Chequeo general', 'pendiente', 2),
(28, 2, 10, '2024-11-12', '11:00:00', 'Revisión de síntomas', 'pendiente', 2),
(29, 3, 6, '2024-11-12', '09:00:00', 'Evaluación de peso', 'pendiente', 3),
(30, 3, 7, '2024-11-12', '09:30:00', 'Problemas de visión', 'pendiente', 3),
(31, 3, 8, '2024-11-12', '10:00:00', 'Chequeo post-operativo', 'pendiente', 3),
(32, 3, 9, '2024-11-12', '10:30:00', 'Dolor de espalda', 'pendiente', 3),
(33, 3, 10, '2024-11-12', '11:00:00', 'Consulta de control', 'pendiente', 3),
(34, 6, 6, '2024-11-12', '09:00:00', 'Chequeo general', 'pendiente', 4),
(35, 6, 7, '2024-11-12', '09:30:00', 'Consulta de seguimiento', 'pendiente', 4);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `alergias`
--

CREATE TABLE `alergias` (
  `id_alergia` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `alergias`
--

INSERT INTO `alergias` (`id_alergia`, `nombre`) VALUES
(11, 'Ácaros'),
(9, 'Anafilaxia'),
(3, 'Asma'),
(14, 'Cebada'),
(2, 'Coníferas'),
(1, 'Dermatitis'),
(7, 'Eczema'),
(8, 'Fiebre de heno'),
(13, 'Gluten'),
(6, 'Latex'),
(12, 'Maní'),
(5, 'Rinitis'),
(4, 'Urticaria');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `atenciones_medicas`
--

CREATE TABLE `atenciones_medicas` (
  `Id_atencion` int(11) NOT NULL,
  `Id_agenda` int(11) NOT NULL,
  `Id_paciente` int(11) NOT NULL,
  `Id_medico` int(11) NOT NULL,
  `Evoluciones` text DEFAULT NULL,
  `Diagnosticos` text DEFAULT NULL,
  `Alergias_nombre` varchar(100) DEFAULT NULL,
  `Alergias_importancia` enum('leve','normal','grave') DEFAULT NULL,
  `Alergias_fecha_desde` date DEFAULT NULL,
  `Alergias_fecha_hasta` date DEFAULT NULL,
  `Antecedentes` text DEFAULT NULL,
  `Antecedentes_fecha_desde` date DEFAULT NULL,
  `Antecedentes_fecha_hasta` date DEFAULT NULL,
  `Habitos` text DEFAULT NULL,
  `Habitos_fecha_desde` date DEFAULT NULL,
  `Habitos_fecha_hasta` date DEFAULT NULL,
  `Medicamentos` text DEFAULT NULL,
  `Fecha_Atencion` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--

--

CREATE TABLE `especialidades` (
  `id_especialidad` int(11) NOT NULL,
  `nombre_especialidad` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `especialidades`
--

INSERT INTO `especialidades` (`id_especialidad`, `nombre_especialidad`) VALUES
(1, 'Pediatría'),
(2, 'Cardiología'),
(3, 'Ginecología'),
(4, 'Dermatología');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `medicos`
--

CREATE TABLE `medicos` (
  `id_medico` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `apellido` varchar(100) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `medicos`
--

INSERT INTO `medicos` (`id_medico`, `nombre`, `apellido`, `username`, `password`) VALUES
(1, 'Zoidberg', 'Crustaceo', 'jzoidberg', '0'),
(2, 'Farnsworth', 'Phillip', 'pFarnsworth', '0'),
(3, 'Amy', 'Wong', 'aWong', '0'),
(6, 'Bender', 'Rodriguez', 'bRodriguez', '0');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `medicos_especialidades`
--

CREATE TABLE `medicos_especialidades` (
  `id` int(11) NOT NULL,
  `id_medico` int(11) DEFAULT NULL,
  `id_especialidad` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `medicos_especialidades`
--

INSERT INTO `medicos_especialidades` (`id`, `id_medico`, `id_especialidad`) VALUES
(1, 3, 1),
(2, 3, 2),
(3, 3, 1),
(4, 3, 2),
(5, 6, 3),
(6, 2, 4),
(7, 1, 3),
(8, 3, 1),
(9, 3, 2),
(10, 6, 3),
(11, 2, 4),
(12, 1, 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pacientes`
--

CREATE TABLE `pacientes` (
  `id_paciente` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `apellido` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `pacientes`
--

INSERT INTO `pacientes` (`id_paciente`, `nombre`, `apellido`) VALUES
(1, 'Homer', 'Simpson'),
(2, 'Marge', 'Simpson'),
(3, 'Bart', 'Simpson'),
(4, 'Lisa', 'Simpson'),
(5, 'Maggie', 'Simpson'),
(6, 'Abraham', 'Simpson'),
(7, 'Ned', 'Flanders'),
(8, 'Patty', 'Bouvier'),
(9, 'Selma', 'Bouvier'),
(10, 'Chief', 'Wiggum');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `agenda`
--
ALTER TABLE `agenda`
  ADD PRIMARY KEY (`id_agenda`),
  ADD KEY `id_medico` (`id_medico`),
  ADD KEY `id_paciente` (`id_paciente`),
  ADD KEY `id_especialidad` (`id_especialidad`),
  ADD KEY `id_especialidad_2` (`id_especialidad`);

--
-- Indices de la tabla `alergias`
--
ALTER TABLE `alergias`
  ADD PRIMARY KEY (`id_alergia`),
  ADD UNIQUE KEY `nombre` (`nombre`);

--
-- Indices de la tabla `atenciones_medicas`
--
ALTER TABLE `atenciones_medicas`
  ADD PRIMARY KEY (`Id_atencion`),
  ADD KEY `Id_agenda` (`Id_agenda`),
  ADD KEY `Id_paciente` (`Id_paciente`),
  ADD KEY `Id_medico` (`Id_medico`);

--
-- Indices de la tabla `especialidades`
--
ALTER TABLE `especialidades`
  ADD PRIMARY KEY (`id_especialidad`);

--
-- Indices de la tabla `medicos`
--
ALTER TABLE `medicos`
  ADD PRIMARY KEY (`id_medico`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Indices de la tabla `medicos_especialidades`
--
ALTER TABLE `medicos_especialidades`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_medico` (`id_medico`),
  ADD KEY `id_especialidad` (`id_especialidad`);

--
-- Indices de la tabla `pacientes`
--
ALTER TABLE `pacientes`
  ADD PRIMARY KEY (`id_paciente`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `agenda`
--
ALTER TABLE `agenda`
  MODIFY `id_agenda` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- AUTO_INCREMENT de la tabla `alergias`
--
ALTER TABLE `alergias`
  MODIFY `id_alergia` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT de la tabla `atenciones_medicas`
--
ALTER TABLE `atenciones_medicas`
  MODIFY `Id_atencion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=48;

--
-- AUTO_INCREMENT de la tabla `especialidades`
--
ALTER TABLE `especialidades`
  MODIFY `id_especialidad` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `medicos`
--
ALTER TABLE `medicos`
  MODIFY `id_medico` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `medicos_especialidades`
--
ALTER TABLE `medicos_especialidades`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `pacientes`
--
ALTER TABLE `pacientes`
  MODIFY `id_paciente` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `agenda`
--
ALTER TABLE `agenda`
  ADD CONSTRAINT `agenda_ibfk_1` FOREIGN KEY (`id_medico`) REFERENCES `medicos` (`id_medico`),
  ADD CONSTRAINT `agenda_ibfk_2` FOREIGN KEY (`id_paciente`) REFERENCES `pacientes` (`id_paciente`),
  ADD CONSTRAINT `agenda_ibfk_3` FOREIGN KEY (`id_especialidad`) REFERENCES `especialidades` (`id_especialidad`);

--
-- Filtros para la tabla `atenciones_medicas`
--
ALTER TABLE `atenciones_medicas`
  ADD CONSTRAINT `atenciones_medicas_ibfk_1` FOREIGN KEY (`Id_agenda`) REFERENCES `agenda` (`id_agenda`),
  ADD CONSTRAINT `atenciones_medicas_ibfk_2` FOREIGN KEY (`Id_paciente`) REFERENCES `pacientes` (`id_paciente`),
  ADD CONSTRAINT `atenciones_medicas_ibfk_3` FOREIGN KEY (`Id_medico`) REFERENCES `medicos` (`id_medico`);

--
-- Filtros para la tabla `medicos_especialidades`
--
ALTER TABLE `medicos_especialidades`
  ADD CONSTRAINT `medicos_especialidades_ibfk_1` FOREIGN KEY (`id_medico`) REFERENCES `medicos` (`id_medico`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `medicos_especialidades_ibfk_2` FOREIGN KEY (`id_especialidad`) REFERENCES `especialidades` (`id_especialidad`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
