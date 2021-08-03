-- MySQL dump 10.13  Distrib 8.0.23, for Win64 (x86_64)
--
-- Host: localhost    Database: yourtour
-- ------------------------------------------------------
-- Server version	8.0.26-0ubuntu0.20.04.2

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `messages`
--

DROP TABLE IF EXISTS `messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `messages` (
  `id` int NOT NULL AUTO_INCREMENT,
  `tour_id` int DEFAULT NULL,
  `sender_id` int NOT NULL,
  `receiver_id` int NOT NULL,
  `topic` varchar(255) NOT NULL DEFAULT '[Brak tematu]',
  `content` varchar(1024) NOT NULL,
  `time` datetime NOT NULL,
  `was_read` tinyint(1) NOT NULL DEFAULT '0',
  `sender_deleted` tinyint(1) NOT NULL DEFAULT '0',
  `receiver_deleted` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `messages`
--

LOCK TABLES `messages` WRITE;
/*!40000 ALTER TABLE `messages` DISABLE KEYS */;
/*!40000 ALTER TABLE `messages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `test`
--

DROP TABLE IF EXISTS `test`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `test` (
  `id` int NOT NULL AUTO_INCREMENT,
  `creation_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `test_val` varchar(256) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `test`
--

LOCK TABLES `test` WRITE;
/*!40000 ALTER TABLE `test` DISABLE KEYS */;
INSERT INTO `test` VALUES (1,'2021-08-02 13:26:38','hello world');
/*!40000 ALTER TABLE `test` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tour_has_places`
--

DROP TABLE IF EXISTS `tour_has_places`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tour_has_places` (
  `id` int NOT NULL AUTO_INCREMENT,
  `place_id` int NOT NULL,
  `tour_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `tour_id` (`tour_id`),
  KEY `place_id` (`place_id`),
  CONSTRAINT `tour_has_places_ibfk_1` FOREIGN KEY (`tour_id`) REFERENCES `tours` (`id`),
  CONSTRAINT `tour_has_places_ibfk_2` FOREIGN KEY (`place_id`) REFERENCES `tour_places` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=48 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tour_has_places`
--

LOCK TABLES `tour_has_places` WRITE;
/*!40000 ALTER TABLE `tour_has_places` DISABLE KEYS */;
INSERT INTO `tour_has_places` VALUES (1,46492,1),(2,46598,1),(3,5457,2),(4,38978,3),(5,42676,4),(6,2234,5),(7,11882,6),(8,46170,6),(9,4246,7),(10,48982,7),(11,45770,8),(12,46170,8),(13,1221,8),(14,48982,9),(15,4246,9),(16,34943,9),(17,31186,10),(18,44805,10),(19,12926,10),(20,46170,11),(21,45770,11),(22,34971,11),(23,45780,12),(24,11882,12),(25,25143,12),(26,23609,12),(27,46175,12),(28,5347,13),(29,5172,13),(30,16908,14),(31,13821,15),(32,47567,16),(33,14030,17),(34,10253,18),(35,42676,19),(36,32236,19),(37,31139,19),(38,16375,20),(39,9970,21),(41,48982,23),(42,4246,23),(43,9391,24),(44,40596,25),(45,9391,26),(46,43194,27),(47,4241,28);
/*!40000 ALTER TABLE `tour_has_places` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tour_has_tags`
--

DROP TABLE IF EXISTS `tour_has_tags`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tour_has_tags` (
  `id` int NOT NULL AUTO_INCREMENT,
  `tour_id` int NOT NULL,
  `tag_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `tour_id` (`tour_id`),
  KEY `tag_id` (`tag_id`),
  CONSTRAINT `tour_has_tags_ibfk_1` FOREIGN KEY (`tour_id`) REFERENCES `tours` (`id`),
  CONSTRAINT `tour_has_tags_ibfk_2` FOREIGN KEY (`tag_id`) REFERENCES `tour_tags` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tour_has_tags`
--

LOCK TABLES `tour_has_tags` WRITE;
/*!40000 ALTER TABLE `tour_has_tags` DISABLE KEYS */;
/*!40000 ALTER TABLE `tour_has_tags` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tour_images`
--

DROP TABLE IF EXISTS `tour_images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tour_images` (
  `id` int NOT NULL AUTO_INCREMENT,
  `tour_id` int NOT NULL,
  `path` varchar(1024) NOT NULL,
  `filename` varchar(1024) NOT NULL,
  `is_main` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  UNIQUE KEY `path` (`path`),
  UNIQUE KEY `filename` (`filename`),
  KEY `tour_id` (`tour_id`),
  CONSTRAINT `tour_images_ibfk_1` FOREIGN KEY (`tour_id`) REFERENCES `tours` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=82 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tour_images`
--

LOCK TABLES `tour_images` WRITE;
/*!40000 ALTER TABLE `tour_images` DISABLE KEYS */;
INSERT INTO `tour_images` VALUES (1,1,'/home/rfiglus/app/app/storage/tour_images/8:1952abf0-ad0e-475d-a242-a6a9949d8eed.jpg','8:1952abf0-ad0e-475d-a242-a6a9949d8eed.jpg',1),(2,1,'/home/rfiglus/app/app/storage/tour_images/16:632ad9b1-fe8c-4974-80d2-ec9f22ce8d9f.jpg','16:632ad9b1-fe8c-4974-80d2-ec9f22ce8d9f.jpg',0),(3,1,'/home/rfiglus/app/app/storage/tour_images/6:f8fc4981-1558-4141-be87-17629ebc14f4.jpg','6:f8fc4981-1558-4141-be87-17629ebc14f4.jpg',0),(4,1,'/home/rfiglus/app/app/storage/tour_images/9:034d6657-da92-4ce9-81d3-226be847ad98.jpg','9:034d6657-da92-4ce9-81d3-226be847ad98.jpg',0),(5,1,'/home/rfiglus/app/app/storage/tour_images/11:f44f1a36-1a03-4bef-959d-21eace60bb95.jpg','11:f44f1a36-1a03-4bef-959d-21eace60bb95.jpg',0),(6,1,'/home/rfiglus/app/app/storage/tour_images/15:f67f7a79-42cf-4604-be89-a59e2feab216.jpg','15:f67f7a79-42cf-4604-be89-a59e2feab216.jpg',0),(7,2,'/home/rfiglus/app/app/storage/tour_images/20180929_095141:96d4bbc3-3761-4338-9e42-8f459daf52b8.jpg','20180929_095141:96d4bbc3-3761-4338-9e42-8f459daf52b8.jpg',1),(8,3,'/home/rfiglus/app/app/storage/tour_images/20190514_160119:c836cda2-0263-4e7b-96a7-ad9300174d8b.jpg','20190514_160119:c836cda2-0263-4e7b-96a7-ad9300174d8b.jpg',1),(9,3,'/home/rfiglus/app/app/storage/tour_images/226206671_209403644461800_1081280765890020590_n:cc78a7a8-f677-4487-9598-928870e79ee5.jpg','226206671_209403644461800_1081280765890020590_n:cc78a7a8-f677-4487-9598-928870e79ee5.jpg',0),(10,3,'/home/rfiglus/app/app/storage/tour_images/223339176_304592101455733_718229845246925613_n:1daa4c22-8840-4fd5-a35f-77d7519dfb3a.jpg','223339176_304592101455733_718229845246925613_n:1daa4c22-8840-4fd5-a35f-77d7519dfb3a.jpg',0),(11,3,'/home/rfiglus/app/app/storage/tour_images/225372317_372593434468562_7851255089227605601_n:e14c3baa-3095-4713-86b0-691c20795c0d.jpg','225372317_372593434468562_7851255089227605601_n:e14c3baa-3095-4713-86b0-691c20795c0d.jpg',0),(12,4,'/home/rfiglus/app/app/storage/tour_images/20200805_153718:1c018011-758c-47da-8849-e88ca2156731.jpg','20200805_153718:1c018011-758c-47da-8849-e88ca2156731.jpg',1),(13,4,'/home/rfiglus/app/app/storage/tour_images/226206671_209403644461800_1081280765890020590_n:b67c8890-9c4f-4b37-88ae-c2e2268b9d94.jpg','226206671_209403644461800_1081280765890020590_n:b67c8890-9c4f-4b37-88ae-c2e2268b9d94.jpg',0),(14,4,'/home/rfiglus/app/app/storage/tour_images/223339176_304592101455733_718229845246925613_n:1ec4a729-4928-42fa-9ce8-5a5ddc6912c8.jpg','223339176_304592101455733_718229845246925613_n:1ec4a729-4928-42fa-9ce8-5a5ddc6912c8.jpg',0),(15,4,'/home/rfiglus/app/app/storage/tour_images/225372317_372593434468562_7851255089227605601_n:a7e04de1-e8bc-4f53-9d5d-e3b5523f4ed6.jpg','225372317_372593434468562_7851255089227605601_n:a7e04de1-e8bc-4f53-9d5d-e3b5523f4ed6.jpg',0),(16,4,'/home/rfiglus/app/app/storage/tour_images/20180929_171858:fb46d393-f05a-4809-bd2c-a0da59435113.jpg','20180929_171858:fb46d393-f05a-4809-bd2c-a0da59435113.jpg',0),(17,4,'/home/rfiglus/app/app/storage/tour_images/IMG-20201210-WA0007:64022900-23c0-4ebd-bbae-174040d68c9a.jpg','IMG-20201210-WA0007:64022900-23c0-4ebd-bbae-174040d68c9a.jpg',0),(18,5,'/home/rfiglus/app/app/storage/tour_images/indeks:f8ccdeb0-9f1a-4234-97c5-25ef5ff16930.jpg','indeks:f8ccdeb0-9f1a-4234-97c5-25ef5ff16930.jpg',1),(19,6,'/home/rfiglus/app/app/storage/tour_images/7:99b09e0a-a45c-4a1d-807a-3603c06aa1da.jpg','7:99b09e0a-a45c-4a1d-807a-3603c06aa1da.jpg',1),(20,7,'/home/rfiglus/app/app/storage/tour_images/kamil-gliwinski-xcPw1-5OHTk-unsplash-800x450:ec17c94b-631b-4c30-b852-fc7e5c4522dc.jpg','kamil-gliwinski-xcPw1-5OHTk-unsplash-800x450:ec17c94b-631b-4c30-b852-fc7e5c4522dc.jpg',1),(21,7,'/home/rfiglus/app/app/storage/tour_images/226206671_209403644461800_1081280765890020590_n:607ac57f-52e9-44de-abcc-54c5455f1855.jpg','226206671_209403644461800_1081280765890020590_n:607ac57f-52e9-44de-abcc-54c5455f1855.jpg',0),(22,7,'/home/rfiglus/app/app/storage/tour_images/223339176_304592101455733_718229845246925613_n:f7892e71-2f1c-4a6c-bc02-bca57c29a221.jpg','223339176_304592101455733_718229845246925613_n:f7892e71-2f1c-4a6c-bc02-bca57c29a221.jpg',0),(23,7,'/home/rfiglus/app/app/storage/tour_images/225372317_372593434468562_7851255089227605601_n:077815b2-b2dd-4956-8ebe-c2b45a6d53ec.jpg','225372317_372593434468562_7851255089227605601_n:077815b2-b2dd-4956-8ebe-c2b45a6d53ec.jpg',0),(24,7,'/home/rfiglus/app/app/storage/tour_images/20180929_171858:93478473-e800-4b0e-a04e-f82f87881659.jpg','20180929_171858:93478473-e800-4b0e-a04e-f82f87881659.jpg',0),(25,7,'/home/rfiglus/app/app/storage/tour_images/IMG-20201210-WA0007:e531f4da-a0fd-4629-bf4e-a05f9a70121a.jpg','IMG-20201210-WA0007:e531f4da-a0fd-4629-bf4e-a05f9a70121a.jpg',0),(26,7,'/home/rfiglus/app/app/storage/tour_images/warszawa_plac_zamkowy_1170:07b47f3b-db72-47e3-a417-c88803cb7695.jpg','warszawa_plac_zamkowy_1170:07b47f3b-db72-47e3-a417-c88803cb7695.jpg',0),(27,7,'/home/rfiglus/app/app/storage/tour_images/indeks:581e6b83-9c24-4937-8bb6-50c9125616b7.jpg','indeks:581e6b83-9c24-4937-8bb6-50c9125616b7.jpg',0),(28,7,'/home/rfiglus/app/app/storage/tour_images/kamil-gliwinski-xcPw1-5OHTk-unsplash-800x450:0d4191d8-0d5d-458e-8676-d7cf474eba91.jpg','kamil-gliwinski-xcPw1-5OHTk-unsplash-800x450:0d4191d8-0d5d-458e-8676-d7cf474eba91.jpg',0),(29,8,'/home/rfiglus/app/app/storage/tour_images/15:f6472030-98af-4519-a7b8-32937c298e45.jpg','15:f6472030-98af-4519-a7b8-32937c298e45.jpg',1),(30,8,'/home/rfiglus/app/app/storage/tour_images/7:e708ee24-df35-4b76-a4b5-b064c7664c97.jpg','7:e708ee24-df35-4b76-a4b5-b064c7664c97.jpg',0),(31,8,'/home/rfiglus/app/app/storage/tour_images/10:7881569b-b449-4296-961e-37a40e2e7bb4.jpg','10:7881569b-b449-4296-961e-37a40e2e7bb4.jpg',0),(32,8,'/home/rfiglus/app/app/storage/tour_images/11:6473025c-62de-44a3-9426-0c9ae97d9b76.jpg','11:6473025c-62de-44a3-9426-0c9ae97d9b76.jpg',0),(33,8,'/home/rfiglus/app/app/storage/tour_images/14:1e62cf61-66da-4a72-89fb-8189d31b6e5d.jpg','14:1e62cf61-66da-4a72-89fb-8189d31b6e5d.jpg',0),(34,8,'/home/rfiglus/app/app/storage/tour_images/15:5adb9c11-899f-4b40-81ab-1d6f1d062a0b.jpg','15:5adb9c11-899f-4b40-81ab-1d6f1d062a0b.jpg',0),(35,8,'/home/rfiglus/app/app/storage/tour_images/17:db4266d1-43d1-420a-a1d1-68366bb90229.jpg','17:db4266d1-43d1-420a-a1d1-68366bb90229.jpg',0),(36,9,'/home/rfiglus/app/app/storage/tour_images/14:4b4ff3db-984a-4727-b352-f438ad08920a.jpg','14:4b4ff3db-984a-4727-b352-f438ad08920a.jpg',1),(37,9,'/home/rfiglus/app/app/storage/tour_images/7:dc28e218-8ae0-4594-a979-9c8c2a0ebed2.jpg','7:dc28e218-8ae0-4594-a979-9c8c2a0ebed2.jpg',0),(38,9,'/home/rfiglus/app/app/storage/tour_images/10:922d452a-49a0-4779-a00d-0947d68782d5.jpg','10:922d452a-49a0-4779-a00d-0947d68782d5.jpg',0),(39,9,'/home/rfiglus/app/app/storage/tour_images/11:22f79c03-3e91-47b8-8e47-e43532cf286c.jpg','11:22f79c03-3e91-47b8-8e47-e43532cf286c.jpg',0),(40,9,'/home/rfiglus/app/app/storage/tour_images/14:9ec18708-fa0f-4dee-8f5d-f930975dbab7.jpg','14:9ec18708-fa0f-4dee-8f5d-f930975dbab7.jpg',0),(41,9,'/home/rfiglus/app/app/storage/tour_images/15:ed2d2626-fad7-45e9-ba34-2f6450abdaa0.jpg','15:ed2d2626-fad7-45e9-ba34-2f6450abdaa0.jpg',0),(42,9,'/home/rfiglus/app/app/storage/tour_images/17:06ba067c-2a10-4972-bdff-0c3f5c8d7be0.jpg','17:06ba067c-2a10-4972-bdff-0c3f5c8d7be0.jpg',0),(43,9,'/home/rfiglus/app/app/storage/tour_images/6:929c9235-7b08-4427-9dec-238fc5bdb1e9.jpg','6:929c9235-7b08-4427-9dec-238fc5bdb1e9.jpg',0),(44,9,'/home/rfiglus/app/app/storage/tour_images/16:450e93e2-6904-466c-a850-a8d7c74c5114.jpg','16:450e93e2-6904-466c-a850-a8d7c74c5114.jpg',0),(45,10,'/home/rfiglus/app/app/storage/tour_images/15:a8afed54-4cdd-4dad-908c-5e3ef74c10bb.jpg','15:a8afed54-4cdd-4dad-908c-5e3ef74c10bb.jpg',1),(46,10,'/home/rfiglus/app/app/storage/tour_images/11:73117627-0fa9-4820-8103-bc73476ce5d8.jpg','11:73117627-0fa9-4820-8103-bc73476ce5d8.jpg',0),(47,10,'/home/rfiglus/app/app/storage/tour_images/14:ccc30024-988e-4f15-9a62-a9f2a86d37eb.jpg','14:ccc30024-988e-4f15-9a62-a9f2a86d37eb.jpg',0),(48,10,'/home/rfiglus/app/app/storage/tour_images/17:31620328-82b2-457a-b928-3effeab0df2a.jpg','17:31620328-82b2-457a-b928-3effeab0df2a.jpg',0),(49,10,'/home/rfiglus/app/app/storage/tour_images/6:1da471cd-a1ff-4d84-ab8c-56001321b70e.jpg','6:1da471cd-a1ff-4d84-ab8c-56001321b70e.jpg',0),(50,10,'/home/rfiglus/app/app/storage/tour_images/16:64c1254a-46be-4e38-9073-ca87e00ce01b.jpg','16:64c1254a-46be-4e38-9073-ca87e00ce01b.jpg',0),(51,11,'/home/rfiglus/app/app/storage/tour_images/7:ef4f7c66-9879-4d8f-ac32-36774ce9c4f3.jpg','7:ef4f7c66-9879-4d8f-ac32-36774ce9c4f3.jpg',1),(52,12,'/home/rfiglus/app/app/storage/tour_images/12:86e967db-372a-48c8-8013-b03c8a86b16e.jpg','12:86e967db-372a-48c8-8013-b03c8a86b16e.jpg',1),(53,12,'/home/rfiglus/app/app/storage/tour_images/6:d45b78fc-ce75-4fa3-a8e5-435992c06ae9.jpg','6:d45b78fc-ce75-4fa3-a8e5-435992c06ae9.jpg',0),(54,12,'/home/rfiglus/app/app/storage/tour_images/11:a36d55e0-c9bc-4a1c-be73-9a22f77b0e08.jpg','11:a36d55e0-c9bc-4a1c-be73-9a22f77b0e08.jpg',0),(55,12,'/home/rfiglus/app/app/storage/tour_images/15:54bb8ac2-f121-49ce-ae35-6776faa56462.jpg','15:54bb8ac2-f121-49ce-ae35-6776faa56462.jpg',0),(56,13,'/home/rfiglus/app/app/storage/tour_images/ind2eks:546f3b12-9725-4df7-b530-6481971fa56d.jpg','ind2eks:546f3b12-9725-4df7-b530-6481971fa56d.jpg',1),(57,14,'/home/rfiglus/app/app/storage/tour_images/inde1ks:20b03f9b-4139-4783-ac0e-414a91d78c02.jpg','inde1ks:20b03f9b-4139-4783-ac0e-414a91d78c02.jpg',1),(58,15,'/home/rfiglus/app/app/storage/tour_images/rybi-rynek-w-bydgoszczy:bd948b45-895e-49cf-bb00-5008ee83fcd5.jpg','rybi-rynek-w-bydgoszczy:bd948b45-895e-49cf-bb00-5008ee83fcd5.jpg',1),(59,15,'/home/rfiglus/app/app/storage/tour_images/inde1ks:b6c12966-7abd-40e7-84b1-4363f37486e6.jpg','inde1ks:b6c12966-7abd-40e7-84b1-4363f37486e6.jpg',0),(60,15,'/home/rfiglus/app/app/storage/tour_images/225372317_372593434468562_7851255089227605601_n:b68d40c1-6a8d-4a7a-8bbe-0919e62ab514.jpg','225372317_372593434468562_7851255089227605601_n:b68d40c1-6a8d-4a7a-8bbe-0919e62ab514.jpg',0),(61,15,'/home/rfiglus/app/app/storage/tour_images/224068202_164627515763757_8586628736333246010_n:7bedb7c9-5479-4244-9a10-64867916677f.jpg','224068202_164627515763757_8586628736333246010_n:7bedb7c9-5479-4244-9a10-64867916677f.jpg',0),(62,16,'/home/rfiglus/app/app/storage/tour_images/indeksss:de8fa363-9f8f-49c6-b7a8-2a0c9ff20f76.jpg','indeksss:de8fa363-9f8f-49c6-b7a8-2a0c9ff20f76.jpg',1),(63,17,'/home/rfiglus/app/app/storage/tour_images/indekws:b80b8339-6b8f-47b0-afd3-7241a750691e.jpg','indekws:b80b8339-6b8f-47b0-afd3-7241a750691e.jpg',1),(64,17,'/home/rfiglus/app/app/storage/tour_images/inde1ks:27142295-0657-4983-b061-ad56588cfb72.jpg','inde1ks:27142295-0657-4983-b061-ad56588cfb72.jpg',0),(65,17,'/home/rfiglus/app/app/storage/tour_images/225372317_372593434468562_7851255089227605601_n:634391b9-7e8c-4a31-8168-1181b98b4900.jpg','225372317_372593434468562_7851255089227605601_n:634391b9-7e8c-4a31-8168-1181b98b4900.jpg',0),(66,17,'/home/rfiglus/app/app/storage/tour_images/224068202_164627515763757_8586628736333246010_n:333bf7f5-f49b-44ea-bc44-9ff8ad127d5b.jpg','224068202_164627515763757_8586628736333246010_n:333bf7f5-f49b-44ea-bc44-9ff8ad127d5b.jpg',0),(67,17,'/home/rfiglus/app/app/storage/tour_images/223339176_304592101455733_718229845246925613_n:6e02683c-f952-4eb2-ba26-dd1cddb86f0a.jpg','223339176_304592101455733_718229845246925613_n:6e02683c-f952-4eb2-ba26-dd1cddb86f0a.jpg',0),(68,18,'/home/rfiglus/app/app/storage/tour_images/warszawa_plac_zamkowy_1170:db05fdac-e708-402b-9082-012a56d2d8f9.jpg','warszawa_plac_zamkowy_1170:db05fdac-e708-402b-9082-012a56d2d8f9.jpg',1),(69,19,'/home/rfiglus/app/app/storage/tour_images/5:78637c2d-2cfe-4c05-b95b-49377791db66.jpg','5:78637c2d-2cfe-4c05-b95b-49377791db66.jpg',1),(70,20,'/home/rfiglus/app/app/storage/tour_images/8:08c84552-4acf-4670-a4d8-a877c520b73c.jpg','8:08c84552-4acf-4670-a4d8-a877c520b73c.jpg',1),(71,21,'/home/rfiglus/app/app/storage/tour_images/14:9700b7b1-f87e-4c0f-a54d-3126719887f6.jpg','14:9700b7b1-f87e-4c0f-a54d-3126719887f6.jpg',1),(73,23,'/home/rfiglus/app/app/storage/tour_images/7:fa3305fe-5730-45f9-a7f4-c5a43d4912c8.jpg','7:fa3305fe-5730-45f9-a7f4-c5a43d4912c8.jpg',1),(74,23,'/home/rfiglus/app/app/storage/tour_images/6:51b4ed31-d79b-4d69-bfdc-e1f2e3e16d72.jpg','6:51b4ed31-d79b-4d69-bfdc-e1f2e3e16d72.jpg',0),(75,23,'/home/rfiglus/app/app/storage/tour_images/9:d2c5bce8-5bfa-45cc-b998-d31cb014b8a2.jpg','9:d2c5bce8-5bfa-45cc-b998-d31cb014b8a2.jpg',0),(76,23,'/home/rfiglus/app/app/storage/tour_images/15:8c44f09f-aee5-4268-8a72-c1f9849ede51.jpg','15:8c44f09f-aee5-4268-8a72-c1f9849ede51.jpg',0),(77,24,'/home/rfiglus/app/app/storage/tour_images/7:48947a92-4939-4154-ad13-3df2852b3e36.jpg','7:48947a92-4939-4154-ad13-3df2852b3e36.jpg',1),(78,25,'/home/rfiglus/app/app/storage/tour_images/15:1996b5e2-cb95-4046-a3ee-35cf18076950.jpg','15:1996b5e2-cb95-4046-a3ee-35cf18076950.jpg',1),(79,26,'/home/rfiglus/app/app/storage/tour_images/15:6c12ad59-ea6a-4cee-9724-5c5825454cda.jpg','15:6c12ad59-ea6a-4cee-9724-5c5825454cda.jpg',1),(80,27,'/home/rfiglus/app/app/storage/tour_images/6:262dee5f-9d2c-48da-b1b4-7d767af9f5df.jpg','6:262dee5f-9d2c-48da-b1b4-7d767af9f5df.jpg',1),(81,28,'/home/rfiglus/app/app/storage/tour_images/8:1de576bb-6dd0-401a-8cc6-28d46e642d77.jpg','8:1de576bb-6dd0-401a-8cc6-28d46e642d77.jpg',1);
/*!40000 ALTER TABLE `tour_images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tour_important_info`
--

DROP TABLE IF EXISTS `tour_important_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tour_important_info` (
  `id` int NOT NULL AUTO_INCREMENT,
  `tour_id` int NOT NULL,
  `description` text NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `tour_id` (`tour_id`),
  CONSTRAINT `tour_important_info_ibfk_1` FOREIGN KEY (`tour_id`) REFERENCES `tours` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tour_important_info`
--

LOCK TABLES `tour_important_info` WRITE;
/*!40000 ALTER TABLE `tour_important_info` DISABLE KEYS */;
INSERT INTO `tour_important_info` VALUES (1,1,'eum iure reprehenderit'),(2,1,'voluptatem accusantium '),(3,1,'doloremque laudantium, totam rem '),(4,1,'aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto '),(5,2,'ex ea commodo consequat'),(6,2,'sunt in culpa qui officia deserunt mollit'),(7,2,'sit voluptatem accusantium'),(8,3,' quis nostrud exercitation ullamco labori'),(9,3,'m quia dolor sit amet, consectetur,'),(10,3,'on numquam eius modi tempora'),(11,8,'deleniti atque corrupti quos dolores et quas molestias '),(12,8,'optio cumque nihil impedit'),(13,8,'id quod maxime placeat facere possimus, omnis voluptas assumenda est'),(14,8,'hic tenetur a sapiente delectus'),(15,9,' aut reiciendis voluptatibus maiore'),(16,9,'eligendi optio cumque nihil impedit '),(17,11,'cum soluta nobis'),(18,11,'minus id quod maxime placeat facere possimus'),(19,12,'numquam eius modi tempora incidunt ut'),(20,12,' labore et dolore magnam aliquam quaerat voluptatem'),(21,14,'licabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione '),(22,14,'voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius'),(23,17,'At vero eos et accusamus et iusto '),(24,17,'odio dignissimos ducimus qui blanditiis '),(25,17,'praesentium voluptatum deleniti atque ');
/*!40000 ALTER TABLE `tour_important_info` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tour_plan_points`
--

DROP TABLE IF EXISTS `tour_plan_points`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tour_plan_points` (
  `id` int NOT NULL AUTO_INCREMENT,
  `tour_id` int NOT NULL,
  `number` int NOT NULL,
  `description` varchar(1024) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `tour_id` (`tour_id`),
  CONSTRAINT `tour_plan_points_ibfk_1` FOREIGN KEY (`tour_id`) REFERENCES `tours` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=109 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tour_plan_points`
--

LOCK TABLES `tour_plan_points` WRITE;
/*!40000 ALTER TABLE `tour_plan_points` DISABLE KEYS */;
INSERT INTO `tour_plan_points` VALUES (1,1,1,'qui dolorem ipsum quia dolor sit amet'),(2,1,2,'Ut enim ad minima veniam'),(3,1,3,'quis nostrum exercitationem ullam corporis'),(4,2,1,'a sapiente delectus'),(5,2,2,'t aut reiciendis voluptatibus maiores'),(6,2,3,'alias consequatur aut perferendis'),(7,2,4,'doloribus asperiores repellat'),(8,3,1,'est, qui dolorem ipsum quia dolor sit amet, consectetur, '),(9,3,2,'dipisci velit, sed quia non numquam '),(10,3,3,'ius modi tempora incidunt ut labore '),(11,4,1,'fugiat quo voluptas nulla pariatur'),(12,4,2,'enim ad minima veniam'),(13,4,3,'voluptate velit esse quam'),(14,4,4,'omnis dolor repellendus'),(15,5,1,'At vero eos et accusamus'),(16,5,2,'et iusto odio dignissimos ducimus '),(17,5,3,'qui blanditiis praesentium voluptatum'),(18,5,4,'deleniti atque corrupti quos dolores '),(19,6,1,'Sed ut perspiciatis unde '),(20,6,2,'omnis iste natus error sit voluptatem accusantium '),(21,6,3,'doloremque laudantium, totam rem aperiam, eaque '),(22,6,4,'ipsa quae ab illo inventore veritatis et quasi architecto '),(23,6,5,'beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit '),(24,6,6,'aspernatur aut odit aut fugit, sed quia consequuntur magni '),(25,6,7,'dolores eos qui ratione '),(26,6,8,'voluptatem sequi nesciunt'),(27,6,9,'Neque porro quisquam est, qui dolorem ipsum'),(28,7,1,'similique sunt in culpa '),(29,7,2,'qui officia deserunt mollitia animi'),(30,7,3,'id est laborum et dolorum fuga'),(31,7,4,'arum quidem rerum'),(32,8,1,'At vero eos et accusamus et '),(33,8,2,'iusto odio dignissimos ducimus qui blanditiis '),(34,8,3,'praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias '),(35,8,4,'excepturi sint occaecati um fuga'),(36,8,5,'cupiditate non provident, similique '),(37,8,6,'sunt in culpa qui '),(38,8,7,'officia deserunt mollitia '),(39,9,1,'Nam libero tempore, cum '),(40,9,2,'soluta nobis est eligendi optio cumque nihil impedit '),(41,9,3,'quo minus id quod maxime placeat facere possimus, '),(42,9,4,'omnis voluptas assumenda est, omnis dolor repellendus. '),(43,9,5,'Temporibus autem quibusdam et aut officiis '),(44,10,1,'At vero eos et accusamus et iusto odio'),(45,10,2,'sint occaecati cupiditate non provident'),(46,10,3,'sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga'),(47,10,4,'animi, id est laborum et dolorum fuga'),(48,11,1,'At vero eos et accusamus et '),(49,11,2,'iusto odio dignissimos ducimus qui '),(50,11,3,'blanditiis praesentium voluptatum deleniti atque corrupti quos '),(51,11,4,'dolores et quas molestias excepturi sint occaecati '),(52,11,5,'cupiditate non provident, similique sunt in culpa qui officia '),(53,11,6,'deserunt mollitia animi, id est '),(54,12,1,'Sed ut perspiciatis unde '),(55,12,2,'omnis iste natus error sit '),(56,12,3,'voluptatem accusantium doloremque laudantium'),(57,12,4,'totam rem aperiam, eaque ipsa quae ab illo inventore '),(58,12,5,'veritatis et quasi architecto beatae vitae dicta '),(59,12,6,'sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit'),(60,13,1,'eos et accusamus et iusto'),(61,13,2,'voluptatum deleniti atque corrupti quo'),(62,13,3,'xercitationem ullam corporis susc'),(63,14,1,'Quis autem vel eum iure repr'),(64,14,2,'se quam nihil '),(65,14,3,' mollitia animi,'),(66,15,1,'e truth, the master-builder of human happiness. '),(67,15,2,'ue sunt in culpa qui officia deser'),(68,15,3,'hic tenetur a sapiente delectus, ut aut reiciendis voluptatib'),(69,16,1,'ucimus qui blanditiis praesentium voluptatum deleniti atq'),(70,16,2,'erum facilis est et expedita distinctio'),(71,16,3,'oluptatibus maiores alias consequatur aut '),(72,17,1,'unt explicabo.'),(73,17,2,'sequi nesciunt'),(74,17,3,'incidunt ut labore et '),(75,18,1,'Ut enim ad minima veniam, quis nostrum '),(76,18,2,'exercitationem ullam corporis suscipit laboriosam'),(77,18,3,'nisi ut aliquid ex ea commodi consequatur '),(78,18,4,'Quis autem vel eum iure reprehenderit qui '),(79,18,5,'in ea voluptate velit esse quam nihil molestiae consequatur'),(80,19,1,'sed quia consequuntur magni dolores eos qui ratione '),(81,19,2,'voluptatem sequi nesciunt. Neque porro quisquam est, '),(82,19,3,'qui dolorem ipsum quia dolor sit amet, consectetur, adipisci '),(83,19,4,'velit, sed quia non numquam eius modi tempora incidunt ut labore '),(84,19,5,'et dolore magnam aliquam quaerat voluptatem'),(85,20,1,'At vero eos et accusamus et '),(86,20,2,'iusto odio dignissimos ducimus '),(87,20,3,'qui blanditiis praesentium voluptatum deleniti atque '),(88,20,4,'corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non '),(89,20,5,'provident, similique sunt in culpa qui officia deserunt mollitia animi, id '),(90,21,1,'Temporibus autem '),(91,21,2,'quibusdam et aut officiis debitis '),(92,21,3,'aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae '),(93,21,4,'sint et molestiae non recusandae. Itaque earum rerum hic '),(94,21,5,'tenetur a sapiente delectus, ut aut reiciendis '),(97,23,1,'Purus sit amet luctus venenatis'),(98,23,2,'Quam vulputate dignissim suspendisse in est ante in nibh'),(99,23,3,'Tempor id eu nisl nunc mi. Velit '),(100,23,4,'Maecenas accumsan lacus'),(101,24,1,'test test test '),(102,24,2,'test test test test '),(103,25,1,'test test test test '),(104,25,2,'test '),(105,25,3,'test '),(106,26,1,'test test test '),(107,27,1,'test test test '),(108,28,1,'test ');
/*!40000 ALTER TABLE `tour_plan_points` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tour_price_list`
--

DROP TABLE IF EXISTS `tour_price_list`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tour_price_list` (
  `id` int NOT NULL AUTO_INCREMENT,
  `tour_id` int NOT NULL,
  `is_included` tinyint(1) NOT NULL,
  `description` text NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `tour_id` (`tour_id`),
  CONSTRAINT `tour_price_list_ibfk_1` FOREIGN KEY (`tour_id`) REFERENCES `tours` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=61 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tour_price_list`
--

LOCK TABLES `tour_price_list` WRITE;
/*!40000 ALTER TABLE `tour_price_list` DISABLE KEYS */;
INSERT INTO `tour_price_list` VALUES (1,1,1,'quis nostrum exercitationem ullam corporis'),(2,1,0,'quis nostrum '),(3,1,0,'exercitationem ullam corporis'),(4,1,1,'eum iure reprehenderit'),(5,2,1,'sint et molestiae'),(6,2,1,'qui officia deserunt mollitia '),(7,2,0,'oluptatum deleniti atque'),(8,4,1,'Temporibus autem quibusdam'),(9,4,1,'aliquid ex ea commodi consequatur'),(10,4,0,' est et expedita distinctio'),(11,4,0,'fficia deserunt mollitia'),(12,5,1,'commodi consequatur'),(13,5,1,'qui in ea voluptate'),(14,5,0,'esse quam nihil'),(15,6,1,'Neque porro quisquam est, qui dolorem ipsum'),(16,6,0,'Neque porro quisquam '),(17,6,1,'est, qui dolorem ipsum'),(18,6,0,'dolorem ipsum'),(19,8,1,'animi, id est laborum et dolor'),(20,8,0,'animi, id est '),(21,8,1,'laborum et dolor'),(22,8,1,'praesentium voluptatum '),(23,8,0,'deleniti atque corrupti quos dolores et quas molestias '),(24,9,1,'debitis aut rerum necessitatibus saepe '),(25,9,0,'eveniet ut et '),(26,9,0,'voluptates repudiandae '),(27,9,1,'sint et molestiae non '),(28,9,1,'rerum hic tenetur'),(29,9,0,' a sapiente delectus'),(30,10,1,'animi, id est laborum '),(31,10,0,'et dolorum fuga'),(32,10,1,'harum quidem rerum facilis'),(33,10,1,'libero tempore, cum soluta nobis est'),(34,11,1,'laborum et dolorum fuga'),(35,11,0,'Et harum quidem '),(36,11,0,'rerum facilis est et expedita distinctio'),(37,11,1,'cum soluta nobis est eligendi optio '),(38,11,0,' est eligendi optio '),(39,12,1,'sed quia consequuntur '),(40,12,0,'magni dolores eos qui '),(41,12,1,'ratione voluptatem sequi '),(42,12,1,'Neque porro quisquam est'),(43,12,0,'qui dolorem ipsum quia dolor sit amet'),(44,12,1,'consectetur, adipisci velit, sed quia non '),(45,14,1,'dignissimos ducimus qui blanditiis praesentium volupta'),(46,14,0,'us saepe eveniet ut et volu'),(47,16,1,'et iusto odio dignissimos ducimus qui blanditiis praesentium vo'),(48,16,1,'luptatum deleniti atque c'),(49,16,0,'orrupti quos dolores et quas molestias excepturi sint occaecati cupidita'),(50,17,1,'qui dolorem eum fugiat quo voluptas'),(51,17,1,'nulla pariatur'),(52,17,0,'doloremque laudantium'),(53,17,0,'quia voluptas sit '),(54,18,1,'Et harum quidem rerum facilis '),(55,18,0,'est et expedita distinctio'),(56,18,0,' cum soluta nobis est eligendi '),(57,19,1,'quis nostrum exercitationem'),(58,19,1,'Ut enim ad minima veniam'),(59,23,1,'Maecenas accumsan lacus'),(60,23,0,'Odio facilisis masr');
/*!40000 ALTER TABLE `tour_price_list` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tours`
--

DROP TABLE IF EXISTS `tours`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tours` (
  `id` int NOT NULL AUTO_INCREMENT,
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `header` varchar(255) NOT NULL,
  `description` varchar(1024) NOT NULL,
  `guide_id` int NOT NULL,
  `price` int NOT NULL,
  `person_limit` int NOT NULL,
  `creation_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `start_date` datetime NOT NULL,
  `end_date` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `guide_id` (`guide_id`),
  CONSTRAINT `tours_ibfk_1` FOREIGN KEY (`guide_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tours`
--

LOCK TABLES `tours` WRITE;
/*!40000 ALTER TABLE `tours` DISABLE KEYS */;
INSERT INTO `tours` VALUES (1,1,'Lorem ipsum dolor sit amet, consectetur adipiscing elit','Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores',2,56,23,'2021-08-02 15:47:27','2021-09-16 00:00:00','2021-09-19 00:00:00'),(2,1,'Finibus Bonorum et Malorum','At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.',2,39,4,'2021-08-02 15:59:53','2021-12-06 00:00:00','2021-12-13 00:00:00'),(3,1,'eiusdem rei ergo macte heis','Voluptate velit esse cillum dolore eu fugiat nulla pariatur. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.',1,115,3,'2021-08-02 16:05:28','2021-08-09 00:00:00','2021-08-13 00:00:00'),(4,1,'molestiae consequatur','Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae.',2,80,4,'2021-08-02 16:10:54','2021-08-23 00:00:00','2021-08-28 00:00:00'),(5,1,'Quis autem vel eum iure reprehenderit','Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur.',2,47,5,'2021-08-02 16:14:28','2021-09-06 00:00:00','2021-09-09 00:00:00'),(6,1,'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam','Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum',2,561,45,'2021-08-02 16:15:29','2021-08-19 00:00:00','2021-08-29 00:00:00'),(7,1,'Ut enim ad minima veniam','Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat',1,205,6,'2021-08-02 16:17:01','2021-09-14 00:00:00','2021-09-17 00:00:00'),(8,1,'Ut enim ad minima veniam, quis nostrum','At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga',1,45,31,'2021-08-02 16:17:36','2021-10-04 00:00:00','2021-10-09 00:00:00'),(9,1,'At vero eos et accusamus et iusto odio dignissimos','Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores.',2,34,155,'2021-08-02 16:22:08','2021-08-23 00:00:00','2021-08-27 00:00:00'),(10,1,'At vero eos et accusamus et iusto odio dignissimo','At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis',2,654,36,'2021-08-02 16:30:53','2021-09-20 00:00:00','2021-09-23 00:00:00'),(11,1,'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas','At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo.',1,34,56,'2021-08-02 16:36:38','2021-11-06 00:00:00','2021-11-07 00:00:00'),(12,1,'Temporibus autem quibusdam','Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.',1,823,34,'2021-08-02 16:50:30','2021-08-09 00:00:00','2021-08-14 00:00:00'),(13,1,'occaecati cupiditate non provident, similiqu','epturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.\"',1,46,3,'2021-08-02 16:51:44','2021-09-14 00:00:00','2021-09-20 00:00:00'),(14,1,'quae ab illo inventore veritatis et quasi ','oluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exerci',4,666,5,'2021-08-02 16:53:24','2021-08-03 00:00:00','2021-08-08 00:00:00'),(15,1,'m iure reprehenderit qui in','At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facer',4,37,10,'2021-08-02 16:54:50','2021-08-16 00:00:00','2021-08-19 00:00:00'),(16,1,'obtain some advantage from it','Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.',3,33,7,'2021-08-02 16:56:41','2021-08-30 00:00:00','2021-09-02 00:00:00'),(17,1,' iste natus error sit voluptatem accusantium','sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur',1,23,6,'2021-08-02 16:59:09','2021-08-06 00:00:00','2021-08-08 00:00:00'),(18,1,'alias consequatur aut perferendis doloribus','fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numqa',3,112,9,'2021-08-02 17:08:21','2021-08-06 00:00:00','2021-08-10 00:00:00'),(19,1,'Quis autem vel eum iure reprehenderit','Sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem',4,256,15,'2021-08-02 21:34:35','2021-11-08 00:00:00','2021-11-11 00:00:00'),(20,1,'Sed ut perspiciatis unde omnis iste natus error','At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit',1,980,31,'2021-08-02 21:47:03','2021-08-23 00:00:00','2021-08-29 00:00:00'),(21,1,'At vero eos et accusamus et iusto','Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat',3,68,15,'2021-08-02 21:51:00','2021-08-09 00:00:00','2021-08-15 00:00:00'),(23,1,'Purus sit amet luctus venenatis','Mi ipsum faucibus vitae aliquet nec ullamcorper. Dolor morbi non arcu risus quis. Integer quis auctor elit sed vulputate mi. Non nisi est sit amet. Dui sapien eget mi proin. Euismod elementum nisi quis eleifend. Amet mauris commodo quis imperdiet massa.',4,789,56,'2021-08-02 22:01:48','2021-08-11 00:00:00','2021-08-22 00:00:00'),(24,1,'test test test test ','test test test test ',3,123,123,'2021-08-02 22:37:03','2021-08-11 00:00:00','2021-08-20 00:00:00'),(25,1,'test test test ','test test test ',4,23,1,'2021-08-02 22:39:18','2021-08-17 00:00:00','2021-08-28 00:00:00'),(26,1,'test ','test test test test ',3,23,32,'2021-08-02 22:52:38','2021-08-09 00:00:00','2021-08-14 00:00:00'),(27,1,'test ','test ',4,2,2,'2021-08-02 22:53:46','2021-08-16 00:00:00','2021-08-20 00:00:00'),(28,1,'test ','test ',1,23,23,'2021-08-02 22:54:06','2021-08-16 00:00:00','2021-08-21 00:00:00');
/*!40000 ALTER TABLE `tours` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `f_name` varchar(255) NOT NULL,
  `l_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(512) NOT NULL,
  `phone_number` char(32) DEFAULT NULL,
  `is_guide` tinyint(1) NOT NULL DEFAULT '0',
  `is_confirmed` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Andrew','Golara','andrewg@gmail.com','pbkdf2:sha256:150000$IDGI0NG6$6f8dd82605a62df6d40b2cae7f6bf276f24a47ed7a502559745dae3586e7225d','568948473',1,0),(2,'Thomas','Booba','thomb@gmail.com','pbkdf2:sha256:150000$IDGI0NG6$6f8dd82605a62df6d40b2cae7f6bf276f24a47ed7a502559745dae3586e7225d','5685648473',1,0),(3,'Lorence','Lawg','awrill@gmail.com','pbkdf2:sha256:150000$IDGI0NG6$6f8dd82605a62df6d40b2cae7f6bf276f24a47ed7a502559745dae3586e7225d','128948473',1,0),(4,'Penny','Gloria','pennyg@gmail.com','pbkdf2:sha256:150000$IDGI0NG6$6f8dd82605a62df6d40b2cae7f6bf276f24a47ed7a502559745dae3586e7225d','538948473',1,0);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-08-03 22:39:08
