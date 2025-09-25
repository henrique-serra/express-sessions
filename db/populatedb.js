#! /usr/bin/env node
require('dotenv').config();
const { Client } = require("pg");

const SQL = `
CREATE TABLE IF NOT EXISTS usernames (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  username VARCHAR ( 255 ) );
  
  INSERT INTO usernames (username) 
  VALUES
    ('Bryan'),
    ('Brian'),
    ('Brayan'),
    ('Odin'),
    ('Odon'),
    ('Damon'),
    ('Damian'),
    ('Damien'),
    ('Lucas'),
    ('Luke'),
    ('Lukas'),
    ('Maria'),
    ('Marie'),
    ('Mario'),
    ('Alexandre');
`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: `postgresql://${process.env.USER}:${process.env.PASSWORD}@${process.env.HOST}:5432/top_users`,
    // "postgresql://<role_name>:<role_password>@localhost:5432/top_users"
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();
