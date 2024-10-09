const expSrv = require('express');
const app = expSrv();

/** **/
app.get('/', (req, res) => {

});
app.post('/student', (req, res) => {

} );


app.listen(3000, () => {
    console.log("server started at port 3000");
});