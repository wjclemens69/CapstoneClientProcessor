import {S3Handler,S3Event} from 'aws-lambda'
import 'source-map-support'
import {getFileStatusByFileKey} from '../dataAccess/fileStatusData'
import { QueueItem } from '../../requests/NewQueueItem'
import{addToProcessingQueue} from '../dataAccess/queueData'


export const handler: S3Handler = async(event: S3Event )=>{
 


console.log("getting by fk...");

  const rresult = await getFileStatusByFileKey(event.Records[0].s3.object.key)

 console.log("Items Client Id: ",rresult.Items[0].clientId)
console.log(rresult)

const newprocessItem:QueueItem = {clientId:rresult.Items[0].clientId,fileKey:rresult.Items[0].fileKey,fileProcessed:'false'}

const newProcess = await addToProcessingQueue(newprocessItem)

console.log("newProcess Is ",newProcess)

console.log("Upload Event key ",event.Records[0].s3.object.key)


}






