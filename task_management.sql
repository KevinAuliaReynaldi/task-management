-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Dec 28, 2025 at 05:00 PM
-- Server version: 8.0.30
-- PHP Version: 8.3.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `task_management`
--

-- --------------------------------------------------------

--
-- Table structure for table `tasks`
--

CREATE TABLE `tasks` (
  `id` int NOT NULL,
  `title` varchar(200) NOT NULL,
  `description` text,
  `status` enum('TODO','IN_PROGRESS','DONE') DEFAULT 'TODO',
  `deadline` date DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `tasks`
--

INSERT INTO `tasks` (`id`, `title`, `description`, `status`, `deadline`, `user_id`, `created_at`, `updated_at`) VALUES
(1, 'Complete project proposal', 'Write and submit the project proposal document', 'TODO', '2026-01-04', 2, '2025-12-28 14:55:41', '2025-12-28 14:55:41'),
(2, 'Fix login bug', 'Investigate and fix the login authentication issue', 'IN_PROGRESS', '2025-12-30', 2, '2025-12-28 14:55:41', '2025-12-28 14:55:41'),
(3, 'Update documentation', 'Update API documentation with new endpoints', 'DONE', '2025-12-28', 2, '2025-12-28 14:55:41', '2025-12-28 14:55:41'),
(4, 'Design dashboard UI', 'Create wireframes for the new admin dashboard', 'TODO', '2026-01-02', 2, '2025-12-28 14:55:41', '2025-12-28 14:55:41'),
(5, 'Implement export feature', 'Add CSV export functionality for reports', 'DONE', '2026-01-07', 2, '2025-12-28 14:55:41', '2025-12-28 16:17:38'),
(6, 'Tes', 'Untuk tes', 'TODO', '2025-12-31', 2, '2025-12-28 15:27:45', '2025-12-28 15:27:45');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('ADMIN','USER') DEFAULT 'USER',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `role`, `created_at`) VALUES
(1, 'Admin', 'admin@gmail.com', '$2b$10$fw05CoK6aqMI6rTt0z26vuoTC.MOB4h2xVu1k7hpS2L6GvBCuEPp6', 'ADMIN', '2025-12-28 14:55:10'),
(2, 'Kevin', 'user@gmail.com', '$2b$10$jYmJvHFjkmjyiokpEuBWTe1Gj.K2048i.TGLhiQMO2aGFJmOJVHrO', 'USER', '2025-12-28 14:55:10'),
(3, 'leo', 'leo@gmail.com', '$2b$10$4p8j1tIDttaYO41F6mdUZO3.tXVc5E8B5/wiLi4qGDYyQU3ILaCN6', 'USER', '2025-12-28 16:16:48');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tasks`
--
ALTER TABLE `tasks`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tasks`
--
ALTER TABLE `tasks`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `tasks`
--
ALTER TABLE `tasks`
  ADD CONSTRAINT `tasks_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
