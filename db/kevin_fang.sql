-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 06, 2024 at 04:25 PM
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
  `house_type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `home_worth` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `time_estimate` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `street` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `city` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `seller_state` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `phone` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `comment` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `buying_property`
--

INSERT INTO `buying_property` (`id`, `house_type`, `home_worth`, `time_estimate`, `street`, `city`, `seller_state`, `phone`, `comment`, `created_at`) VALUES
(1, 'Plot / Land', '$300k - $450k', '2 - 4 weeks', '200 East Flagler Street ', 'Miami', 'FL', '(123) 123-1234', '', '2024-05-06 14:24:32');

-- --------------------------------------------------------

--
-- Table structure for table `selling_property`
--

CREATE TABLE `selling_property` (
  `id` int NOT NULL,
  `house_type` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `home_worth` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `time_estimate` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `street` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `city` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `seller_state` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `phone` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `comment` text COLLATE utf8mb4_general_ci,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `selling_property`
--

INSERT INTO `selling_property` (`id`, `house_type`, `home_worth`, `time_estimate`, `street`, `city`, `seller_state`, `phone`, `comment`, `created_at`) VALUES
(9, 'Single Family', '$300k - $450k', '1 - 2 months', '33 East 7th Street ', 'New York', 'NY', '(123) 123-1234', 'Comment', '2024-05-06 14:20:47');

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
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `selling_property`
--
ALTER TABLE `selling_property`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
