const { MongoClient } = require('mongodb');
const uid = 'kwfreelife';
const pwd = 'L4Y6QEJI4ZCNaf3x';
const connStr = `mongodb+srv://${uid}:${pwd}@cluster0.hl3uj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

async function main() {
    const uri = connStr;
    const client = new MongoClient(uri);

    try {
        await client.connect();
        console.log("Connected to MongoDB");

        // Your database operations go here
        // Provide the name of the database and collection you want to use.
        // If the database and/or collection do not exist, the driver and Atlas
        // will create them automatically when you first write data.
        const dbName = "myDatabase";
        const collectionName = "students";

        // Create references to the database and collection in order to run
        // operations on them. collection is the table name in RDBMS
        const database = client.db(dbName);
        const collection = database.collection(collectionName);
        //myStudents is the data and structure of the table.
        const myStudents = [{
            studentName: "ABC",
            studentAge: 18
        },{            
            studentName: "DEF",
            studentAge: 17
        }];
        /**
        try {
            const insertManyResult = await collection.insertMany(myStudents);
            console.log(`${insertManyResult.insertedCount} documents successfully inserted.\n`);
        } catch (err) {
            console.error(`Something went wrong trying to insert the new documents: ${err}\n`);
        }
        **/
        // We can also find a single document. Let's find the first document
        // that has the string "potato" in the ingredients list.
        const findOneQuery = { studentName: "DEF" };
        try {
            const findOneResult = await collection.findOne(findOneQuery);
            if (findOneResult === null) {
              console.log("Couldn't find any recipes that contain 'potato' as an ingredient.\n");
            } else {
              console.log(`Found a recipe with 'DEF' as an ingredient:\n${JSON.stringify(findOneResult)}\n`);
            }
          } catch (err) {
            console.error(`Something went wrong trying to find one document: ${err}\n`);
          }

        /*
        * *** UPDATE A DOCUMENT ***
        *
        * You can update a single document or multiple documents in a single call.
        *
        * Here we update the PrepTimeInMinutes value on the document we
        * just found.
        */
        const updateDoc = { $set: { studentAge: 19 } };

        // The following updateOptions document specifies that we want the *updated*
        // document to be returned. By default, we get the document as it was *before*
        // the update.
        const updateOptions = { returnOriginal: false };

        try {
            const updateResult = await collection.findOneAndUpdate(
                findOneQuery,
                updateDoc,
                updateOptions,
            );
            console.log("updateResult.value", updateResult)
            console.log(`Here is the updated document:\n${JSON.stringify(updateResult)}\n`);
        } catch (err) {
            console.error(`Something went wrong trying to update one document: ${err}\n`);
        }

    } finally {
        await client.close();
        console.log("Connection to MongoDB closed");
    }
}

main().catch(console.error);
