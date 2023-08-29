/*
SQLyog Ultimate v13.1.1 (64 bit)
MySQL - 10.4.22-MariaDB : Database - bookshelf
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`bookshelf` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;

USE `bookshelf`;

/*Table structure for table `books` */

DROP TABLE IF EXISTS `books`;

CREATE TABLE `books` (
  `id` char(8) NOT NULL,
  `title` varchar(32) DEFAULT NULL,
  `year` int(11) DEFAULT NULL,
  `author` varchar(32) DEFAULT NULL,
  `summary` text DEFAULT NULL,
  `publisher` varchar(32) DEFAULT NULL,
  `pageCount` int(11) DEFAULT NULL,
  `readPage` int(11) DEFAULT NULL,
  `finished` tinyint(1) DEFAULT NULL,
  `reading` tinyint(1) DEFAULT NULL,
  `insertedAt` varchar(32) DEFAULT NULL,
  `updatedAt` varchar(32) DEFAULT NULL,
  `userId` char(8) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_usersBooks` (`userId`),
  CONSTRAINT `FK_usersBooks` FOREIGN KEY (`userId`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/*Data for the table `books` */

insert  into `books`(`id`,`title`,`year`,`author`,`summary`,`publisher`,`pageCount`,`readPage`,`finished`,`reading`,`insertedAt`,`updatedAt`,`userId`) values 
('85cog1SO','Kodok Loncat Tak begitu jauh',2022,'Saostiram','Rada ngawur','Hayolari',78,56,0,1,'28/8/2023, 20.18.29','28/8/2023, 20.18.29','qER41--X'),
('D4JlFbRg','Lama Lama Lawak',2022,'Sobirin','Aneh aneh tapi keanehan','Hayolari',102,45,0,1,'28/8/2023, 19.48.46','28/8/2023, 19.48.46','qER41--X'),
('JsvYlG9T','Harian Yono',2002,'Yonoo','Ceritanya Yono lagi nyari kerjaan','Regamedia',56,12,0,1,'29/8/2023, 18.04.01','29/8/2023, 18.04.01','qER41--X'),
('kI4fyKEM','Harian Yono',2002,'Yonoo','Ceritanya Yono lagi nyari kerjaan','Regamedia',56,12,0,1,'29/8/2023, 18.02.23','29/8/2023, 18.02.23','qER41--X'),
('neurcjlL','Lama Lama Lawak',2022,'Sobirin','Aneh aneh tapi keanehan','Hayolari',102,45,0,1,'28/8/2023, 19.09.04','28/8/2023, 19.09.04','qER41--X');

/*Table structure for table `users` */

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` char(8) NOT NULL,
  `username` varchar(32) DEFAULT NULL,
  `email` varchar(32) DEFAULT NULL,
  `password` text DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/*Data for the table `users` */

insert  into `users`(`id`,`username`,`email`,`password`) values 
('9VHJ0HSg','Juanto','Juan@gmail.com','$2b$10$0v23CjBTA8W8mgwq8kq3LO42/2pBXc4oDwgnCF6RcKRvXvoFEUsx6'),
('kC6jUvyn','satoru gojo','satoru@gmail.com','$2b$10$auD1YZCXSBz26YTzOUP46uaYMmanRnRyFFFUcvfabMZiGsRuH9eu2'),
('qER41--X','Anton234','antonio@gmail.com','$2a$10$n0Frm6JbLS4/jbGmAS31LuhaRRQLtFfs/bpBeBAADEWIiMwkr8mKW'),
('vcODctqp','kevinATE','riyan@gmail.com','$2b$10$TbSvusoBsexWfDG/oi5U7uBQtRFBTTnsmOpb2fF/7rlTc4/2kiYl2');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
