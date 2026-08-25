CREATE TABLE `project_photos` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(256) NOT NULL,
	`description` text,
	`imageUrl` text NOT NULL,
	`imageKey` text,
	`category` enum('solar','battery','ev-charging','roofing','other') NOT NULL DEFAULT 'solar',
	`location` varchar(256),
	`featured` int NOT NULL DEFAULT 0,
	`sortOrder` int NOT NULL DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `project_photos_id` PRIMARY KEY(`id`)
);
