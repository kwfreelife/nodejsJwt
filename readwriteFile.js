const path = require('path');
const fs = require('fs');
const random1 = Math.floor(Math.random()*6) + 1;
if (random1 >= 4){
    console.log(random1, "HI");
} else {
    console.log(random1, "LOW");
}
console.log(__filename);
console.log(__dirname);
const myFilePath = path.join(__dirname, 'abc.txt');
console.log("mypath:" , myFilePath);
/**
fs.writeFile(myFilePath,"hello", 'utf-8',err => {
    if (err) throw err;
    console.log('OK write file success');
    }
);
**/
let xdata = '';
//xdata = fs.readFileSync(myFilePath, "utf8");
/** create promise object to get the data from async funtion. **/
var promisObj = new Promise( (resolve, reject) => {
    fs.readFile(myFilePath,'utf-8', (err,data)=>{
      if (err) {
        reject(err)
      }else{
        console.log("data:", data);
        resolve(data);
      }
  });
});
/*** the promis object execute and get data (use .then) when async function finished. */
promisObj.then((result) => {
  xdata = result;  
  console.log("xdata:", xdata);
});
console.log("xdata11:", xdata); //this is will empty because it is not in even loop.