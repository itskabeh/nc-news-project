const db = require("./db/connection.js")


exports.accessTopics = () => {
    return db.query("SELECT * FROM topics;")
        .then((response) => {
            return response.rows
        })
}




