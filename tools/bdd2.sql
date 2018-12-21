-- --------------------------------------------------------
-- Hôte :                        127.0.0.1
-- Version du serveur:           5.7.11 - MySQL Community Server (GPL)
-- SE du serveur:                Win32
-- HeidiSQL Version:             9.5.0.5196
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Export de la structure de la base pour webprojectril
DROP DATABASE IF EXISTS `webprojectril`;
CREATE DATABASE IF NOT EXISTS `webprojectril` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;
USE `webprojectril`;

-- Export de la structure de la table webprojectril. agence
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
  `AGENCE_CP` varchar(10) DEFAULT NULL,
  `AGENCE_VILLE` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`AGENCE_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;

-- Export de données de la table webprojectril.agence : ~3 rows (environ)
DELETE FROM `agence`;
/*!40000 ALTER TABLE `agence` DISABLE KEYS */;
INSERT INTO `agence` (`AGENCE_ID`, `AGENCE_NOM`, `AGENCE_NUM_ADRESSE`, `AGENCE_NOM_ADRESSE`, `AGENCE_MAIL`, `AGENCE_TEL`, `AGENCE_FAX`, `AGENCE_ID_FICHIER`, `AGENCE_CP`, `AGENCE_VILLE`) VALUES
	(1, 'Trotro', '56', 'Labas', 'toto@toto.fr', '0304056001', '0807090645', NULL, '55440', 'Lamarche'),
	(2, 'Trotro6', '56', 'Labas', 'toto@toto.fr', '0304056001', '0807090645', NULL, '55440', 'Lamarche'),
	(3, 'undefined', '2', '3', '8', '6', '7', NULL, '4', '1,5');
/*!40000 ALTER TABLE `agence` ENABLE KEYS */;

-- Export de la structure de la table webprojectril. fichier
DROP TABLE IF EXISTS `fichier`;
CREATE TABLE IF NOT EXISTS `fichier` (
  `FICHIER_ID` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `FICHIER_EXTENSION` varchar(50) DEFAULT NULL,
  `FICHIER_URL` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`FICHIER_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Export de données de la table webprojectril.fichier : ~0 rows (environ)
DELETE FROM `fichier`;
/*!40000 ALTER TABLE `fichier` DISABLE KEYS */;
/*!40000 ALTER TABLE `fichier` ENABLE KEYS */;

-- Export de la structure de la table webprojectril. historique
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

-- Export de données de la table webprojectril.historique : ~0 rows (environ)
DELETE FROM `historique`;
/*!40000 ALTER TABLE `historique` DISABLE KEYS */;
/*!40000 ALTER TABLE `historique` ENABLE KEYS */;

