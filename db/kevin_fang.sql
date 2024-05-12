-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 12, 2024 at 04:06 AM
-- Server version: 8.0.35
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `kevin_fang`
--

-- --------------------------------------------------------

--
-- Table structure for table `buying_property`
--

CREATE TABLE `buying_property` (
  `id` int NOT NULL,
  `country` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `landing_entry_zip` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `house_type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `home_worth` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `time_estimate` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `place` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `phone` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `comment` text COLLATE utf8mb4_general_ci,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `buying_property`
--

INSERT INTO `buying_property` (`id`, `country`, `landing_entry_zip`, `house_type`, `home_worth`, `time_estimate`, `place`, `phone`, `comment`, `created_at`) VALUES
(3, 'United States', '23451', 'Commercial', '$450k - $600k', '2 - 4 months', 'A16, Chestnut Street, San Francisco, CA, USA', '(339)940-4035', '', '2024-05-12 02:01:20'),
(4, 'Canada', 'A1B 4J6', 'Condo / Townhouse', '$900k - $1.5m', '4 - 6 months', 'Stratford, ON, Canada', '(339)940-4035', '', '2024-05-12 02:04:36'),
(5, 'Canada', 'A1B 4J6', 'Condo / Townhouse', '$900k - $1.5m', '4 - 6 months', 'Stratford, ON, Canada', '(339)940-4035', '', '2024-05-12 02:05:31');

-- --------------------------------------------------------

--
-- Table structure for table `selling_property`
--

CREATE TABLE `selling_property` (
  `id` int NOT NULL,
  `country` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `landing_entry_zip` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `house_type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `home_worth` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `time_estimate` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `street` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `city` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `seller_state` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `zip` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `phone` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `comment` text COLLATE utf8mb4_general_ci,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `selling_property`
--

INSERT INTO `selling_property` (`id`, `country`, `landing_entry_zip`, `house_type`, `home_worth`, `time_estimate`, `street`, `city`, `seller_state`, `zip`, `phone`, `comment`, `created_at`) VALUES
(4, 'United States', '34208', 'Condo / Townhouse', '$900k - $1.5m', '1 - 2 months', '21000 Florida 64 ', 'Bradenton', 'FL', '34212', '(339)940-4034', '', '2024-05-12 01:48:58'),
(5, 'United States', '34208', 'Condo / Townhouse', '$900k - $1.5m', '1 - 2 months', '21000 Florida 64 ', 'Bradenton', 'FL', '34212', '(339)940-4034', '', '2024-05-12 01:51:01'),
(6, 'United States', '34208', 'Condo / Townhouse', '$900k - $1.5m', '1 - 2 months', '21000 Florida 64 ', 'Bradenton', 'FL', '34212', '(339)940-4034', '', '2024-05-12 01:51:01'),
(7, 'United States', '34208', 'Condo / Townhouse', '$900k - $1.5m', '1 - 2 months', '21000 Florida 64 ', 'Bradenton', 'FL', '34212', '(339)940-4034', '', '2024-05-12 01:52:04'),
(8, 'United States', '34208', 'Condo / Townhouse', '$900k - $1.5m', '1 - 2 months', '21000 Florida 64 ', 'Bradenton', 'FL', '34212', '(339)940-4034', '', '2024-05-12 01:52:19');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `buying_property`
--
ALTER TABLE `buying_property`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `selling_property`
--
ALTER TABLE `selling_property`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `buying_property`
--
ALTER TABLE `buying_property`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `selling_property`
--
ALTER TABLE `selling_property`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
