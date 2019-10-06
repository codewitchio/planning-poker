var db
class Database {
    constructor() {
        const sqlite3 = require('sqlite3').verbose()
        db = new sqlite3.Database('db.db')
        this.setupTables()
    }

    // Creates tables in database if they do not already exist
    setupTables() {
        db.serialize(() => {
            db.run('CREATE TABLE IF NOT EXISTS poll (poll_id INTEGER PRIMARY KEY, name TEXT)')
            db.run('CREATE TABLE IF NOT EXISTS poll_vote (vote_id INTEGER PRIMARY KEY, poll_id INTEGER, value INTEGER, name TEXT)')
            
            // Add demo poll if there is no data in database
            db.get('SELECT poll_id FROM poll WHERE poll_id = 1', (err, poll) => {
                if(!poll) { this.insertDemoData() }
            })
        })
    }

    // Inserts a demo poll and some votes associated with it into the database
    insertDemoData() {
        db.run(`INSERT INTO poll(name) VALUES('Demo poll')`, function (err) {
            if(err) { console.log(err.message) }
            else {
                db.run(`INSERT INTO poll_vote(poll_id, value, name) VALUES(1, 1, 'Hanna'), (1, 2, 'Joakim'),  (1, 5, 'Mark'), (1, 13, 'Max')`, function (err) {
                    if(err) { console.log(err.message) }
                    else { console.log('Successfully inserted demo poll into database')}
                })
            }
        })
    }

    /**
     * Gets poll info and its associated votes based on given id, 
     * returning data through the given callback function.
     * Returns false if unsuccessful.
     * 
     * @param {int} id 
     * @param {function} callback 
     */
    getPoll(id, callback) {
        db.serialize(() => {
            db.get('SELECT poll_id, name FROM poll WHERE poll_id = ?', [id], function (err, poll) {
                if(err) { console.log(err.message) }
                else if(poll) {
                    db.all(`SELECT vote_id, value, name FROM poll_vote WHERE poll_id = ${id}`, function (err, votes) {
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

    /**
     * Creates a poll with the given name, and returns its
     * id and info through the given callback function on success.
     * Returns false if unsuccessful.
     * 
     * @param {string} name 
     * @param {function} callback 
     */
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
                } else { callback(false) }
            })
        })
    }

    /**
     * Adds a vote to the given poll, using given value and name.
     * Returns vote info through the given callback function if successful.
     * Returns false if unsucessful.
     * 
     * @param {int} poll_id 
     * @param {int} value 
     * @param {string} name 
     * @param {function} callback 
     */
    addVote(poll_id, value, name, callback) {
        db.serialize(() => {
            db.run('INSERT INTO poll_vote(poll_id, value, name) VALUES(?, ?, ?)', [poll_id, value, name], function (err) {
                if(err) { console.log(err.message) }
                else if (this.lastID) {
                    console.log(`vote for poll ${poll_id} with value '${value}', name '${name}', and id ${this.lastID} added`)
                    callback({
                        vote_id: this.lastID,
                        poll_id: poll_id,
                        value: value,
                        name: name
                    })
                } else { callback(false) }
            })
        })
    }

    /**
     * Deletes a vote with the given id. Returns vote id
     * through the given callback function if successful.
     * Returns false if unsuccessful.
     * 
     * @param {int} vote_id 
     * @param {function} callback 
     */
    deleteVote(vote_id, callback) {
        db.serialize(() => {
            db.run('DELETE FROM poll_vote WHERE vote_id = ?', [vote_id], function (err) {
                if(err) { console.log(err.message) }
                else if (this.changes) {
                    console.log(`vote with id ${vote_id} deleted`)
                    callback({
                        vote_id: vote_id
                    })
                } else { callback(false) }
            })
        })
    }
}

module.exports = Database