-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 08 Agu 2021 pada 14.07
-- Versi server: 10.4.17-MariaDB
-- Versi PHP: 7.3.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `asrama-polban`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `gedung`
--

CREATE TABLE `gedung` (
  `id_gedung` bigint(20) UNSIGNED NOT NULL,
  `nama_gedung` char(1) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `gedung`
--

INSERT INTO `gedung` (`id_gedung`, `nama_gedung`, `created_at`, `updated_at`) VALUES
(1, 'A', '2021-07-15 18:35:23', '2021-07-15 18:35:23'),
(2, 'B', '2021-07-15 18:35:23', '2021-07-15 18:35:23'),
(3, 'C', '2021-07-15 18:35:23', '2021-07-15 18:35:23');

-- --------------------------------------------------------

--
-- Struktur dari tabel `jurusan`
--

CREATE TABLE `jurusan` (
  `id_jurusan` bigint(20) UNSIGNED NOT NULL,
  `nama_jurusan` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `jurusan`
--

INSERT INTO `jurusan` (`id_jurusan`, `nama_jurusan`, `created_at`, `updated_at`) VALUES
(1, 'Teknik Sipil', '2021-07-15 18:35:18', '2021-07-15 18:35:18'),
(2, 'Teknik Mesin', '2021-07-15 18:35:18', '2021-07-15 18:35:18'),
(3, 'Teknik Refrigasi dan Tata Udara', '2021-07-15 18:35:18', '2021-07-15 18:35:18'),
(4, 'Teknik Konversi Energi', '2021-07-15 18:35:18', '2021-07-15 18:35:18'),
(5, 'Teknik Elektro', '2021-07-15 18:35:18', '2021-07-15 18:35:18'),
(6, 'Teknik Kimia', '2021-07-15 18:35:19', '2021-07-15 18:35:19'),
(7, 'Teknik Komputer dan Informatika', '2021-07-15 18:35:19', '2021-07-15 18:35:19'),
(8, 'Akuntansi', '2021-07-15 18:35:19', '2021-07-15 18:35:19'),
(9, 'Administrasi Niaga', '2021-07-15 18:35:19', '2021-07-15 18:35:19'),
(10, 'Bahasa Inggris', '2021-07-15 18:35:19', '2021-07-15 18:35:19');

-- --------------------------------------------------------

--
-- Struktur dari tabel `kamar`
--

CREATE TABLE `kamar` (
  `id_kamar` bigint(20) UNSIGNED NOT NULL,
  `id_gedung` bigint(20) UNSIGNED NOT NULL,
  `no_kamar` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `kamar`
--

INSERT INTO `kamar` (`id_kamar`, `id_gedung`, `no_kamar`, `created_at`, `updated_at`) VALUES
(1, 1, 1, '2021-07-15 18:35:24', '2021-07-15 18:35:24'),
(2, 1, 2, '2021-07-15 18:35:24', '2021-07-15 18:35:24'),
(3, 1, 3, '2021-07-15 18:35:24', '2021-07-15 18:35:24'),
(4, 1, 4, '2021-07-15 18:35:24', '2021-07-15 18:35:24'),
(5, 1, 5, '2021-07-15 18:35:24', '2021-07-15 18:35:24'),
(6, 1, 6, '2021-07-15 18:35:24', '2021-07-15 18:35:24'),
(7, 1, 7, '2021-07-15 18:35:24', '2021-07-15 18:35:24'),
(8, 1, 8, '2021-07-15 18:35:24', '2021-07-15 18:35:24'),
(9, 1, 9, '2021-07-15 18:35:24', '2021-07-15 18:35:24'),
(10, 1, 10, '2021-07-15 18:35:24', '2021-07-15 18:35:24'),
(11, 1, 11, '2021-07-15 18:35:25', '2021-07-15 18:35:25'),
(12, 1, 12, '2021-07-15 18:35:25', '2021-07-15 18:35:25'),
(13, 1, 13, '2021-07-15 18:35:25', '2021-07-15 18:35:25'),
(14, 1, 14, '2021-07-15 18:35:25', '2021-07-15 18:35:25'),
(15, 1, 15, '2021-07-15 18:35:25', '2021-07-15 18:35:25'),
(16, 1, 16, '2021-07-15 18:35:25', '2021-07-15 18:35:25'),
(17, 1, 17, '2021-07-15 18:35:25', '2021-07-15 18:35:25'),
(18, 1, 18, '2021-07-15 18:35:25', '2021-07-15 18:35:25'),
(19, 1, 19, '2021-07-15 18:35:25', '2021-07-15 18:35:25'),
(20, 1, 20, '2021-07-15 18:35:25', '2021-07-15 18:35:25'),
(21, 1, 21, '2021-07-15 18:35:25', '2021-07-15 18:35:25'),
(22, 1, 22, '2021-07-15 18:35:25', '2021-07-15 18:35:25'),
(23, 1, 23, '2021-07-15 18:35:25', '2021-07-15 18:35:25'),
(24, 1, 24, '2021-07-15 18:35:25', '2021-07-15 18:35:25'),
(25, 2, 1, '2021-07-15 18:35:26', '2021-07-15 18:35:26'),
(26, 2, 2, '2021-07-15 18:35:26', '2021-07-15 18:35:26'),
(27, 2, 3, '2021-07-15 18:35:26', '2021-07-15 18:35:26'),
(28, 2, 4, '2021-07-15 18:35:26', '2021-07-15 18:35:26'),
(29, 2, 5, '2021-07-15 18:35:26', '2021-07-15 18:35:26'),
(30, 2, 6, '2021-07-15 18:35:26', '2021-07-15 18:35:26'),
(31, 2, 7, '2021-07-15 18:35:26', '2021-07-15 18:35:26'),
(32, 2, 8, '2021-07-15 18:35:26', '2021-07-15 18:35:26'),
(33, 2, 9, '2021-07-15 18:35:26', '2021-07-15 18:35:26'),
(34, 2, 10, '2021-07-15 18:35:26', '2021-07-15 18:35:26'),
(35, 2, 11, '2021-07-15 18:35:26', '2021-07-15 18:35:26'),
(36, 2, 12, '2021-07-15 18:35:26', '2021-07-15 18:35:26'),
(37, 2, 13, '2021-07-15 18:35:26', '2021-07-15 18:35:26'),
(38, 2, 14, '2021-07-15 18:35:26', '2021-07-15 18:35:26'),
(39, 2, 15, '2021-07-15 18:35:27', '2021-07-15 18:35:27'),
(40, 2, 16, '2021-07-15 18:35:27', '2021-07-15 18:35:27'),
(41, 2, 17, '2021-07-15 18:35:27', '2021-07-15 18:35:27'),
(42, 2, 18, '2021-07-15 18:35:27', '2021-07-15 18:35:27'),
(43, 2, 19, '2021-07-15 18:35:27', '2021-07-15 18:35:27'),
(44, 2, 20, '2021-07-15 18:35:27', '2021-07-15 18:35:27'),
(45, 2, 21, '2021-07-15 18:35:27', '2021-07-15 18:35:27'),
(46, 2, 22, '2021-07-15 18:35:27', '2021-07-15 18:35:27'),
(47, 2, 23, '2021-07-15 18:35:27', '2021-07-15 18:35:27'),
(48, 2, 24, '2021-07-15 18:35:27', '2021-07-15 18:35:27'),
(49, 3, 1, '2021-07-15 18:35:27', '2021-07-15 18:35:27'),
(50, 3, 2, '2021-07-15 18:35:27', '2021-07-15 18:35:27'),
(51, 3, 3, '2021-07-15 18:35:28', '2021-07-15 18:35:28'),
(52, 3, 4, '2021-07-15 18:35:28', '2021-07-15 18:35:28'),
(53, 3, 5, '2021-07-15 18:35:28', '2021-07-15 18:35:28'),
(54, 3, 6, '2021-07-15 18:35:28', '2021-07-15 18:35:28'),
(55, 3, 7, '2021-07-15 18:35:28', '2021-07-15 18:35:28'),
(56, 3, 8, '2021-07-15 18:35:28', '2021-07-15 18:35:28'),
(57, 3, 9, '2021-07-15 18:35:28', '2021-07-15 18:35:28'),
(58, 3, 10, '2021-07-15 18:35:28', '2021-07-15 18:35:28'),
(59, 3, 11, '2021-07-15 18:35:28', '2021-07-15 18:35:28'),
(60, 3, 12, '2021-07-15 18:35:28', '2021-07-15 18:35:28'),
(61, 3, 13, '2021-07-15 18:35:28', '2021-07-15 18:35:28'),
(62, 3, 14, '2021-07-15 18:35:28', '2021-07-15 18:35:28'),
(63, 3, 15, '2021-07-15 18:35:29', '2021-07-15 18:35:29'),
(64, 3, 16, '2021-07-15 18:35:29', '2021-07-15 18:35:29'),
(65, 3, 17, '2021-07-15 18:35:29', '2021-07-15 18:35:29'),
(66, 3, 18, '2021-07-15 18:35:29', '2021-07-15 18:35:29'),
(67, 3, 19, '2021-07-15 18:35:29', '2021-07-15 18:35:29'),
(68, 3, 20, '2021-07-15 18:35:29', '2021-07-15 18:35:29'),
(69, 3, 21, '2021-07-15 18:35:29', '2021-07-15 18:35:29'),
(70, 3, 22, '2021-07-15 18:35:29', '2021-07-15 18:35:29'),
(71, 3, 23, '2021-07-15 18:35:29', '2021-07-15 18:35:29'),
(72, 3, 24, '2021-07-15 18:35:29', '2021-07-15 18:35:29');

-- --------------------------------------------------------

--
-- Struktur dari tabel `mahasiswa`
--

CREATE TABLE `mahasiswa` (
  `id_mhs` bigint(20) UNSIGNED NOT NULL,
  `id_users` bigint(20) UNSIGNED NOT NULL,
  `id_prodi` bigint(20) UNSIGNED NOT NULL,
  `id_kamar` bigint(20) UNSIGNED NOT NULL,
  `nama_mhs` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nim` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `alamat` varchar(125) COLLATE utf8mb4_unicode_ci NOT NULL,
  `no_hp_mhs` varchar(13) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nama_ortu` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `no_hp_ortu` varchar(13) COLLATE utf8mb4_unicode_ci NOT NULL,
  `jenis_kelamin` int(11) NOT NULL,
  `status_keaktifan` int(11) NOT NULL DEFAULT 1,
  `tanggal_lahir` date NOT NULL,
  `agama` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `keterangan_asal` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `role_mhs` varchar(12) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `mahasiswa`
--

INSERT INTO `mahasiswa` (`id_mhs`, `id_users`, `id_prodi`, `id_kamar`, `nama_mhs`, `nim`, `alamat`, `no_hp_mhs`, `nama_ortu`, `no_hp_ortu`, `jenis_kelamin`, `status_keaktifan`, `tanggal_lahir`, `agama`, `keterangan_asal`, `role_mhs`, `created_at`, `updated_at`) VALUES
(1, 1, 23, 7, 'Ichwan Latif Fajari', '181511046', 'Perum Villa Permata Blok DD5/33', '991276549', 'Bapak Ichwan', '7878910454', 1, 1, '2000-04-17', 'Islam', 'ADIK', 'Mahasiswa', '2021-07-15 18:35:31', '2021-08-02 01:03:20'),
(2, 2, 23, 20, 'Dudung', '181511046', 'Perum Villa Permata Blok DD5/33', '08991276549', 'Bapak Ichwan', '087878910454', 1, 0, '2000-04-17', 'Islam', 'BIDIKMISI', 'Pengurus', '2021-07-15 18:35:31', '2021-07-15 18:35:31'),
(9, 15, 19, 48, 'Bella Nemesias', '4621532156', 'Perum Villa Permata Blok DD5 No.33', '8991276549', 'Bu Bella', '8991234567', 0, 1, '2021-04-09', 'Kristen', 'Bidikmisi', 'Pengurus', '2021-08-06 03:43:14', '2021-08-06 03:43:14');

-- --------------------------------------------------------

--
-- Struktur dari tabel `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(47, '2014_10_12_000000_create_users_table', 1),
(48, '2019_12_14_000001_create_personal_access_tokens_table', 1),
(49, '2021_05_26_075122_create_gedung', 1),
(50, '2021_05_26_075123_create_jurusan', 1),
(51, '2021_05_26_075543_create_kamar', 1),
(52, '2021_05_26_075604_create_prodi', 1),
(53, '2021_05_26_075903_create_mahasiswa', 1),
(54, '2021_05_26_080103_create_presensi', 1),
(55, '2021_05_26_080123_create_perizinan', 1),
(56, '2021_05_26_080200_create_resign', 1),
(57, '2021_07_01_130634_create_view_rekapitulasi_mahasiswa', 1),
(58, '2021_07_01_151614_create_view_mahasiswa_gedung', 1),
(59, '2021_07_02_091730_create_view_rekapitulasi_perizinan_gedung', 1),
(60, '2014_10_12_100000_create_password_resets_table', 2),
(61, '2019_08_19_000000_create_failed_jobs_table', 2);

-- --------------------------------------------------------

--
-- Struktur dari tabel `password_resets`
--

CREATE TABLE `password_resets` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `password_resets`
--

INSERT INTO `password_resets` (`email`, `token`, `created_at`) VALUES
('ichwan.latif.tif18@polban.ac.id', '$2y$10$ySpYgyu8N.GpHdMlFXDP3OyZtXGAnxRL27lwpmhi5VAlXov3OD5U6', '2021-08-04 08:36:35');

-- --------------------------------------------------------

--
-- Struktur dari tabel `perizinan`
--

CREATE TABLE `perizinan` (
  `id_perizinan` bigint(20) UNSIGNED NOT NULL,
  `id_mhs` bigint(20) UNSIGNED NOT NULL,
  `tanggal_pergi` date NOT NULL,
  `tanggal_pulang` date DEFAULT NULL,
  `pengajuan_tanggal_pulang` date DEFAULT NULL,
  `keterangan_izin` varchar(125) COLLATE utf8mb4_unicode_ci NOT NULL,
  `alamat_izin` varchar(125) COLLATE utf8mb4_unicode_ci NOT NULL,
  `keterangan_kembali` varchar(125) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `surat_pendukung` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `catatan_approval` varchar(125) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status_izin` int(11) NOT NULL,
  `suhu_badan` double(8,2) NOT NULL,
  `kondisi_kesehatan` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `jenis_kendaraan` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `perizinan`
--

INSERT INTO `perizinan` (`id_perizinan`, `id_mhs`, `tanggal_pergi`, `tanggal_pulang`, `pengajuan_tanggal_pulang`, `keterangan_izin`, `alamat_izin`, `keterangan_kembali`, `surat_pendukung`, `catatan_approval`, `status_izin`, `suhu_badan`, `kondisi_kesehatan`, `jenis_kendaraan`, `created_at`, `updated_at`) VALUES
(13, 1, '2021-07-29', '2021-07-31', NULL, 'Test File', 'Perum Villa Permata Blok DD5 No.33', NULL, '1626607198-rPdiQdfkP9.pdf', NULL, 3, 36.30, 'Sehat', 'Sepeda', '2021-07-18 04:20:00', '2021-07-27 01:06:24'),
(14, 1, '2021-07-29', '2021-07-30', '2021-07-30', 'Mengambil Ijazah SMA', 'Perum Villa Permata Blok DD5 No.33', 'Sudah selesai mengambil ijazah', '1627268086-iw7XEtk8o1.pdf', NULL, 10, 36.50, 'Sehat', 'Travel', '2021-07-25 19:54:48', '2021-07-25 22:11:19'),
(15, 1, '2021-08-06', '2021-08-20', NULL, 'Pulang Kampung', 'Bekasi', NULL, '1628139364-UfGv02annQ.pdf', NULL, 0, 36.50, 'Sehat', 'Travel', '2021-08-04 21:56:06', '2021-08-04 21:56:06');

-- --------------------------------------------------------

--
-- Struktur dari tabel `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `personal_access_tokens`
--

INSERT INTO `personal_access_tokens` (`id`, `tokenable_type`, `tokenable_id`, `name`, `token`, `abilities`, `last_used_at`, `created_at`, `updated_at`) VALUES
(13, 'App\\Models\\User', 2, 'token-auth', '454ba7a31f79580a2395db962be57a24c82d4f3e00979355c1c955760cd762df', '[\"*\"]', NULL, '2021-07-18 01:03:15', '2021-07-18 01:03:15');

-- --------------------------------------------------------

--
-- Struktur dari tabel `presensi`
--

CREATE TABLE `presensi` (
  `id_presensi` bigint(20) UNSIGNED NOT NULL,
  `id_mhs` bigint(20) UNSIGNED NOT NULL,
  `status_presensi` int(11) NOT NULL,
  `latitude` double NOT NULL,
  `longitude` double NOT NULL,
  `suhu_badan` double(8,2) NOT NULL,
  `kondisi_kesehatan` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `presensi`
--

INSERT INTO `presensi` (`id_presensi`, `id_mhs`, `status_presensi`, `latitude`, `longitude`, `suhu_badan`, `kondisi_kesehatan`, `created_at`, `updated_at`) VALUES
(2, 1, 0, -6.406522, 107.0968205, 36.70, 'Sehat', '2021-07-20 06:19:41', '2021-07-20 06:19:41');

-- --------------------------------------------------------

--
-- Struktur dari tabel `prodi`
--

CREATE TABLE `prodi` (
  `id_prodi` bigint(20) UNSIGNED NOT NULL,
  `id_jurusan` bigint(20) UNSIGNED NOT NULL,
  `nama_prodi` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `prodi`
--

INSERT INTO `prodi` (`id_prodi`, `id_jurusan`, `nama_prodi`, `created_at`, `updated_at`) VALUES
(1, 1, 'DIII - Teknik Konstruksi Gedung', '2021-07-15 18:35:19', '2021-07-15 18:35:19'),
(2, 1, 'DIII - Teknik Konstruksi Sipil', '2021-07-15 18:35:19', '2021-07-15 18:35:19'),
(3, 1, 'DIV - Teknik Perancangan Jalan dan Jembatan', '2021-07-15 18:35:19', '2021-07-15 18:35:19'),
(4, 1, 'DIV - Teknik Perawatan dan Perbaikan Gedung', '2021-07-15 18:35:19', '2021-07-15 18:35:19'),
(5, 2, 'DIII - Teknik Mesin', '2021-07-15 18:35:19', '2021-07-15 18:35:19'),
(6, 2, 'DIII - Teknik Aeronautika', '2021-07-15 18:35:19', '2021-07-15 18:35:19'),
(7, 2, 'DIV - Teknik Perancangan dan Konstruksi Mesin', '2021-07-15 18:35:19', '2021-07-15 18:35:19'),
(8, 2, 'DIV - Proses Manufaktur', '2021-07-15 18:35:19', '2021-07-15 18:35:19'),
(9, 3, 'DIII - Teknik Pendingin dan Tata Udara', '2021-07-15 18:35:20', '2021-07-15 18:35:20'),
(10, 3, 'DIV - Teknik Pendingin dan Tata Udara', '2021-07-15 18:35:20', '2021-07-15 18:35:20'),
(11, 4, 'DIII - Teknik Konversi Energi', '2021-07-15 18:35:20', '2021-07-15 18:35:20'),
(12, 4, 'DIV - Teknologi Pembangkit Tenaga Listrik', '2021-07-15 18:35:20', '2021-07-15 18:35:20'),
(13, 4, 'DIV - Teknik Konversi Energi', '2021-07-15 18:35:20', '2021-07-15 18:35:20'),
(14, 5, 'DIII - Teknik Elektronika', '2021-07-15 18:35:20', '2021-07-15 18:35:20'),
(15, 5, 'DIII - Teknik Listrik', '2021-07-15 18:35:20', '2021-07-15 18:35:20'),
(16, 5, 'DIII - Teknik Telekomunikasi', '2021-07-15 18:35:20', '2021-07-15 18:35:20'),
(17, 5, 'DIV - Teknik Elektronika', '2021-07-15 18:35:20', '2021-07-15 18:35:20'),
(18, 5, 'DIV - Teknik Telekomunikasi', '2021-07-15 18:35:21', '2021-07-15 18:35:21'),
(19, 5, 'DIV - Teknik Otomasi Indurstri', '2021-07-15 18:35:21', '2021-07-15 18:35:21'),
(20, 6, 'DIII - Teknik Kimia', '2021-07-15 18:35:21', '2021-07-15 18:35:21'),
(21, 6, 'DIII - Analis Kimia', '2021-07-15 18:35:21', '2021-07-15 18:35:21'),
(22, 6, 'DIV - Teknik Kimia Produksi Bersih', '2021-07-15 18:35:21', '2021-07-15 18:35:21'),
(23, 7, 'DIII - Teknik Informatika', '2021-07-15 18:35:21', '2021-07-15 18:35:21'),
(24, 7, 'DIV - Teknik Informatika', '2021-07-15 18:35:21', '2021-07-15 18:35:21'),
(25, 8, 'DIII - Akuntansi', '2021-07-15 18:35:21', '2021-07-15 18:35:21'),
(26, 8, 'DIII - Keuangan dan Perbankan', '2021-07-15 18:35:22', '2021-07-15 18:35:22'),
(27, 8, 'DIV - Akuntansi Manajemen Pemerintahan', '2021-07-15 18:35:22', '2021-07-15 18:35:22'),
(28, 8, 'DIV - Keuangan Syariah', '2021-07-15 18:35:22', '2021-07-15 18:35:22'),
(29, 8, 'DIV - Akuntasi', '2021-07-15 18:35:22', '2021-07-15 18:35:22'),
(30, 9, 'DIII - Administrasi Bisnis', '2021-07-15 18:35:22', '2021-07-15 18:35:22'),
(31, 9, 'DIII - Manajemen Pemasaran', '2021-07-15 18:35:22', '2021-07-15 18:35:22'),
(32, 9, 'DIII - Usaha Perjalanan Wisata', '2021-07-15 18:35:23', '2021-07-15 18:35:23'),
(33, 9, 'DIV - Manajemen Pemasaran', '2021-07-15 18:35:23', '2021-07-15 18:35:23'),
(34, 9, 'DIV - Administrasi Bisnis', '2021-07-15 18:35:23', '2021-07-15 18:35:23'),
(35, 9, 'DIV - Manajemen Aset', '2021-07-15 18:35:23', '2021-07-15 18:35:23'),
(36, 10, 'DIII - Bahasa Inggris', '2021-07-15 18:35:23', '2021-07-15 18:35:23');

-- --------------------------------------------------------

--
-- Struktur dari tabel `resign`
--

CREATE TABLE `resign` (
  `id_resign` bigint(20) UNSIGNED NOT NULL,
  `id_mhs` bigint(20) UNSIGNED NOT NULL,
  `tanggal_resign` date NOT NULL,
  `keterangan_resign` varchar(125) COLLATE utf8mb4_unicode_ci NOT NULL,
  `suhu_badan` double(8,2) NOT NULL,
  `kondisi_kesehatan` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `jenis_kendaraan` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `keterangan_stnk` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status_resign` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `resign`
--

INSERT INTO `resign` (`id_resign`, `id_mhs`, `tanggal_resign`, `keterangan_resign`, `suhu_badan`, `kondisi_kesehatan`, `jenis_kendaraan`, `keterangan_stnk`, `status_resign`, `created_at`, `updated_at`) VALUES
(4, 1, '2021-07-31', 'Masa tinggal habis', 36.30, 'Sehat', 'Motor', NULL, 0, '2021-07-25 21:52:18', '2021-07-25 21:52:18');

-- --------------------------------------------------------

--
-- Struktur dari tabel `users`
--

CREATE TABLE `users` (
  `id_users` bigint(20) UNSIGNED NOT NULL,
  `email` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` int(11) NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `users`
--

INSERT INTO `users` (`id_users`, `email`, `password`, `role`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'ichwan.latif.tif18@polban.ac.id', '$2y$10$g0Wjhh2Ta9js3IHaeZys7.ym/E0N79BYL3hq.QGDPGf4sTsY7j.3G', 1, 'ZbNgL9AzuBzYB1xLXhUf5KkZpupvz6AaCeY2FBv0ZpuH7lC0MD9PZ2SCdBfY', '2021-07-15 18:35:31', '2021-08-04 07:56:13'),
(2, 'dudung@polban.ac.id', '$2y$10$gGwwaP36kXswHt.sPtM0MODVRD/BQjFr4yGB.SsdLBm.lNVimYwI.', 1, NULL, '2021-07-15 18:35:31', '2021-07-15 18:35:31'),
(3, 'asep@polban.ac.id', '$2y$10$T8S45txyw1gaXtRQCKCuZexN05YUtulHOpZPep7NJaRlUQF5U8bja', 1, NULL, '2021-07-15 18:35:31', '2021-07-15 18:35:31'),
(4, 'irfan.siswara.tif18@polban.ac.id', '$2y$10$n1DM8rNb3LN7mbC7tJexJOhKRMLmALUDydhws9pQC9XT4IEDFb2FS', 3, NULL, '2021-07-15 18:35:32', '2021-07-15 18:35:32'),
(5, 'rizqa.fauziyyah.tif18@polban.ac.id', '$2y$10$.23PcfGE77jI30Xtl3ZesubmghKhnM6ceJN0DLM2fnqj5KzIKzGzy', 2, NULL, '2021-07-15 18:35:32', '2021-07-15 18:35:32'),
(12, 'dodol@polban.ac.id', '$2y$10$jhQdQBuFSkSbmD/ZSyzIqeP9YsnxB.wetTIr/5ufxFd6a9FUifbme', 1, NULL, '2021-07-27 02:00:40', '2021-07-27 02:00:40'),
(13, 'dudul@polban.ac.id', '$2y$10$G6bm2RXoXYs0c7Umab4a6uHCH317gzQngg5DV3btfQlDSoOHvrLtK', 1, NULL, '2021-07-27 02:00:41', '2021-07-27 02:00:41'),
(14, 'bella.nemesias.tif18@polban.ac.id', '$2y$10$uM1C.FvJzKLVxO3gp/gIsegjyPKKuFnt1R0ewrWelPI3cMVLyeCqO', 1, NULL, '2021-07-27 06:00:16', '2021-07-27 06:00:16'),
(15, 'bella.nemesias.toi18@polban.ac.id', '$2y$10$rpBd50rM0LxlVMKFu6SLJ.DuHkr0y179i7aMYN75V/9Eliu7ooItC', 1, NULL, '2021-08-06 03:43:14', '2021-08-06 03:43:14');

-- --------------------------------------------------------

--
-- Stand-in struktur untuk tampilan `view_mahasiswa_gedung`
-- (Lihat di bawah untuk tampilan aktual)
--
CREATE TABLE `view_mahasiswa_gedung` (
`nama_mhs` varchar(50)
,`nim` varchar(10)
,`role_mhs` varchar(12)
,`no_kamar` int(11)
,`nama_gedung` char(1)
);

-- --------------------------------------------------------

--
-- Stand-in struktur untuk tampilan `view_rekapitulasi_mahasiswa`
-- (Lihat di bawah untuk tampilan aktual)
--
CREATE TABLE `view_rekapitulasi_mahasiswa` (
`nama_mhs` varchar(50)
,`nim` varchar(10)
,`no_kamar` int(11)
,`nama_gedung` char(1)
,`status_presensi` int(11)
,`created_at` timestamp
);

-- --------------------------------------------------------

--
-- Stand-in struktur untuk tampilan `view_rekapitulasi_perizinan_gedung`
-- (Lihat di bawah untuk tampilan aktual)
--
CREATE TABLE `view_rekapitulasi_perizinan_gedung` (
`nama_mhs` varchar(50)
,`nim` varchar(10)
,`no_kamar` int(11)
,`nama_gedung` char(1)
,`status_izin` int(11)
,`created_at` timestamp
);

-- --------------------------------------------------------

--
-- Struktur untuk view `view_mahasiswa_gedung`
--
DROP TABLE IF EXISTS `view_mahasiswa_gedung`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `view_mahasiswa_gedung`  AS  (select `mahasiswa`.`nama_mhs` AS `nama_mhs`,`mahasiswa`.`nim` AS `nim`,`mahasiswa`.`role_mhs` AS `role_mhs`,`kamar`.`no_kamar` AS `no_kamar`,`gedung`.`nama_gedung` AS `nama_gedung` from ((`mahasiswa` join `kamar` on(`mahasiswa`.`id_kamar` = `kamar`.`id_kamar`)) join `gedung` on(`kamar`.`id_gedung` = `gedung`.`id_gedung`))) ;

-- --------------------------------------------------------

--
-- Struktur untuk view `view_rekapitulasi_mahasiswa`
--
DROP TABLE IF EXISTS `view_rekapitulasi_mahasiswa`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `view_rekapitulasi_mahasiswa`  AS  (select `mahasiswa`.`nama_mhs` AS `nama_mhs`,`mahasiswa`.`nim` AS `nim`,`kamar`.`no_kamar` AS `no_kamar`,`gedung`.`nama_gedung` AS `nama_gedung`,`presensi`.`status_presensi` AS `status_presensi`,`presensi`.`created_at` AS `created_at` from (((`mahasiswa` join `kamar` on(`mahasiswa`.`id_kamar` = `kamar`.`id_kamar`)) join `gedung` on(`kamar`.`id_gedung` = `gedung`.`id_gedung`)) join `presensi` on(`mahasiswa`.`id_mhs` = `presensi`.`id_mhs`))) ;

-- --------------------------------------------------------

--
-- Struktur untuk view `view_rekapitulasi_perizinan_gedung`
--
DROP TABLE IF EXISTS `view_rekapitulasi_perizinan_gedung`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `view_rekapitulasi_perizinan_gedung`  AS  (select `mahasiswa`.`nama_mhs` AS `nama_mhs`,`mahasiswa`.`nim` AS `nim`,`kamar`.`no_kamar` AS `no_kamar`,`gedung`.`nama_gedung` AS `nama_gedung`,`perizinan`.`status_izin` AS `status_izin`,`perizinan`.`created_at` AS `created_at` from (((`mahasiswa` join `kamar` on(`mahasiswa`.`id_kamar` = `kamar`.`id_kamar`)) join `gedung` on(`kamar`.`id_gedung` = `gedung`.`id_gedung`)) join `perizinan` on(`mahasiswa`.`id_mhs` = `perizinan`.`id_mhs`))) ;

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indeks untuk tabel `gedung`
--
ALTER TABLE `gedung`
  ADD PRIMARY KEY (`id_gedung`);

--
-- Indeks untuk tabel `jurusan`
--
ALTER TABLE `jurusan`
  ADD PRIMARY KEY (`id_jurusan`);

--
-- Indeks untuk tabel `kamar`
--
ALTER TABLE `kamar`
  ADD PRIMARY KEY (`id_kamar`),
  ADD KEY `kamar_id_gedung_foreign` (`id_gedung`);

--
-- Indeks untuk tabel `mahasiswa`
--
ALTER TABLE `mahasiswa`
  ADD PRIMARY KEY (`id_mhs`),
  ADD KEY `mahasiswa_id_users_foreign` (`id_users`),
  ADD KEY `mahasiswa_id_prodi_foreign` (`id_prodi`),
  ADD KEY `mahasiswa_id_kamar_foreign` (`id_kamar`);

--
-- Indeks untuk tabel `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `password_resets`
--
ALTER TABLE `password_resets`
  ADD KEY `password_resets_email_index` (`email`);

--
-- Indeks untuk tabel `perizinan`
--
ALTER TABLE `perizinan`
  ADD PRIMARY KEY (`id_perizinan`),
  ADD KEY `perizinan_id_mhs_foreign` (`id_mhs`);

--
-- Indeks untuk tabel `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indeks untuk tabel `presensi`
--
ALTER TABLE `presensi`
  ADD PRIMARY KEY (`id_presensi`),
  ADD KEY `presensi_id_mhs_foreign` (`id_mhs`);

--
-- Indeks untuk tabel `prodi`
--
ALTER TABLE `prodi`
  ADD PRIMARY KEY (`id_prodi`),
  ADD KEY `prodi_id_jurusan_foreign` (`id_jurusan`);

--
-- Indeks untuk tabel `resign`
--
ALTER TABLE `resign`
  ADD PRIMARY KEY (`id_resign`),
  ADD KEY `resign_id_mhs_foreign` (`id_mhs`);

--
-- Indeks untuk tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id_users`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `gedung`
--
ALTER TABLE `gedung`
  MODIFY `id_gedung` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT untuk tabel `jurusan`
--
ALTER TABLE `jurusan`
  MODIFY `id_jurusan` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT untuk tabel `kamar`
--
ALTER TABLE `kamar`
  MODIFY `id_kamar` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=73;

--
-- AUTO_INCREMENT untuk tabel `mahasiswa`
--
ALTER TABLE `mahasiswa`
  MODIFY `id_mhs` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT untuk tabel `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=62;

--
-- AUTO_INCREMENT untuk tabel `perizinan`
--
ALTER TABLE `perizinan`
  MODIFY `id_perizinan` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT untuk tabel `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

--
-- AUTO_INCREMENT untuk tabel `presensi`
--
ALTER TABLE `presensi`
  MODIFY `id_presensi` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT untuk tabel `prodi`
--
ALTER TABLE `prodi`
  MODIFY `id_prodi` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT untuk tabel `resign`
--
ALTER TABLE `resign`
  MODIFY `id_resign` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT untuk tabel `users`
--
ALTER TABLE `users`
  MODIFY `id_users` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `kamar`
--
ALTER TABLE `kamar`
  ADD CONSTRAINT `kamar_id_gedung_foreign` FOREIGN KEY (`id_gedung`) REFERENCES `gedung` (`id_gedung`) ON DELETE CASCADE;

--
-- Ketidakleluasaan untuk tabel `mahasiswa`
--
ALTER TABLE `mahasiswa`
  ADD CONSTRAINT `mahasiswa_id_kamar_foreign` FOREIGN KEY (`id_kamar`) REFERENCES `kamar` (`id_kamar`) ON DELETE CASCADE,
  ADD CONSTRAINT `mahasiswa_id_prodi_foreign` FOREIGN KEY (`id_prodi`) REFERENCES `prodi` (`id_prodi`) ON DELETE CASCADE,
  ADD CONSTRAINT `mahasiswa_id_users_foreign` FOREIGN KEY (`id_users`) REFERENCES `users` (`id_users`) ON DELETE CASCADE;

--
-- Ketidakleluasaan untuk tabel `perizinan`
--
ALTER TABLE `perizinan`
  ADD CONSTRAINT `perizinan_id_mhs_foreign` FOREIGN KEY (`id_mhs`) REFERENCES `mahasiswa` (`id_mhs`) ON DELETE CASCADE;

--
-- Ketidakleluasaan untuk tabel `presensi`
--
ALTER TABLE `presensi`
  ADD CONSTRAINT `presensi_id_mhs_foreign` FOREIGN KEY (`id_mhs`) REFERENCES `mahasiswa` (`id_mhs`) ON DELETE CASCADE;

--
-- Ketidakleluasaan untuk tabel `prodi`
--
ALTER TABLE `prodi`
  ADD CONSTRAINT `prodi_id_jurusan_foreign` FOREIGN KEY (`id_jurusan`) REFERENCES `jurusan` (`id_jurusan`) ON DELETE CASCADE;

--
-- Ketidakleluasaan untuk tabel `resign`
--
ALTER TABLE `resign`
  ADD CONSTRAINT `resign_id_mhs_foreign` FOREIGN KEY (`id_mhs`) REFERENCES `mahasiswa` (`id_mhs`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
