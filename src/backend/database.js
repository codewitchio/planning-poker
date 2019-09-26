var db
class Database {
    constructor() {
        const sqlite3 = require('sqlite3').verbose()
        db = new sqlite3.Database('db.db')
        this.setupTables()
    }

    setupTables() {
        db.serialize(() => {
            db.run('CREATE TABLE IF NOT EXISTS poll (poll_id INTEGER PRIMARY KEY, name TEXT)')
            db.run('CREATE TABLE IF NOT EXISTS poll_votes (vote_id INTEGER PRIMARY KEY, poll_id INTEGER, value INTEGER)')
        })
    }

    getPoll(id, callback) {
        db.serialize(() => {
            db.get('SELECT poll_id, name FROM poll WHERE poll_id = ' + id, function (err, row) {
                if(err) { console.log(err.message) }
                else if(row) {
                    callback({
                        poll_id: row.poll_id,
                        name: row.name
                    })
                } else {
                    callback(false)
                }
            })
        })
    }

    createPoll(name, callback) {
        db.serialize(() => {
            db.run('INSERT INTO poll(name) VALUES(?)', [name], function (err) {
                if(err) { console.log(err.message) }
                else if (this.lastID) {
                    console.log(`poll '${name}' with id ${this.lastID} created`)
                    callback({
                        poll_id: this.lastID,
                        name: name
                    })
                } else {
                    callback(false)
                }
            })
        })
    }
}

module.exports = Database