#! .env.developement
const { Client } = require("pg");

const SQL = `
DROP TABLE IF EXISTS books;
DROP TABLE IF EXISTS author;
DROP TABLE IF EXISTS genre;

CREATE TABLE genre (
    ID INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    Name VARCHAR(100) NOT NULL
);

CREATE TABLE author (
    ID INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    Name VARCHAR(255) NOT NULL
);

CREATE TABLE books (
    ID INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    Author_ID INT,
    Genre_ID INT,
    Title VARCHAR(255) NOT NULL,
    Release_Date DATE,
    FOREIGN KEY (Author_ID) REFERENCES Author(ID),
    FOREIGN KEY (Genre_ID) REFERENCES Genre(ID)
);

INSERT INTO genre (Name) VALUES
('Fantasy'),
('Sci-Fi'),
('Mystery'),
('Horror'),
('Romance');

INSERT INTO author (Name) VALUES
('J.R.R Tolkien'),
('Brandon Sanderson'),
('Rebecca Yarros'),
('Frank Herbert'),
('Andy Weir'),
('Agatha Christie'),
('Holly Jackson'),
('Jane Austen');

INSERT INTO books (Author_ID, Genre_ID, Title, Release_Date) VALUES
(1, 1, 'The Lord of the Rings', '1954-07-29'),
(2, 1, 'The Way of Kings', '2010-08-31'),
(3, 1, 'Fourth Wing', '2023-05-02'),
(4, 2, 'Dune', '2026-12-18'),
(5, 2, 'The Martian', '2015-10-02'),
(4, 2, 'Dune Messiah', '2026-12-18'),
(6, 3, 'And Then There Were None', '1939-11-06'),
(7, 3, 'A Good Girl''s Guide to Murder', '2024-07-01'),
(8, 5, 'Pride and Prejudice', '1813-01-28');

`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: `postgresql://${process.env.ROLE_NAME}:${process.env.ROLE_PASSWORD}@localhost:5432/inventory`,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();