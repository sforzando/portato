-- ---
-- Globals
-- ---

-- Ignore Foreign Key Check as 'SET FOREIGN_KEY_CHECKS=0;' on MySQL
SET CONSTRAINTS ALL DEFERRED;

-- ---
-- Table 'users'
-- ---

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `mail_address` TEXT NOT NULL DEFAULT 'test@example.com',
  `quota_size` REAL NOT NULL DEFAULT 1024.0,
  `created_at` TIMESTAMP NOT NULL,
  `updated_at` TIMESTAMP NOT NULL,
  `status` ENUM NOT NULL DEFAULT 'ALIVE' COMMENT 'DEAD or ALIVE',
  PRIMARY KEY (`mail_address`)
);

-- ---
-- Table 'usages'
-- ---

DROP TABLE IF EXISTS `usages`;

CREATE TABLE `usages` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `users` TEXT NOT NULL DEFAULT 'test@example.com',
  `mailbox_size` REAL NOT NULL DEFAULT 0.0,
  `checked_at` TIMESTAMP NOT NULL,
  PRIMARY KEY (`id`, `users`)
);

-- ---
-- Foreign Keys
-- ---

ALTER TABLE `usages` ADD FOREIGN KEY (users) REFERENCES `users` (`mail_address`);

-- ---
-- Table Properties
-- ---

alter database DB_DATABASENAME set timezone = 'Asia/Tokyo';
