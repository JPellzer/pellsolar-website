CREATE TABLE `unsubscribes` (
	`id` int AUTO_INCREMENT NOT NULL,
	`email` varchar(320) NOT NULL,
	`token` varchar(128) NOT NULL,
	`campaign` varchar(256),
	`ipAddress` varchar(64),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `unsubscribes_id` PRIMARY KEY(`id`),
	CONSTRAINT `unsubscribes_token_unique` UNIQUE(`token`)
);
--> statement-breakpoint
ALTER TABLE `leads` MODIFY COLUMN `interestType` enum('solar','battery','solar_battery','ev_charger','other') NOT NULL;--> statement-breakpoint
ALTER TABLE `leads` ADD `interestOtherText` text;