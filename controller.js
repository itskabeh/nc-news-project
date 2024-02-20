const { accessTopics, selectArticleById } = require("./model")
const apiCEndpointsJSON = require('./endpoints.json')



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

exports.getAPI = (req, res) => {
    console.log(apiCEndpointsJSON, "in controller")
        res.status(200).send(apiCEndpointsJSON);
    }


//////////////














 // fs.readFileSync("./endpoints.json", "utf-8")

    // const parsedEndpointData = JSON(endpointData);
    // console.log(parsedEndpointData)


        // .then((endpointData) => {
        //     const parsedEndpointData = JSON.parse(endpointData);
        //     res.status(200).send({ parsedEndpointData });
        





//     accessEndoints().then((topics) => {
//         res.status(200).send({ topics })
        
//     })
//     .catch((err) => {
//         next(err)
//     })
// }

// app.get("/api/owners", (req, res) => {
//     const ownersArr = []
//     fs.readdir("./data/owners", "utf-8")
//     .then(allOwnersFiles => {
//         for (const ownerFile of allOwnersFiles){
//             ownersArr.push(fs.readFile(`./data/owners/${ownerFile}`, "utf-8"))
//         }
//     })
//     .then(() => {
//         return Promise.all(ownersArr)
//     })
//     .then(ownersArrData => {
//         const parsedOwnersArrData = ownersArrData.map(ownerData => JSON.parse(ownerData))
//         console.log(parsedOwnersArrData)
//     })
// })