import * as AWSXray from 'aws-xray-sdk'
import { createLogger } from '../../utils/logger'
import 'source-map-support/register'
import * as AWS from 'aws-sdk'
import * as  uuid from 'uuid'
import { UpdateFileStatusRequest as UpdateFileStatusRequest } from '../../requests/UpdateTodoRequest'
import { CreatefileStatusRequest } from '../../requests/CreateTodoRequest'
const filestatustablename = process.env.FILESTATUS_TABLEC

export async function getFileStatusByUser(clientId: string) {

    const XAWS = AWSXray.captureAWS(AWS)
    const todoClient = new XAWS.DynamoDB.DocumentClient()
    
    const logger = createLogger('Get file Status By User')
    logger.info("getting items from table ", filestatustablename, " for ", clientId)
    const params = {
        TableName: filestatustablename,
        Key: 'clientId',
        KeyConditionExpression: 'clientId = :clientId',
        ExpressionAttributeValues: {
            ':clientId': clientId
        },
        ScanIndexForward: false
    };
    const result = await todoClient.query(params).promise()
    return result

}

export async function getFileStatusByFileKey(fileKey: string) {

    const XAWS = AWSXray.captureAWS(AWS)
    const todoClient = new XAWS.DynamoDB.DocumentClient()
    
    const logger = createLogger('getFileStatusByFileKey')
    logger.info("getting items from table ", filestatustablename, " for ", fileKey)

    const params = {
        TableName: filestatustablename,
        IndexName: 'fileKeyIndex',
        KeyConditionExpression: 'fileKey = :fileKey',
        ExpressionAttributeValues: {
            ':fileKey': fileKey
        },
        ScanIndexForward: false
    };
    const result = await todoClient.query(params).promise()
    return result

}

export async function createFileStatus(newTodo: CreatefileStatusRequest, userId: string) {

    const XAWS = AWSXray.captureAWS(AWS)
    const todoClient = new XAWS.DynamoDB.DocumentClient()
    console.log("creatig file status with ",newTodo.fileName," ",newTodo.dueDate)

    const itemid = uuid.v4()
    const date = new Date().toLocaleString('en-US', { timeZone: 'UTC' })
    const name = newTodo.fileName
    const dueDate = newTodo.dueDate
    newTodo.fileKey = itemid
    newTodo.uploadeDate = date
    newTodo.clientId = userId
    newTodo.processed = "false"
    newTodo.fileUrl = ""
    newTodo.fileName = name

    const toDoForPost = {
        clientId: userId,
        fileKey: itemid,
        uploadDate: date,
        fileName: name,
        newFileName: name,
        dueDate: dueDate,
        done: false,
        attachmentUrl: ''

    }

    await todoClient.put({
        TableName: filestatustablename,
        Item: toDoForPost

    }).promise()
    console.log("File Status created with ",newTodo.fileName," ",newTodo.dueDate)

  //  logger.info("creating new to do based on :" + toDoForPost + "has been created")
    return toDoForPost






}


export async function UpdateItem(updatedTodo: UpdateFileStatusRequest, todoId: string, userId: string) {
    const logger = createLogger('UpdateTodo')


    const XAWS = AWSXray.captureAWS(AWS)
    const todoClient = new XAWS.DynamoDB.DocumentClient()
    const done = updatedTodo.processed
    const name = updatedTodo.fileName
    const dueDate = updatedTodo.dueDate
    console.log(todoId, ": ", updatedTodo)

    const key = {
        clientId: userId,
        fileKey: todoId,

    }



    var params = {
        TableName: filestatustablename,
        Key: key,

        UpdateExpression: "set #processed = :processed, #fileName = :fileName, #dueDate = :dueDate",
        ExpressionAttributeNames: {
            "#processed": "processed",
            "#fileName": "fileName",
            "#dueDate": "dueDate"
        },

        ExpressionAttributeValues: {
            ":processed": done,
            ":fileName": name,
            ":dueDate": dueDate
        },
        ReturnValues: "UPDATED_NEW"



    };

    logger.info("upadating todo with ID "+ todoId )


    await todoClient.update(params).promise();

logger.info(" todo updated "+ todoId )

    return updatedTodo


}


export async function deleteItem(itemId: string, userId: string) {

    const logger = createLogger('UpdateTodo')

    const XAWS = AWSXray.captureAWS(AWS)
    const itemClient = new XAWS.DynamoDB.DocumentClient()
    logger.info(" item deleting "+ itemId )


    const deleteTodo = await itemClient.delete({
        TableName: filestatustablename,
        Key: { clientId: userId, fileKey: itemId }
    }).promise()
    logger.info(" item deleted "+ itemId )


    return deleteTodo


}
