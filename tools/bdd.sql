-- --------------------------------------------------------
-- Hôte :                        127.0.0.1
-- Version du serveur:           5.7.11 - MySQL Community Server (GPL)
-- SE du serveur:                Win32
-- HeidiSQL Version:             9.5.0.5328
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Listage de la structure de la base pour webprojectril
DROP DATABASE IF EXISTS `webprojectril`;
CREATE DATABASE IF NOT EXISTS `webprojectril` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;
USE `webprojectril`;

-- Listage de la structure de la table webprojectril. agence
DROP TABLE IF EXISTS `agence`;
CREATE TABLE IF NOT EXISTS `agence` (
  `AGENCE_ID` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `AGENCE_NOM` varchar(200) DEFAULT NULL,
  `AGENCE_NUM_ADRESSE` varchar(50) DEFAULT NULL,
  `AGENCE_NOM_ADRESSE` varchar(200) DEFAULT NULL,
  `AGENCE_MAIL` varchar(200) DEFAULT NULL,
  `AGENCE_TEL` varchar(200) DEFAULT NULL,
  `AGENCE_FAX` varchar(200) DEFAULT NULL,
  `AGENCE_ID_FICHIER` int(11) unsigned DEFAULT NULL,
  PRIMARY KEY (`AGENCE_ID`),
  KEY `FK_fichier_agence` (`AGENCE_ID_FICHIER`),
  CONSTRAINT `FK_fichier_agence` FOREIGN KEY (`AGENCE_ID_FICHIER`) REFERENCES `fichier` (`FICHIER_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;

-- Les données exportées n'étaient pas sélectionnées.
-- Listage de la structure de la table webprojectril. fichier
DROP TABLE IF EXISTS `fichier`;
CREATE TABLE IF NOT EXISTS `fichier` (
  `FICHIER_ID` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `FICHIER_EXTENSION` varchar(50) DEFAULT NULL,
  `FICHIER_URL` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`FICHIER_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Les données exportées n'étaient pas sélectionnées.
-- Listage de la structure de la table webprojectril. historique
DROP TABLE IF EXISTS `historique`;
CREATE TABLE IF NOT EXISTS `historique` (
  `HISTO_ID_TYPE_HISTO` int(11) unsigned NOT NULL,
  `HISTO_DATE` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `HISTO_UTILISATEUR_ID` int(11) unsigned DEFAULT NULL,
  `HISTO_VEHICULE_ID` int(11) unsigned DEFAULT NULL,
  `HISTO_AGENCE_ID` int(11) unsigned DEFAULT NULL,
  `HISTO_TICKET_ID` int(11) unsigned DEFAULT NULL,
  PRIMARY KEY (`HISTO_ID_TYPE_HISTO`),
  KEY `FK_histo_vehicule` (`HISTO_VEHICULE_ID`),
  KEY `FK_histo_utilisateur` (`HISTO_UTILISATEUR_ID`),
  KEY `FK_histo_agence` (`HISTO_AGENCE_ID`),
  KEY `FK_histo_ticket` (`HISTO_TICKET_ID`),
  CONSTRAINT `FK_histo_agence` FOREIGN KEY (`HISTO_AGENCE_ID`) REFERENCES `agence` (`AGENCE_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_histo_ticket` FOREIGN KEY (`HISTO_TICKET_ID`) REFERENCES `ticket` (`TICKET_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_histo_type_histo` FOREIGN KEY (`HISTO_ID_TYPE_HISTO`) REFERENCES `type_histo` (`TYPE_HISTO_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_histo_utilisateur` FOREIGN KEY (`HISTO_UTILISATEUR_ID`) REFERENCES `utilisateur` (`UTILISATEUR_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_histo_vehicule` FOREIGN KEY (`HISTO_VEHICULE_ID`) REFERENCES `vehicule` (`VEHICULE_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Les données exportées n'étaient pas sélectionnées.
-- Listage de la structure de la table webprojectril. info
DROP TABLE IF EXISTS `info`;
CREATE TABLE IF NOT EXISTS `info` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Les données exportées n'étaient pas sélectionnées.
-- Listage de la structure de la table webprojectril. permission
DROP TABLE IF EXISTS `permission`;
CREATE TABLE IF NOT EXISTS `permission` (
  `PERMISSION_ID` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `PERMISSION_LIB` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`PERMISSION_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Les données exportées n'étaient pas sélectionnées.
-- Listage de la structure de la table webprojectril. statut
DROP TABLE IF EXISTS `statut`;
CREATE TABLE IF NOT EXISTS `statut` (
  `STATUT_ID` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `STATUT_LIB` varchar(200) DEFAULT NULL,
  `STATUT_DESCRIPTION` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`STATUT_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Les données exportées n'étaient pas sélectionnées.
-- Listage de la structure de la table webprojectril. ticket
DROP TABLE IF EXISTS `ticket`;
CREATE TABLE IF NOT EXISTS `ticket` (
  `TICKET_ID` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `TICKET_OBJET` varchar(200) DEFAULT NULL,
  `TICKET_TXT` text,
  `TICKET_ID_UTILISATEUR` int(11) unsigned DEFAULT NULL,
  `TICKET_ID_VEHICULE` int(11) unsigned DEFAULT NULL,
  PRIMARY KEY (`TICKET_ID`),
  KEY `FK_ticket_utilisateur` (`TICKET_ID_UTILISATEUR`),
  KEY `FK_ticket_vehicule` (`TICKET_ID_VEHICULE`),
  CONSTRAINT `FK_ticket_utilisateur` FOREIGN KEY (`TICKET_ID_UTILISATEUR`) REFERENCES `utilisateur` (`UTILISATEUR_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_ticket_vehicule` FOREIGN KEY (`TICKET_ID_VEHICULE`) REFERENCES `vehicule` (`VEHICULE_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Les données exportées n'étaient pas sélectionnées.
-- Listage de la structure de la table webprojectril. type_histo
DROP TABLE IF EXISTS `type_histo`;
CREATE TABLE IF NOT EXISTS `type_histo` (
  `TYPE_HISTO_ID` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `TYPE_HISTO_LIB` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`TYPE_HISTO_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Les données exportées n'étaient pas sélectionnées.
-- Listage de la structure de la table webprojectril. utilisateur
DROP TABLE IF EXISTS `utilisateur`;
CREATE TABLE IF NOT EXISTS `utilisateur` (
  `UTILISATEUR_ID` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `UTILISATEUR_IDENTIFIANT` varchar(50) DEFAULT NULL,
  `UTILISATEUR_NOM` varchar(200) DEFAULT NULL,
  `UTILISATEUR_PRENOM` varchar(200) DEFAULT NULL,
  `UTILISATEUR_TEL` varchar(50) DEFAULT NULL,
  `UTILISATEUR_FAX` varchar(50) DEFAULT NULL,
  `UTILISATEUR_MOBILE` varchar(50) DEFAULT NULL,
  `UTILISATEUR_ID_AGENCE` int(11) unsigned DEFAULT NULL,
  `UTILISATEUR_PWD` varchar(250) DEFAULT NULL,
  PRIMARY KEY (`UTILISATEUR_ID`),
  KEY `FK_utilisateur_agence` (`UTILISATEUR_ID_AGENCE`),
  KEY `UTILISATEUR_IDENTIFIANT` (`UTILISATEUR_IDENTIFIANT`),
  CONSTRAINT `FK_utilisateur_agence` FOREIGN KEY (`UTILISATEUR_ID_AGENCE`) REFERENCES `agence` (`AGENCE_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;

-- Les données exportées n'étaient pas sélectionnées.
-- Listage de la structure de la table webprojectril. utilisateur_has_perm
DROP TABLE IF EXISTS `utilisateur_has_perm`;
CREATE TABLE IF NOT EXISTS `utilisateur_has_perm` (
  `UP_PERM_ID` int(11) unsigned NOT NULL,
  `UP_UTILISATEUR_ID` int(11) unsigned NOT NULL,
  PRIMARY KEY (`UP_PERM_ID`,`UP_UTILISATEUR_ID`),
  KEY `FK_utilisateur_has_perm_utilisateur` (`UP_UTILISATEUR_ID`),
  CONSTRAINT `FK_utilisateur_has_perm_permission` FOREIGN KEY (`UP_PERM_ID`) REFERENCES `permission` (`PERMISSION_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_utilisateur_has_perm_utilisateur` FOREIGN KEY (`UP_UTILISATEUR_ID`) REFERENCES `utilisateur` (`UTILISATEUR_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Les données exportées n'étaient pas sélectionnées.
-- Listage de la structure de la table webprojectril. vehicule
DROP TABLE IF EXISTS `vehicule`;
CREATE TABLE IF NOT EXISTS `vehicule` (
  `VEHICULE_ID` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `VEHICULE_DATE_FABRICATION` date DEFAULT NULL,
  `VEHICULE_HAUTEUR` int(11) unsigned DEFAULT NULL,
  `VEHICULE_LARGEUR` int(11) unsigned DEFAULT NULL,
  `VEHICULE_LONGUEUR` int(11) unsigned DEFAULT NULL,
  `VEHICULE_POIDS` int(11) unsigned DEFAULT NULL,
  `VEHICULE_PUISSANCE` varchar(50) DEFAULT NULL,
  `VEHICULE_ACTIF` tinyint(1) unsigned DEFAULT NULL,
  `VEHICULE_ID_AGENCE` int(11) unsigned DEFAULT NULL,
  `VEHICULE_ID_STATUT` int(11) unsigned DEFAULT NULL,
  `VEHICULE_MARQUE` varchar(50) NOT NULL,
  `VEHICULE_MODELE` varchar(50) NOT NULL,
  PRIMARY KEY (`VEHICULE_ID`),
  KEY `FK_vehicule_agence` (`VEHICULE_ID_AGENCE`),
  KEY `FK_statut_vehicule` (`VEHICULE_ID_STATUT`),
  CONSTRAINT `FK_statut_vehicule` FOREIGN KEY (`VEHICULE_ID_STATUT`) REFERENCES `statut` (`STATUT_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_vehicule_agence` FOREIGN KEY (`VEHICULE_ID_AGENCE`) REFERENCES `agence` (`AGENCE_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Les données exportées n'étaient pas sélectionnées.
-- Listage de la structure de la table webprojectril. vehicule_has_fichier
DROP TABLE IF EXISTS `vehicule_has_fichier`;
CREATE TABLE IF NOT EXISTS `vehicule_has_fichier` (
  `VF_ID_VEHICULE` int(11) unsigned NOT NULL,
  `VF_ID_FICHIER` int(11) unsigned NOT NULL,
  PRIMARY KEY (`VF_ID_VEHICULE`,`VF_ID_FICHIER`),
  KEY `FK__fichier` (`VF_ID_FICHIER`),
  CONSTRAINT `FK__fichier` FOREIGN KEY (`VF_ID_FICHIER`) REFERENCES `fichier` (`FICHIER_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK__vehicule` FOREIGN KEY (`VF_ID_VEHICULE`) REFERENCES `vehicule` (`VEHICULE_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Les données exportées n'étaient pas sélectionnées.
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
