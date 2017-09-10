/////////////////////////
// Prepared statements //
/////////////////////////
const TimeUuid = require('cassandra-driver').types.TimeUuid;

class <%= modelname %>Stmts {

    // create tables
    public <%= namelower %>Table: string = `CREATE TABLE IF NOT EXISTS <%= namelower %> (
        timeid timeuuid,
        name text,
        PRIMARY KEY (timeid)
    );`;

    // delete tables
    public truncate<%= modelname %>Table: string = `TRUNCATE <%= namelower %>`;

    ///////////////////////
    // Seeding ////////////
    ///////////////////////
    private batchQuery: string = 'INSERT INTO <%= namelower %> (timeid, name) VALUES (?, ?)';
    // seed statements
    public seed<%= modelname %>Table: Array<{ query: string, params: Array<string> }> = [{
            query: this.batchQuery,
            params: [TimeUuid.now(), '<%= modelname %>1']
        },
        {
            query: this.batchQuery,
            params: [TimeUuid.now(), '<%= modelname %>2']
        },
        {
            query: this.batchQuery,
            params: [TimeUuid.now(), '<%= modelname %>3']
        },
        {
            query: this.batchQuery,
            params: [TimeUuid.now(), '<%= modelname %>4']
        }];

    /////////////
    // queries //
    /////////////

    // create
    public insertRow: string = `INSERT INTO <%= namelower %> (timeid, name) VALUES (?, ?)`;
    // read
    public findRowByKey: string = 'SELECT timeid, name FROM <%= namelower %> WHERE timeid = ?';
    public allRows: string = 'SELECT timeid, name FROM <%= namelower %>';
    // update
    public updateRowByKey: string = 'UPDATE <%= namelower %> SET name = ? WHERE timeid = ? IF EXISTS';
    // delete
    public deleteRowByKey: string = 'DELETE FROM <%= namelower %> WHERE timeid = ?';

}

export default new <%= modelname %>Stmts;