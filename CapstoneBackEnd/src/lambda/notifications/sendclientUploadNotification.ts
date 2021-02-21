import {S3Handler,S3Event} from 'aws-lambda'
import 'source-map-support'
import {getFileStatusByFileKey} from '../dataAccess/fileStatusData'
import { QueueItem } from '../../requests/NewQueueItem'
import{addToProcessingQueue} from '../dataAccess/queueData'

// import { CreateFileStatusRequest } from '../../requests/createFileStatusRequest'



// import * as AWSXray from 'aws-xray-sdk'
// import * as AWS from 'aws-sdk'
// import {CreateFileStatusRequest} from CreateFileStatusRequest;


//import {processFile} from '../FileOperations/fileProcessor'
//import {getS3Objects} from '../FileOperations/fileProcessor'


// import { createLogger } from '../../utils/logger'


export const handler: S3Handler = async(event: S3Event )=>{
 


console.log("getting by fk...");

  const rresult = await getFileStatusByFileKey(event.Records[0].s3.object.key)

  console.log("Items Length: ",rresult.Items.length)
  
  console.log("Items Client Id: ",rresult.Items[0].clientId)
  

console.log(rresult)

//const item:NewQueueItem = JSON.parse(rresult.Item[0])

//console.log("parsed Item ",item)
//


const newprocessItem:QueueItem = {clientId:rresult.Items[0].clientId,fileKey:rresult.Items[0].fileKey,fileProcessed:'false'}

const newProcess = await addToProcessingQueue(newprocessItem)

console.log("newProcess Is ",newProcess)





console.log("Upload Event key ",event.Records[0].s3.object.key)





//console.log("Upload Event record Info ",event.Records)
//console.log("Upload Event record 0 Info ",event.Records[0])

//getFileStatusByFileKey




// const logger = createLogger('createFileStatus')
    
// const XAWS = AWSXray.captureAWS(AWS)
// const todoClient = new XAWS.DynamoDB.DocumentClient()


// const itemid = uuid.v4()
// const date = new Date().toLocaleString('en-US', { timeZone: 'UTC' })
    
// var newFileStatusb:CreateFileStatusRequest;

// newFileStatusb.fileKey = event.Records[0].s3.object.key
// newFileStatusb.status = 'Not Started'
// newFileStatusb.createdAt = date




// var s3 = new AWS.S3({
//     accessKeyId: authConfig.accessKeyId,
//     secretAccessKey: authConfig.secretAccessKey
//   })

//   var bucketParams = {
//     Bucket : 'clientfilesbucketb-dev',
//     Key: '0a5d3eae-b3c3-4f97-91b5-ba213659dcaa'
//   };

//   var dv = s3.getObject(bucketParams).promise().then((data: any) => {
//     console.log('file downloaded successfully')

//  let jstuff =JSON.parse(data.Body.toString('utf-8') )
// let objcars = jstuff as unknown as ClientRecord[] 
// for (var item of objcars) 
// {
// console.log("print a from  new function",item);
// }
//  });




}






