#! .env.developement
const { Client } = require("pg");

const SQL = `
CREATE TABLE genre (
    ID INT PRIMARY KEY,
    Name VARCHAR(100) NOT NULL
);

CREATE TABLE author (
    ID INT PRIMARY KEY,
    Name VARCHAR(255) NOT NULL
);

CREATE TABLE books (
    ID INT PRIMARY KEY,
    Author_ID INT,
    Genre_ID INT,
    Title VARCHAR(255) NOT NULL,
    Release_Date DATE,
    FOREIGN KEY (Author_ID) REFERENCES Author(ID),
    FOREIGN KEY (Genre_ID) REFERENCES Genre(ID)
);

INSERT INTO genre (ID, Name) VALUES
(1, 'Fantasy'),
(2, 'Sci-Fi'),
(3, 'Mystery'),
(4, 'Horror'),
(5, 'Romance');

INSERT INTO author (ID, Name) VALUES
(1, 'J.R.R Tolkien'),
(2, 'Brandon Sanderson'),
(3, 'Rebecca Yarros'),
(4, 'Frank Herbert'),
(5, 'Andy Weir'),
(6, 'Agatha Christie'),
(7, 'Holly Jackson'),
(8, 'Jane Austen');

INSERT INTO books (ID, Author_ID, Genre_ID, Title, Release_Date) VALUES
(1, 1, 1, 'The Lord of the Rings', '1954-07-29'),
(2, 2, 1, 'The Way of Kings', '2010-08-31'),
(3, 3, 1, 'Fourth Wing', '2023-05-02'),
(4, 4, 2, 'Dune', '2026-12-18'),
(5, 5, 2, 'The Martian', '2015-10-02'),
(6, 4, 2, 'Dune Messiah', '2026-12-18'),
(7, 6, 3, 'And Then There Were None', '1939-11-06'),
(8, 7, 3, 'A Good Girl''s Guide to Murder', '2024-07-01'),
(9, 8, 5, 'Pride and Prejudice', '1813-01-28');

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