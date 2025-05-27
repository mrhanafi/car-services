-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               10.4.32-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win64
-- HeidiSQL Version:             11.2.0.6213
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for carservicedb
CREATE DATABASE IF NOT EXISTS `carservicedb` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;
USE `carservicedb`;

-- Dumping structure for table carservicedb.brands
CREATE TABLE IF NOT EXISTS `brands` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table carservicedb.brands: ~2 rows (approximately)
/*!40000 ALTER TABLE `brands` DISABLE KEYS */;
INSERT INTO `brands` (`id`, `name`, `created_at`, `updated_at`) VALUES
	(1, 'Proton', '2025-05-23 08:35:50', '2025-05-23 08:35:50'),
	(2, 'Perodua', '2025-05-23 08:36:03', '2025-05-23 08:36:03');
/*!40000 ALTER TABLE `brands` ENABLE KEYS */;

-- Dumping structure for table carservicedb.cache
CREATE TABLE IF NOT EXISTS `cache` (
  `key` varchar(255) NOT NULL,
  `value` mediumtext NOT NULL,
  `expiration` int(11) NOT NULL,
  PRIMARY KEY (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table carservicedb.cache: ~0 rows (approximately)
/*!40000 ALTER TABLE `cache` DISABLE KEYS */;
/*!40000 ALTER TABLE `cache` ENABLE KEYS */;

-- Dumping structure for table carservicedb.cache_locks
CREATE TABLE IF NOT EXISTS `cache_locks` (
  `key` varchar(255) NOT NULL,
  `owner` varchar(255) NOT NULL,
  `expiration` int(11) NOT NULL,
  PRIMARY KEY (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table carservicedb.cache_locks: ~0 rows (approximately)
/*!40000 ALTER TABLE `cache_locks` DISABLE KEYS */;
/*!40000 ALTER TABLE `cache_locks` ENABLE KEYS */;

-- Dumping structure for table carservicedb.car_maintenances
CREATE TABLE IF NOT EXISTS `car_maintenances` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `mileage` varchar(255) NOT NULL,
  `item` varchar(255) NOT NULL,
  `car_type` varchar(255) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `price` decimal(10,2) DEFAULT 0.00,
  `model_id` bigint(20) unsigned DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `car_maintenances_model_id_foreign` (`model_id`),
  CONSTRAINT `car_maintenances_model_id_foreign` FOREIGN KEY (`model_id`) REFERENCES `car_models` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=59 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table carservicedb.car_maintenances: ~47 rows (approximately)
/*!40000 ALTER TABLE `car_maintenances` DISABLE KEYS */;
INSERT INTO `car_maintenances` (`id`, `mileage`, `item`, `car_type`, `quantity`, `price`, `model_id`, `created_at`, `updated_at`) VALUES
	(1, '0', 'Perodua Engine Oil Fully Syn 0W-20 3.5L', NULL, 1, 161.10, 1, '2025-05-23 08:38:13', '2025-05-23 08:38:13'),
	(2, '0', 'Drain Plug Gasket - Engine Oil', NULL, 1, 3.80, 1, '2025-05-23 08:38:26', '2025-05-23 08:38:26'),
	(3, '0', 'Engine Oil Filter', NULL, 1, 12.50, 1, '2025-05-23 08:48:26', '2025-05-23 08:48:26'),
	(6, '0', 'Other', NULL, 0, 0.00, NULL, NULL, NULL),
	(10, '20000', 'Brake Fluid 1.0L', NULL, 1, 26.40, 1, '2025-05-27 04:46:54', '2025-05-27 04:46:54'),
	(11, '20000', 'Air Cleaner Filter', NULL, 1, 136.00, 1, '2025-05-27 04:47:08', '2025-05-27 04:47:08'),
	(12, '20000', 'Tyre Alignment, Balancing & Rotation*', NULL, 1, 76.00, 1, '2025-05-27 04:47:32', '2025-05-27 04:47:32'),
	(16, '30000', 'Air Filter (Cabin Filter)', NULL, 1, 24.90, 1, '2025-05-27 04:48:48', '2025-05-27 04:48:48'),
	(20, '40000', 'Air Cleaner Filter', NULL, 1, 136.00, 1, '2025-05-27 04:51:26', '2025-05-27 04:51:26'),
	(21, '40000', 'Auto Transmission Oil ATF D3 SP', NULL, 3, 109.50, 1, '2025-05-27 04:51:41', '2025-05-27 04:51:41'),
	(22, '40000', 'Drain Plug Gasket - AT', NULL, 1, 3.80, 1, '2025-05-27 04:51:57', '2025-05-27 04:51:57'),
	(23, '40000', 'Brake Fluid 1.0L', NULL, 1, 26.40, 1, '2025-05-27 04:52:33', '2025-05-27 04:52:33'),
	(24, '60000', 'Air Filter (Cabin Filter)', NULL, 1, 24.90, 1, '2025-05-27 08:58:45', '2025-05-27 08:58:45'),
	(25, '60000', 'Brake Fluid 1.0L', NULL, 1, 26.40, 1, '2025-05-27 08:59:01', '2025-05-27 08:59:01'),
	(26, '60000', 'Air Cleaner Filter', NULL, 1, 136.00, 1, '2025-05-27 08:59:15', '2025-05-27 08:59:15'),
	(27, '60000', 'Tyre Alignment, Balancing & Rotation*', NULL, 1, 76.00, 1, '2025-05-27 08:59:30', '2025-05-27 08:59:30'),
	(28, '80000', 'Air Cleaner Filter', NULL, 1, 136.00, 1, '2025-05-27 09:00:22', '2025-05-27 09:00:22'),
	(29, '80000', 'Auto Transmission Oil ATF D3 SP', NULL, 3, 109.50, 1, '2025-05-27 09:00:35', '2025-05-27 09:00:35'),
	(30, '80000', 'Drain Plug Gasket - AT', NULL, 1, 3.80, 1, '2025-05-27 09:00:50', '2025-05-27 09:00:50'),
	(31, '80000', 'Brake Fluid 1.0L', NULL, 1, 26.40, 1, '2025-05-27 09:01:02', '2025-05-27 09:01:02'),
	(32, '90000', 'Air Filter (Cabin Filter)', NULL, 1, 24.90, 1, '2025-05-27 09:01:22', '2025-05-27 09:01:22'),
	(33, '100000', 'Spark Plug', NULL, 4, 263.60, 1, '2025-05-27 09:01:46', '2025-05-27 09:01:46'),
	(34, '100000', 'Brake Fluid 1.0L', NULL, 1, 26.40, 1, '2025-05-27 09:02:03', '2025-05-27 09:02:03'),
	(35, '100000', 'Air Cleaner Filter', NULL, 1, 136.00, 1, '2025-05-27 09:02:18', '2025-05-27 09:02:18'),
	(36, '100000', 'Tyre Alignment, Balancing Rotation*', NULL, 1, 76.00, 1, '2025-05-27 09:02:34', '2025-05-27 09:02:34'),
	(37, '0', 'Engine Oil (Syntium 800 SE 10W/30 SN) 4L', NULL, NULL, 100.00, 3, '2025-05-27 09:10:58', '2025-05-27 09:10:58'),
	(38, '0', 'Engine Oil Filter', NULL, NULL, 12.12, 3, '2025-05-27 09:11:18', '2025-05-27 09:11:18'),
	(39, '0', 'Drain Plug Gasket', NULL, NULL, 3.02, 3, '2025-05-27 09:11:33', '2025-05-27 09:11:33'),
	(40, '20000', 'Spark Plugs', NULL, NULL, 40.28, 3, '2025-05-27 09:12:01', '2025-05-27 09:12:01'),
	(41, '20000', 'Air Filter', NULL, NULL, 31.80, 3, '2025-05-27 09:12:17', '2025-05-27 09:12:17'),
	(42, '40000', 'Spark Plugs', NULL, NULL, 40.28, 3, '2025-05-27 09:12:42', '2025-05-27 09:12:42'),
	(43, '40000', 'Air Filter', NULL, NULL, 31.80, 3, '2025-05-27 09:12:59', '2025-05-27 09:12:59'),
	(44, '40000', 'Brake Fluid', NULL, NULL, 36.20, 3, '2025-05-27 09:13:15', '2025-05-27 09:13:15'),
	(45, '40000', 'Power Steering Fluid', NULL, NULL, 30.91, 3, '2025-05-27 09:13:29', '2025-05-27 09:13:29'),
	(46, '60000', 'Spark Plugs', NULL, NULL, 40.28, 3, '2025-05-27 09:14:10', '2025-05-27 09:14:10'),
	(47, '60000', 'Air Filter', NULL, NULL, 31.80, 3, '2025-05-27 09:14:26', '2025-05-27 09:14:26'),
	(48, '60000', 'Fuel Filter', NULL, NULL, 30.98, 3, '2025-05-27 09:14:46', '2025-05-27 09:14:46'),
	(49, '60000', 'Transmission Oil (CVT)', NULL, NULL, 135.00, 3, '2025-05-27 09:15:14', '2025-05-27 09:15:14'),
	(50, '60000', 'Transmission Oil Filter', NULL, NULL, 156.12, 3, '2025-05-27 09:15:32', '2025-05-27 09:15:32'),
	(51, '80000', 'Spark Plugs', NULL, NULL, 40.28, 3, '2025-05-27 09:16:10', '2025-05-27 09:16:10'),
	(52, '80000', 'Air Filter', NULL, NULL, 31.80, 3, '2025-05-27 09:16:27', '2025-05-27 09:16:27'),
	(53, '80000', 'Brake Fluid', NULL, NULL, 36.20, 3, '2025-05-27 09:16:47', '2025-05-27 09:16:47'),
	(54, '80000', 'Power Steering Fluid', NULL, NULL, 30.91, 3, '2025-05-27 09:17:07', '2025-05-27 09:17:07'),
	(55, '90000', 'Radiator Coolant', NULL, NULL, 41.77, 3, '2025-05-27 09:17:33', '2025-05-27 09:17:33'),
	(56, '100000', 'Spark Plugs', NULL, NULL, 40.28, 3, '2025-05-27 09:17:59', '2025-05-27 09:17:59'),
	(57, '100000', 'Air Filter', NULL, NULL, 31.80, 3, '2025-05-27 09:18:17', '2025-05-27 09:18:17'),
	(58, '100000', 'FEAD Belt', NULL, NULL, 66.99, 3, '2025-05-27 09:18:40', '2025-05-27 09:18:40');
/*!40000 ALTER TABLE `car_maintenances` ENABLE KEYS */;

-- Dumping structure for table carservicedb.car_models
CREATE TABLE IF NOT EXISTS `car_models` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `brand_id` bigint(20) unsigned NOT NULL,
  `model` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `car_models_brand_id_foreign` (`brand_id`),
  CONSTRAINT `car_models_brand_id_foreign` FOREIGN KEY (`brand_id`) REFERENCES `brands` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table carservicedb.car_models: ~2 rows (approximately)
/*!40000 ALTER TABLE `car_models` DISABLE KEYS */;
INSERT INTO `car_models` (`id`, `brand_id`, `model`, `created_at`, `updated_at`) VALUES
	(1, 2, 'Bezza 1.3', '2025-05-23 08:37:07', '2025-05-23 08:37:07'),
	(2, 2, 'Axia', '2025-05-23 08:37:16', '2025-05-23 08:37:16'),
	(3, 1, 'Preve CVT 1.6', '2025-05-23 08:37:29', '2025-05-23 08:37:29');
/*!40000 ALTER TABLE `car_models` ENABLE KEYS */;

-- Dumping structure for table carservicedb.failed_jobs
CREATE TABLE IF NOT EXISTS `failed_jobs` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table carservicedb.failed_jobs: ~0 rows (approximately)
/*!40000 ALTER TABLE `failed_jobs` DISABLE KEYS */;
/*!40000 ALTER TABLE `failed_jobs` ENABLE KEYS */;

-- Dumping structure for table carservicedb.jobs
CREATE TABLE IF NOT EXISTS `jobs` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `queue` varchar(255) NOT NULL,
  `payload` longtext NOT NULL,
  `attempts` tinyint(3) unsigned NOT NULL,
  `reserved_at` int(10) unsigned DEFAULT NULL,
  `available_at` int(10) unsigned NOT NULL,
  `created_at` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `jobs_queue_index` (`queue`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table carservicedb.jobs: ~0 rows (approximately)
/*!40000 ALTER TABLE `jobs` DISABLE KEYS */;
/*!40000 ALTER TABLE `jobs` ENABLE KEYS */;

-- Dumping structure for table carservicedb.job_batches
CREATE TABLE IF NOT EXISTS `job_batches` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `total_jobs` int(11) NOT NULL,
  `pending_jobs` int(11) NOT NULL,
  `failed_jobs` int(11) NOT NULL,
  `failed_job_ids` longtext NOT NULL,
  `options` mediumtext DEFAULT NULL,
  `cancelled_at` int(11) DEFAULT NULL,
  `created_at` int(11) NOT NULL,
  `finished_at` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table carservicedb.job_batches: ~0 rows (approximately)
/*!40000 ALTER TABLE `job_batches` DISABLE KEYS */;
/*!40000 ALTER TABLE `job_batches` ENABLE KEYS */;

-- Dumping structure for table carservicedb.migrations
CREATE TABLE IF NOT EXISTS `migrations` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table carservicedb.migrations: ~9 rows (approximately)
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
	(1, '0001_01_01_000000_create_users_table', 1),
	(2, '0001_01_01_000001_create_cache_table', 1),
	(3, '0001_01_01_000002_create_jobs_table', 1),
	(4, '2025_05_16_160100_create_brands_table', 1),
	(5, '2025_05_16_160602_create_car_models_table', 1),
	(6, '2025_05_16_161246_create_car_maintenances_table', 1),
	(7, '2025_05_21_153120_create_my_cars_table', 1),
	(8, '2025_05_23_073647_create_my_car_records_table', 1),
	(10, '2025_05_25_155156_create_record_details_table', 2);
/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;

-- Dumping structure for table carservicedb.my_cars
CREATE TABLE IF NOT EXISTS `my_cars` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `brand` varchar(255) NOT NULL,
  `model` varchar(255) NOT NULL,
  `brands_id` bigint(20) unsigned DEFAULT NULL,
  `models_id` bigint(20) unsigned DEFAULT NULL,
  `user_id` bigint(20) unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `my_cars_brands_id_foreign` (`brands_id`),
  KEY `my_cars_models_id_foreign` (`models_id`),
  KEY `my_cars_user_id_foreign` (`user_id`),
  CONSTRAINT `my_cars_brands_id_foreign` FOREIGN KEY (`brands_id`) REFERENCES `brands` (`id`) ON DELETE CASCADE,
  CONSTRAINT `my_cars_models_id_foreign` FOREIGN KEY (`models_id`) REFERENCES `car_models` (`id`) ON DELETE CASCADE,
  CONSTRAINT `my_cars_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table carservicedb.my_cars: ~1 rows (approximately)
/*!40000 ALTER TABLE `my_cars` DISABLE KEYS */;
INSERT INTO `my_cars` (`id`, `title`, `brand`, `model`, `brands_id`, `models_id`, `user_id`, `created_at`, `updated_at`) VALUES
	(1, 'Bezza Merah', 'Perodua', 'Bezza 1.3', NULL, NULL, 1, '2025-05-23 08:51:21', '2025-05-23 08:51:21'),
	(2, 'WXF 4291', 'Proton', 'Preve CVT 1.6', NULL, NULL, 1, '2025-05-27 09:21:18', '2025-05-27 09:21:18');
/*!40000 ALTER TABLE `my_cars` ENABLE KEYS */;

-- Dumping structure for table carservicedb.my_car_records
CREATE TABLE IF NOT EXISTS `my_car_records` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `current_mileage` varchar(255) NOT NULL,
  `remark` varchar(255) DEFAULT NULL,
  `date_of_service` date NOT NULL,
  `service_mileage` varchar(50) DEFAULT NULL,
  `mycar_id` bigint(20) unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `my_car_records_mycar_id_foreign` (`mycar_id`),
  CONSTRAINT `my_car_records_mycar_id_foreign` FOREIGN KEY (`mycar_id`) REFERENCES `my_cars` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table carservicedb.my_car_records: ~1 rows (approximately)
/*!40000 ALTER TABLE `my_car_records` DISABLE KEYS */;
INSERT INTO `my_car_records` (`id`, `current_mileage`, `remark`, `date_of_service`, `service_mileage`, `mycar_id`, `created_at`, `updated_at`) VALUES
	(1, '8357', 'buat service basic asdasdasd', '2025-05-20', '10000', 1, '2025-05-25 08:56:05', '2025-05-26 17:12:43'),
	(7, '19568', NULL, '2025-05-14', '20000', 2, '2025-05-27 09:23:36', '2025-05-27 09:23:36');
/*!40000 ALTER TABLE `my_car_records` ENABLE KEYS */;

-- Dumping structure for table carservicedb.password_reset_tokens
CREATE TABLE IF NOT EXISTS `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table carservicedb.password_reset_tokens: ~0 rows (approximately)
/*!40000 ALTER TABLE `password_reset_tokens` DISABLE KEYS */;
/*!40000 ALTER TABLE `password_reset_tokens` ENABLE KEYS */;

-- Dumping structure for table carservicedb.record_details
CREATE TABLE IF NOT EXISTS `record_details` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `item` varchar(255) NOT NULL,
  `remark` varchar(255) DEFAULT NULL,
  `price` decimal(10,2) NOT NULL DEFAULT 0.00,
  `service_id` bigint(20) unsigned DEFAULT NULL,
  `record_id` bigint(20) unsigned DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `record_details_service_id_foreign` (`service_id`),
  KEY `record_details_record_id_foreign` (`record_id`),
  CONSTRAINT `record_details_record_id_foreign` FOREIGN KEY (`record_id`) REFERENCES `my_car_records` (`id`) ON DELETE CASCADE,
  CONSTRAINT `record_details_service_id_foreign` FOREIGN KEY (`service_id`) REFERENCES `car_maintenances` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table carservicedb.record_details: ~3 rows (approximately)
/*!40000 ALTER TABLE `record_details` DISABLE KEYS */;
INSERT INTO `record_details` (`id`, `item`, `remark`, `price`, `service_id`, `record_id`, `created_at`, `updated_at`) VALUES
	(3, 'Perodua Engine Oil Fully Syn 0W-20 3.5L', 'qweqweqwe', 0.00, 1, 1, '2025-05-27 00:48:01', '2025-05-27 00:48:01'),
	(4, 'Drain Plug Gasket - Engine Oil', 'asdasdasd', 0.00, 2, 1, '2025-05-27 00:48:06', '2025-05-27 00:48:06'),
	(5, 'Engine Oil Filter', 'zxczxczxczxc', 0.00, 3, 1, '2025-05-27 00:48:12', '2025-05-27 00:48:12');
/*!40000 ALTER TABLE `record_details` ENABLE KEYS */;

-- Dumping structure for table carservicedb.sessions
CREATE TABLE IF NOT EXISTS `sessions` (
  `id` varchar(255) NOT NULL,
  `user_id` bigint(20) unsigned DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `payload` longtext NOT NULL,
  `last_activity` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `sessions_user_id_index` (`user_id`),
  KEY `sessions_last_activity_index` (`last_activity`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table carservicedb.sessions: ~1 rows (approximately)
/*!40000 ALTER TABLE `sessions` DISABLE KEYS */;
INSERT INTO `sessions` (`id`, `user_id`, `ip_address`, `user_agent`, `payload`, `last_activity`) VALUES
	('wgLuGJsOXLWLZCSTTU43aeVznzWDwmtjJjEHDSIC', 1, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36', 'YTo1OntzOjY6Il90b2tlbiI7czo0MDoiZG53OU0ycUlReHRQb1JOcXVmSjd5N2NtakhqbnBZUGlXbU53Q241ZCI7czozOiJ1cmwiO2E6MDp7fXM6OToiX3ByZXZpb3VzIjthOjE6e3M6MzoidXJsIjtzOjQwOiJodHRwOi8vbG9jYWxob3N0OjgwMDAvYWRtaW4vY2FyLW1vZGVscy8xIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319czo1MDoibG9naW5fd2ViXzU5YmEzNmFkZGMyYjJmOTQwMTU4MGYwMTRjN2Y1OGVhNGUzMDk4OWQiO2k6MTt9', 1748337820);
/*!40000 ALTER TABLE `sessions` ENABLE KEYS */;

-- Dumping structure for table carservicedb.users
CREATE TABLE IF NOT EXISTS `users` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL DEFAULT 'user',
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table carservicedb.users: ~0 rows (approximately)
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` (`id`, `name`, `email`, `email_verified_at`, `password`, `role`, `remember_token`, `created_at`, `updated_at`) VALUES
	(1, 'Admin', 'admin@test.com', NULL, '$2y$12$mXbN7VeZ38dCxyGw7s8oFO3eDyAp0b9YgaL4A0dbNPTh.UShrWTc6', 'user', NULL, '2025-05-23 08:33:19', '2025-05-23 08:33:19');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
