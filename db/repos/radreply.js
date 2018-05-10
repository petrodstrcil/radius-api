'use strict';

const cs = {}; // Reusable ColumnSet objects.

/*
 This repository mixes hard-coded and dynamic SQL, primarily to show a diverse example of using both.
 */

class RadreplyRepository {
    constructor(db, pgp) {
        this.db = db;
        this.pgp = pgp;

        // set-up all ColumnSet objects, if needed:
        createColumnsets(pgp);
    }

    delete(id) {
        return this.db.result('DELETE FROM radreply WHERE id = $1', +id, r => r.rowCount);
    }

    update(id, data) {
        const arr = [data.username, data.attribute, data.op, data.value, id];
        return this.db.result('UPDATE radreply'
        + ' set username=$1, attribute=$2, op=$3, value=$4'
        + ' where id=$5', arr, r => r.rowCount);
    }

    // Tries to find object from id;
    findById(id) {
        return this.db.oneOrNone('SELECT * FROM radreply WHERE id = $1', +id);
    }

    // Tries to find rows from username;
    findByUserName(username) {
        return this.db.any('SELECT * FROM radreply WHERE username = $1', username);
    }

}

//////////////////////////////////////////////////////////
// Example of statically initializing ColumnSet objects:

function createColumnsets(pgp) {
    // create all ColumnSet objects only once:
    if (!cs.insert) {
        // Type TableName is useful when schema isn't default "public" ,
        // otherwise you can just pass in a string for the table name.
        const table = new pgp.helpers.TableName({table: 'radreply', schema: 'public'});

        cs.insert = new pgp.helpers.ColumnSet(['name'], {table});
        cs.update = cs.insert.extend(['?id']);
    }
    return cs;
}

module.exports = UsersRepository;