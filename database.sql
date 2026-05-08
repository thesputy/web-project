SET FOREIGN_KEY_CHECKS=0;
SET NAMES utf8mb4;
SET CHARACTER SET utf8mb4;

DROP TABLE IF EXISTS `comments`;
DROP TABLE IF EXISTS `posts`;
DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(45) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `img` varchar(255) DEFAULT NULL,
  `isAdmin` tinyint(1) DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4;

INSERT INTO `users` VALUES (2,'asdas','asda','asd',NULL,0),(3,'rtsts','ststs','tststs',NULL,0),(7,'admin','admin@gde.hu','$2b$10$m9Dhxixb4rNUaVCwDZPmV.t/5J7Nlnd3j7//RxTG2r4mUI5sFqNDq',NULL,1),(8,'dad','ds@ds.com','$2b$10$5cF0k5DMDQdz0yFJRdLbBufHx3jG8AD41NUFcg86ECLF.mbppkyRm',NULL,0);

CREATE TABLE `posts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `desc` varchar(1000) NOT NULL,
  `img` varchar(255) NOT NULL,
  `date` datetime NOT NULL,
  `uid` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `uid_idx` (`uid`),
  CONSTRAINT `uid` FOREIGN KEY (`uid`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;

INSERT INTO `posts` VALUES (1,'Az első poszt','Ez az első poszt ami megjelenik az oldalon','https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg','2026-05-07 21:57:28',2),(2,'A második poszt','Az első poszt nagy sikere után itt volt az idő egy második poszttal is megörvendeztetni a kedves oldal látogatóit.','https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg','2026-05-07 22:01:59',3);

CREATE TABLE `comments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `postId` int(11) NOT NULL,
  `uid` int(11) NOT NULL,
  `desc` text NOT NULL,
  `date` datetime DEFAULT current_timestamp(),
  `edited` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;

INSERT INTO `comments` VALUES (4,1,2,'panzerkampfwagen..asd asdasdas','2026-05-08 11:23:41','2026-05-08 11:56:50');

SET FOREIGN_KEY_CHECKS=1;