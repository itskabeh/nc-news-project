const { accessTopics } = require("./model")



exports.getStatus = (req, res) => {
    res.status(200).send();
}

exports.getTopics = (req, res) => {
    accessTopics().then((topics) => {
        res.status(200).send({ topics })
        
    })
    .catch((err) => {
        next(err)
    })
}