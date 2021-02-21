import * as AWSXray from 'aws-xray-sdk'

//import { createLogger } from '../../utils/logger'
import 'source-map-support/register'
import * as AWS from 'aws-sdk'
//import { UpdateFileStatusRequest as UpdateFileStatusRequest } from '../../requests/UpdateTodoRequest'

//import { getUserId } from '../utils'
import { QueueItem } from '../../requests/NewQueueItem'

//import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'
const queueTable = process.env.FILESPROCESSINGQUEUE_TABLE






export async function addToProcessingQueue(newqeueu: QueueItem) {
    const XAWS = AWSXray.captureAWS(AWS)
    const queueClient = new XAWS.DynamoDB.DocumentClient()
   //const todoClient = new AWS.DynamoDB.DocumentClient()
    console.log("creating new queue with ",newqeueu.clientId," ",newqeueu.fileProcessed,newqeueu.fileKey)


//    logger.info("creating new to do based on :" + toDoForPost)

    await queueClient.put({
        TableName: queueTable,
        Item: newqeueu

    }).promise()
    console.log("DONE!!! creatig file status with ",newqeueu.clientId," ",newqeueu.fileProcessed)

  //  logger.info("creating new to do based on :" + toDoForPost + "has been created")
    return newqeueu






}

export async function getOutstandingQueuItem() {

    const XAWS = AWSXray.captureAWS(AWS)
    const todoClient = new XAWS.DynamoDB.DocumentClient()
    
console.log("getting items from table ", queueTable, " for process = 'false")

   // const logger = createLogger('getFileStatusByFK')
    //logger.info()

    //{ 
        //TableName: 'Configs',
        //IndexName: 'publisher_index',
       // KeyConditionExpression: 'publisherId = :pub_id',
       // ExpressionAttributeValues: { ':pub_id': '700'} 
       //}



    const params = {
        TableName: queueTable,
        IndexName: 'processedIndex',
        KeyConditionExpression: 'fileProcessed = :fileProcessed',
        ExpressionAttributeValues: {
            ':fileProcessed': 'false'
        },
        ScanIndexForward: false
    };
    const result = await todoClient.query(params).promise()
    return result





}

//export async function UpdateQueue(updatedqueueItem: QueueItem,fileKey:string) {
    export async function UpdateQueue(fileKey:string) {


    const XAWS = AWSXray.captureAWS(AWS)
    const todoClient = new XAWS.DynamoDB.DocumentClient()




    const key = {
        fileKey: fileKey
        }

//updatedqueueItem.clientId


    var params = {
        TableName: queueTable,
        Key: key,
        
        //UpdateExpression: "set #fileProcessed = :fileProcessed, #clientId = :clientId",
        // ExpressionAttributeNames: {
        //     "#fileProcessed": "fileProcessed",
        //     "#clientId": "clientId"
           
        // },


        UpdateExpression: "set #fileProcessed = :fileProcessed",
        ExpressionAttributeNames: {
            "#fileProcessed": "fileProcessed"
            },

        ExpressionAttributeValues: {
            ":fileProcessed": 'true'
            //":fileProcessed": updatedqueueItem.fileProcessed
            
           
        },
        ReturnValues: "UPDATED_NEW"



    };

    await todoClient.update(params).promise();

    return "updatedqueueItem"


}

