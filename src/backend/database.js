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
            db.run('CREATE TABLE IF NOT EXISTS poll_vote (vote_id INTEGER PRIMARY KEY, poll_id INTEGER, value INTEGER)')
        })
    }

    getPoll(id, callback) {
        db.serialize(() => {
            db.get(`SELECT poll_id, name FROM poll WHERE poll_id = ${id}`, function (err, poll) {
                if(err) { console.log(err.message) }
                else if(poll) {
                    db.all(`SELECT vote_id, value FROM poll_vote WHERE poll_id = ${id}`, function (err, votes) {
                        if(err) {
                            console.log(err.message)
                            callback(false)
                        }
                        else if (votes){
                            callback({
                                poll_id: poll.poll_id,
                                name: poll.name,
                                votes: votes
                            })
                        } else { callback(false) }
                    })
                } else { callback(false) }
            })
        })
    }

    createPoll(name, callback) {
        db.serialize(() => {
            db.run(`INSERT INTO poll(name) VALUES('${name}')`, function (err) {
                if(err) { console.log(err.message) }
                else if (this.lastID) {
                    console.log(`poll '${name}' with id ${this.lastID} created`)
                    callback({
                        poll_id: this.lastID,
                        name: name
                    })
                } else { callback(false) }
            })
        })
    }

    addVote(poll_id, value, callback) {
        db.serialize(() => {
            db.run(`INSERT INTO poll_vote(poll_id, value) VALUES(${poll_id}, ${value})`, function (err) {
                if(err) { console.log(err.message) }
                else if (this.lastID) {
                    console.log(`vote for poll ${poll_id} with value '${value}' and id ${this.lastID} added`)
                    callback({
                        vote_id: this.lastID,
                        poll_id: poll_id,
                        value: value
                    })
                } else { callback(false) }
            })
        })
    }
}

module.exports = Database