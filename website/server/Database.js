const sqlite = require('sqlite3');

// class manages the database connection.
class Database
{
    constructor (filePath)
    {
        // open and setup database
        this.database = new sqlite.Database(filePath,
            error =>
            {
                if (error)
                    throw error;
            }
        );
    }
    // runs a sql statement. returns a promise.
    run(sql, params)
    {
        return new Promise(
            (resolve, reject) =>
            {
                // run sql and resolve / reject
                this.database.run(sql, params,
                    (error) =>
                    {
                        if (error)
                            reject(error);
                        else
                            resolve();
                    }
                );
            }
        );
    }
    // runs a sql select statement. returns a promise with the received rows as a list.
    select(sql, params)
    {
        return new Promise(
            (resolve, reject) =>
            {
                // run sql and resolve data / reject
                this.database.all(sql, params,
                    (error, rows) =>
                    {
                        if (error)
                            reject(error);
                        else
                            resolve(rows);
                    }
                );
            }
        );
    }
    // runs a sql select statement and returns the first value. returns a promise with the received value.
    get(sql, params)
    {
        return new Promise(
            (resolve, reject) =>
            {
                // run sql and resolve data / reject
                this.database.get(sql, params,
                    (error, row) =>
                    {
                        if (error)
                            reject(error);
                        else
                            resolve(Object.values(row)[0]);
                    }
                );
            }
        );
    }
}

module.exports = Database;
