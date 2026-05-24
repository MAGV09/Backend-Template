#! /usr/bin/env node
const { Client } = require('pg');

const SQL = `
CREATE TABLE IF NOT EXISTS tablename (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  column VARCHAR ( 255 )
);

INSERT INTO tablename (column) 
VALUES
  ('Bryan'),
  ('Odin'),
  ('Damon');
`;

async function main() {
  console.log('seeding...');
  const client = new Client({
    connectionString: process.argv[2],
    ssl: { rejectUnauthorized: false },
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log('done');
}

main();
