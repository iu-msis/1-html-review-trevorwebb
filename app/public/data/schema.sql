CREATE DATABASE IF NOT EXISTS msisdb;
USE msisdb;
 
DROP TABLE IF EXISTS books;
CREATE TABLE books (
    bookId int PRIMARY KEY auto_increment,
    title varchar(48) NOT NULL,
    author varchar(48),
    yearPublished int,
    publisher varchar(24),
    pgCount int,
    msrp varchar(16)
);

INSERT INTO books (bookId, title, author, yearPublished, publisher, pgCount, msrp) VALUES
(1, 'A Hard Days Write', 'Steve Turner', 1994, 'Hachette Book Group', 268, '$30.00'),
(2, 'Music By The Numbers', 'Eli Maor', 2018, 'Harper Collins', 175, '$20.00'),
(3, 'The Shining', 'Stephen King', 1977, 'Penguin/Random House', 477, '$45.00'),
(4, 'Dreaming The Beatles', 'Rob Sheffield', 2017, 'Macmillan', 243, '$27.50');