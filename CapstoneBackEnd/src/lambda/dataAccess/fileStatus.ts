import * as AWSXray from 'aws-xray-sdk'
import { createLogger } from '../../utils/logger'
import 'source-map-support/register'
import * as AWS from 'aws-sdk'
import * as  uuid from 'uuid'
import { CreateFileStatusRequest } from '../../requests/CreateFileStatusRequest'
const filestatustablename = process.env.FILESTATUS_TABLEC;

export async function createFileStatus(newFileStatus: CreateFileStatusRequest, clientId: string) {

    const logger = createLogger('createcreateFileStatus')


    const XAWS = AWSXray.captureAWS(AWS)
    const todoClient = new XAWS.DynamoDB.DocumentClient()

    const itemid = uuid.v4()
    const date = new Date().toLocaleString('en-US', { timeZone: 'UTC' })
    
    newFileStatus.fileKey = itemid
    newFileStatus.uploadeDate = date
    newFileStatus.processed = 'NotStarted'
    newFileStatus.clientId

    const fileStatusForPost = {
        clientId: clientId,
        fileKey: itemid,
        createdAt: date,
        status: 'NotStarted'
        
    }
    logger.info("creating new file status based on :" + fileStatusForPost)

    await todoClient.put({
        TableName: filestatustablename,
        Item: fileStatusForPost

    }).promise()

    logger.info("creating new to do based on :" + fileStatusForPost + "has been created")
    return fileStatusForPost

}