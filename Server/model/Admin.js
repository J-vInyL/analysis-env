const Maria = require("./index.js")


const getLoginData = async () => {
    let testquery = "select * from admin"
    Maria.query(testquery, function(err, results, fields) {
        if(err){
            console.log(err)
        }
        console.log(results)
    })
}




exports = {getLoginData}