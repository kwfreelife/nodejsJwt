const mongoose = require('mongoose');
const {MONGO_URI} = process.env;

//Export Method connect for another file to use this method. 
exports.connect = () => {
    // Connecting to the database server and database name.
    mongoose.connect(MONGO_URI, {
        dbName: 'myDatabase',
        //useNewUrlParser: true ,
        //useUnifiedTopology: true,
        /** useCreateIndex: true,
        useFindAndModify: false **/
    }).then( () => {
        console.log("connected db.");
    }).catch((error) => {
        console.log("error connect db");
        console.error(error);
        process.exit(1);
    });
};