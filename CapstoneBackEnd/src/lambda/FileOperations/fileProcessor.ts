
import * as AWS from 'aws-sdk';
const bucketname = process.env.CLIENTFILES_FILEBUCKET
const readLine = require('readline')

export async function processFile() {
console.log("file operation was called!!!!!!")


}



export function getS3Objects() { 


    console.log("in GetFileObject test.csv");


    let fileKey = 'ClientTestFile.csv';
    var AWS = require('aws-sdk');
    var s3 = new AWS.S3();
    var options = {
        Bucket    : 's3://clientfilesbucketb-dev/ClientTestFile.csv',
        Key    : fileKey,
    };

    console.log("in GettingFileObject");


    let fileStream = s3.getObject(options).createReadStream();

console.log("Got FileStream",fileStream);






//https://clientfilesbucketb-dev.s3.amazonaws.com/0a7f04d1-fa35-4fd6-8183-f27582f0a768




}



export function getS3Objectsold() { 

    let s3 = new AWS.S3();
        console.log("getting s3 objects from bucket ",bucketname)


//let datab = undefined
var params = {Bucket: bucketname, Key: '0a7f04d1-fa35-4fd6-8183-f27582f0a768'}


console.log("using params ",params)

let records = [];


console.log("getting readstream")


let readStream  = s3.getObject(params).createReadStream();
console.log("gor readstream")

console.log("getting linereader")

let lineReader = readLine.createInterface({ input: readStream });
console.log("gor linereader")

lineReader.on('line', line => {
    console.log("Lining")
    records.push(line);
console.log("line: ",line)


 }).on('close', () => {
    console.log('Finished processing S3 file with record count:',records.length)

     //resolve(records);

});
//let readStream = S3.getObject(s3Config).createReadStream();


//let readStream = S3.getObject(s3Config).createReadStream();







 

  }







