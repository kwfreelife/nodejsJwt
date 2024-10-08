const mongoose = require('mongoose');
const uid = 'kwfreelife';
const pwd = 'L4Y6QEJI4ZCNaf3x';
const connStr = `mongodb+srv://${uid}:${pwd}@cluster0.hl3uj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
console.log("connstr:", connStr);
mongoose.set('strictQuery',false);
mongoose.connect(connStr)
        .then( () => {
            console.log("database connected. ^_^");
        })
        .catch((err) => {
            console.log(err);
        });

//Schema is the definition of table , field and data type
const productSchema = {
    productName: {type: String, require: true},
    productPrice: {type: Number},    
};

//Model is the object for CRUD the schema
const productModel = mongoose.model('Product',productSchema);
productModel.create({
    productName: "Spring", productPrice:100
}).then( () => {
    console.log('Product added');
})