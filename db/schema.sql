-- ---
-- Globals
-- ---

-- Ignore Foreign Key Check as 'SET FOREIGN_KEY_CHECKS=0;' on MySQL
SET CONSTRAINTS ALL DEFERRED;

-- ---
-- Table 'user'
-- ---

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `mail_address` TEXT NOT NULL DEFAULT 'test@example.com',
  `quota_size` REAL NOT NULL DEFAULT 1024.0,
  `created_at` TIMESTAMP NOT NULL,
  `updated_at` TIMESTAMP NOT NULL,
  `status` ENUM NOT NULL DEFAULT 'ALIVE' COMMENT 'DEAD or ALIVE',
  PRIMARY KEY (`mail_address`)
);

-- ---
-- Table 'usage'
-- ---

DROP TABLE IF EXISTS `usage`;

CREATE TABLE `usage` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `user` TEXT NOT NULL DEFAULT 'test@example.com',
  `mailbox_size` REAL NOT NULL DEFAULT 0.0,
  `checked_at` TIMESTAMP NOT NULL,
  PRIMARY KEY (`id`, `user`)
);

-- ---
-- Foreign Keys
-- ---

ALTER TABLE `usage` ADD FOREIGN KEY (user) REFERENCES `user` (`mail_address`);

-- ---
-- Table Properties
-- ---

alter database DB_DATABASENAME set timezone = 'Asia/Tokyo';