-- Export de la structure de la table webprojectril. permission
DROP TABLE IF EXISTS `permission`;
CREATE TABLE IF NOT EXISTS `permission` (
  `PERMISSION_ID` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `PERMISSION_LIB` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`PERMISSION_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Export de données de la table webprojectril.permission : ~0 rows (environ)
DELETE FROM `permission`;
/*!40000 ALTER TABLE `permission` DISABLE KEYS */;
/*!40000 ALTER TABLE `permission` ENABLE KEYS */;

-- Export de la structure de la table webprojectril. statut
DROP TABLE IF EXISTS `statut`;
CREATE TABLE IF NOT EXISTS `statut` (
  `STATUT_ID` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `STATUT_LIB` varchar(200) DEFAULT NULL,
  `STATUT_DESCRIPTION` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`STATUT_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;

-- Export de données de la table webprojectril.statut : ~2 rows (environ)
DELETE FROM `statut`;
/*!40000 ALTER TABLE `statut` DISABLE KEYS */;
INSERT INTO `statut` (`STATUT_ID`, `STATUT_LIB`, `STATUT_DESCRIPTION`) VALUES
	(1, 'Libre', 'Véhicule libre'),
	(2, 'Loué', 'Véhicule loué');
/*!40000 ALTER TABLE `statut` ENABLE KEYS */;

-- Export de la structure de la table webprojectril. ticket
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

-- Export de données de la table webprojectril.ticket : ~0 rows (environ)
DELETE FROM `ticket`;
/*!40000 ALTER TABLE `ticket` DISABLE KEYS */;
/*!40000 ALTER TABLE `ticket` ENABLE KEYS */;

-- Export de la structure de la table webprojectril. type_histo
DROP TABLE IF EXISTS `type_histo`;
CREATE TABLE IF NOT EXISTS `type_histo` (
  `TYPE_HISTO_ID` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `TYPE_HISTO_LIB` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`TYPE_HISTO_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Export de données de la table webprojectril.type_histo : ~0 rows (environ)
DELETE FROM `type_histo`;
/*!40000 ALTER TABLE `type_histo` DISABLE KEYS */;
/*!40000 ALTER TABLE `type_histo` ENABLE KEYS */;

-- Export de la structure de la table webprojectril. utilisateur
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
  `UTILISATEUR_PWD` varchar(500) NOT NULL,
  PRIMARY KEY (`UTILISATEUR_ID`),
  KEY `FK_utilisateur_agence` (`UTILISATEUR_ID_AGENCE`),
  CONSTRAINT `FK_utilisateur_agence` FOREIGN KEY (`UTILISATEUR_ID_AGENCE`) REFERENCES `agence` (`AGENCE_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;

-- Export de données de la table webprojectril.utilisateur : ~2 rows (environ)
DELETE FROM `utilisateur`;
/*!40000 ALTER TABLE `utilisateur` DISABLE KEYS */;
INSERT INTO `utilisateur` (`UTILISATEUR_ID`, `UTILISATEUR_IDENTIFIANT`, `UTILISATEUR_NOM`, `UTILISATEUR_PRENOM`, `UTILISATEUR_TEL`, `UTILISATEUR_FAX`, `UTILISATEUR_MOBILE`, `UTILISATEUR_ID_AGENCE`, `UTILISATEUR_PWD`) VALUES
	(1, 'vlarriere', 'larriere', 'vivien', '0303030303', NULL, '060606060606', 1, 'toto'),
	(2, 'undefined', 'ss', 'ss', '0606', '0606', '0606', 2, 'undefined');
/*!40000 ALTER TABLE `utilisateur` ENABLE KEYS */;

-- Export de la structure de la table webprojectril. utilisateur_has_perm
DROP TABLE IF EXISTS `utilisateur_has_perm`;
CREATE TABLE IF NOT EXISTS `utilisateur_has_perm` (
  `UP_PERM_ID` int(11) unsigned NOT NULL,
  `UP_UTILISATEUR_ID` int(11) unsigned NOT NULL,
  PRIMARY KEY (`UP_PERM_ID`,`UP_UTILISATEUR_ID`),
  KEY `FK_utilisateur_has_perm_utilisateur` (`UP_UTILISATEUR_ID`),
  CONSTRAINT `FK_utilisateur_has_perm_permission` FOREIGN KEY (`UP_PERM_ID`) REFERENCES `permission` (`PERMISSION_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_utilisateur_has_perm_utilisateur` FOREIGN KEY (`UP_UTILISATEUR_ID`) REFERENCES `utilisateur` (`UTILISATEUR_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Export de données de la table webprojectril.utilisateur_has_perm : ~0 rows (environ)
DELETE FROM `utilisateur_has_perm`;
/*!40000 ALTER TABLE `utilisateur_has_perm` DISABLE KEYS */;
/*!40000 ALTER TABLE `utilisateur_has_perm` ENABLE KEYS */;

-- Export de la structure de la table webprojectril. vehicule
DROP TABLE IF EXISTS `vehicule`;
CREATE TABLE IF NOT EXISTS `vehicule` (
  `VEHICULE_ID` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `VEHICULE_DATE_FABRICATION` varchar(50) DEFAULT NULL,
  `VEHICULE_HAUTEUR` int(11) unsigned DEFAULT NULL,
  `VEHICULE_LARGEUR` int(11) unsigned DEFAULT NULL,
  `VEHICULE_LONGUEUR` int(11) unsigned DEFAULT NULL,
  `VEHICULE_POIDS` int(11) unsigned DEFAULT NULL,
  `VEHICULE_PUISSANCE` varchar(50) DEFAULT NULL,
  `VEHICULE_ACTIF` tinyint(1) unsigned DEFAULT '1',
  `VEHICULE_ID_AGENCE` int(11) unsigned DEFAULT NULL,
  `VEHICULE_ID_STATUT` int(11) unsigned DEFAULT NULL,
  `VEHICULE_MARQUE` varchar(50) DEFAULT NULL,
  `VEHICULE_MODELE` varchar(50) DEFAULT NULL,
  `VEHICULE_DATE_FIN_PRET` varchar(50) DEFAULT NULL,
  `VEHICULE_DATE_DEBUT_PRET` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`VEHICULE_ID`),
  KEY `FK_vehicule_agence` (`VEHICULE_ID_AGENCE`),
  KEY `FK_vehicule_statut` (`VEHICULE_ID_STATUT`),
  CONSTRAINT `FK_vehicule_agence` FOREIGN KEY (`VEHICULE_ID_AGENCE`) REFERENCES `agence` (`AGENCE_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_vehicule_statut` FOREIGN KEY (`VEHICULE_ID_STATUT`) REFERENCES `statut` (`STATUT_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;

-- Export de données de la table webprojectril.vehicule : ~3 rows (environ)
DELETE FROM `vehicule`;
/*!40000 ALTER TABLE `vehicule` DISABLE KEYS */;
INSERT INTO `vehicule` (`VEHICULE_ID`, `VEHICULE_DATE_FABRICATION`, `VEHICULE_HAUTEUR`, `VEHICULE_LARGEUR`, `VEHICULE_LONGUEUR`, `VEHICULE_POIDS`, `VEHICULE_PUISSANCE`, `VEHICULE_ACTIF`, `VEHICULE_ID_AGENCE`, `VEHICULE_ID_STATUT`, `VEHICULE_MARQUE`, `VEHICULE_MODELE`, `VEHICULE_DATE_FIN_PRET`, `VEHICULE_DATE_DEBUT_PRET`) VALUES
	(1, '2018-12-19', 100, 200, 300, 50, '40', 1, 1, 2, 'Toyota', 'Motorola', '2018-12-16', '2018-12-20'),
	(2, '9', 6, 5, 4, 7, '8', 1, 1, 1, '1', '2', '', ''),
	(3, '10', 88, 88, 88, 560, '3000', 1, 1, 1, 'Wlh', 'toto', NULL, NULL);
/*!40000 ALTER TABLE `vehicule` ENABLE KEYS */;

-- Export de la structure de la table webprojectril. vehicule_has_fichier
DROP TABLE IF EXISTS `vehicule_has_fichier`;
CREATE TABLE IF NOT EXISTS `vehicule_has_fichier` (
  `VF_ID_VEHICULE` int(11) unsigned NOT NULL,
  `VF_ID_FICHIER` int(11) unsigned NOT NULL,
  PRIMARY KEY (`VF_ID_VEHICULE`,`VF_ID_FICHIER`),
  KEY `FK__fichier` (`VF_ID_FICHIER`),
  CONSTRAINT `FK__fichier` FOREIGN KEY (`VF_ID_FICHIER`) REFERENCES `fichier` (`FICHIER_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK__vehicule` FOREIGN KEY (`VF_ID_VEHICULE`) REFERENCES `vehicule` (`VEHICULE_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Export de données de la table webprojectril.vehicule_has_fichier : ~0 rows (environ)
DELETE FROM `vehicule_has_fichier`;
/*!40000 ALTER TABLE `vehicule_has_fichier` DISABLE KEYS */;
/*!40000 ALTER TABLE `vehicule_has_fichier` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
