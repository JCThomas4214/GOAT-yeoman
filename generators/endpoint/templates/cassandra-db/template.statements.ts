////////////////////////
// Prepared statements//
////////////////////////
const Uuid = require('cassandra-driver').types.Uuid;
// create tables
export const <%= modelname %>Table: string = `CREATE TABLE IF NOT EXISTS ${<%= modelname %>} (
    id uuid,
    name text,
    created timestamp,
    PRIMARY KEY (id)
);`;

// delete tables
export const truncate<%= modelname %>: string = `TRUNCATE ${<%= modelname %>}`;

///////////////////////
// Seeding ////////////
///////////////////////
// seed statements
// use batch statements and add a new function in the ../../seed.ts file

////////////
// queries//
////////////

// create
export const insert<%= modelname %>: string = `INSERT INTO ${<%= modelname %>} (id, name, created ) VALUES (?, ?, ?)`;
// read
export const findById: string = 'SELECT name FROM ${<%= modelname %>} WHERE id = ?';
export const all<%= modelname %>: string = 'SELECT name FROM ${<%= modelname %>}';
// update - NA
export const update<%= modelname %>: string = 'UPDATE ${<%= modelname %>} SET name = ? WHERE id = ? IF NOT EXISTS';
// delete - NA
export const delete<%= modelname %>: string = 'DELETE FROM ${<%= modelname %>} WHERE id = ?';