/////////////////////////
// Prepared statements //
/////////////////////////
const Uuid = require('cassandra-driver').types.Uuid;

class <%= modelname %>Stmts {

    // create tables
    public <%= modelname %>Table: string = `CREATE TABLE IF NOT EXISTS <%= modelname %> (
        id uuid,
        name text,
        created timestamp,
        PRIMARY KEY (id)
    );`;

    // delete tables
    public truncate<%= modelname %>: string = `TRUNCATE <%= modelname %>`;

    ///////////////////////
    // Seeding ////////////
    ///////////////////////
    // seed statements
    // use batch statements and add a new function in the ../../seed.ts file

    /////////////
    // queries //
    /////////////

    // create
    public insertRow: string = `INSERT INTO <%= modelname %> (id, name, created ) VALUES (?, ?, ?)`;
    // read
    public findByKey: string = 'SELECT name FROM <%= modelname %> WHERE id = ?';
    public allRows: string = 'SELECT name FROM <%= modelname %>';
    // update
    public updateRowByKey: string = 'UPDATE <%= modelname %> SET name = ? WHERE id = ? IF NOT EXISTS';
    // delete
    public deleteRowByKey: string = 'DELETE FROM <%= modelname %> WHERE id = ?';

}

export default new <%= modelname %>Stmts;