ALTER TABLE `leads` MODIFY COLUMN `interestType` enum('solar','battery','solar_battery') NOT NULL;--> statement-breakpoint
ALTER TABLE `leads` ADD `propertyType` enum('family_home','apartment','commercial');--> statement-breakpoint
ALTER TABLE `leads` ADD `zipCode` varchar(10);--> statement-breakpoint
ALTER TABLE `leads` ADD `existingSolar` tinyint;--> statement-breakpoint
ALTER TABLE `leads` ADD `solarMotivation` enum('price_stability','reduce_bills','all_electric','other');--> statement-breakpoint
ALTER TABLE `leads` ADD `paymentPreference` enum('leasing','financing','cash');