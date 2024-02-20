const { accessTopics, selectArticleById } = require("./model")
const apiCEndpointsJSON = require('./endpoints.json')



exports.getStatus = (request, response) => {
    response.status(200).send();
}

exports.getTopics = (request, response) => {
    accessTopics().then((topics) => {
        response.status(200).send({ topics })
        
    })
    .catch((err) => {
        next(err)
    })
}

exports.getAPI = (request, response) => {
    // console.log(apiCEndpointsJSON, "in controller")
        response.status(200).send(apiCEndpointsJSON);
    }


//////////////

exports.getArticleById = (request, response, next) => {
    const { article_id } = request.params;
    selectArticleById(article_id).then((article) => {
        // console.log(article)
        response.status(200).send({ article });

    }).catch((err) => {
        next(err)
    }) 

}; 












 // fs.readFileSync("./endpoints.json", "utf-8")

    // const parsedEndpointData = JSON(endpointData);
    // console.log(parsedEndpointData)


        // .then((endpointData) => {
        //     const parsedEndpointData = JSON.parse(endpointData);
        //     response.status(200).send({ parsedEndpointData });
        





//     accessEndoints().then((topics) => {
//         response.status(200).send({ topics })
        
//     })
//     .catch((err) => {
//         next(err)
//     })
// }

// app.get("/api/owners", (request, response) => {
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