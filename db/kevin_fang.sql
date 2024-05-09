-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 09, 2024 at 01:32 AM
-- Server version: 10.11.7-MariaDB-cll-lve
-- PHP Version: 7.2.34

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `u956940883_kevin_fang`
--

-- --------------------------------------------------------

--
-- Table structure for table `buying_property`
--

CREATE TABLE `buying_property` (
  `id` int(11) NOT NULL,
  `house_type` varchar(255) DEFAULT NULL,
  `home_worth` varchar(255) DEFAULT NULL,
  `time_estimate` varchar(255) DEFAULT NULL,
  `place` varchar(255) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `comment` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `selling_property`
--

CREATE TABLE `selling_property` (
  `id` int(11) NOT NULL,
  `house_type` varchar(255) DEFAULT NULL,
  `home_worth` varchar(255) DEFAULT NULL,
  `time_estimate` varchar(255) DEFAULT NULL,
  `street` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `seller_state` varchar(255) DEFAULT NULL,
  `zip` varchar(255) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `comment` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `selling_property`
--
ALTER TABLE `selling_property`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
