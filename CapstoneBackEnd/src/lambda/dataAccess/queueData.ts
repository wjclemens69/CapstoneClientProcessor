import * as AWSXray from 'aws-xray-sdk'
import 'source-map-support/register'
import * as AWS from 'aws-sdk'
import { QueueItem } from '../../requests/NewQueueItem'
const queueTable = process.env.FILESPROCESSINGQUEUE_TABLE

export async function addToProcessingQueue(newqeueu: QueueItem) {
    const XAWS = AWSXray.captureAWS(AWS)
    const queueClient = new XAWS.DynamoDB.DocumentClient()
    console.log("creating new queue with ",newqeueu.clientId," ",newqeueu.fileProcessed,newqeueu.fileKey)
    await queueClient.put({
        TableName: queueTable,
        Item: newqeueu

    }).promise()
    console.log("DONE!!! creatig file status with ",newqeueu.clientId," ",newqeueu.fileProcessed)
    return newqeueu

}

export async function getOutstandingQueuItem() {

    const XAWS = AWSXray.captureAWS(AWS)
    const todoClient = new XAWS.DynamoDB.DocumentClient()
    
    console.log("getting items from table ", queueTable, " for process = 'false")
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
    export async function UpdateQueue(fileKey:string) {
    const XAWS = AWSXray.captureAWS(AWS)
    const todoClient = new XAWS.DynamoDB.DocumentClient()
    const key = {
        fileKey: fileKey
        }

    var params = {
        TableName: queueTable,
        Key: key,
        UpdateExpression: "set #fileProcessed = :fileProcessed",
        ExpressionAttributeNames: {
            "#fileProcessed": "fileProcessed"
            },

        ExpressionAttributeValues: {
            ":fileProcessed": 'true'
           
        },
        ReturnValues: "UPDATED_NEW"

    };

    await todoClient.update(params).promise();

    return "updatedqueueItem"


}

