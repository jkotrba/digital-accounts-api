USE accounts;

CREATE TABLE `transactions`
(
	`id` INT NOT NULL AUTO_INCREMENT,
    `account_id` INT NOT NULL,
    `description` VARCHAR(100) NOT NULL,
    `amount` DECIMAL(13, 4) NOT NULL,
    `date_created` DATETIME NOT NULL,
    `date_modified` DATETIME NOT NULL,
    PRIMARY KEY (id),
    INDEX `idx_account_id` (`account_id`),
    FOREIGN KEY (`account_id`)
		REFERENCES `accounts`(`id`)
        ON DELETE CASCADE
);