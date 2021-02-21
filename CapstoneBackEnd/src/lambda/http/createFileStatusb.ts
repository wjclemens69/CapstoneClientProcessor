import 'source-map-support/register'
import { getUserId } from '../utils'
import { createLogger } from '../../utils/logger'
import {createFileStatus} from '../dataAccess/fileStatus'
import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'
import { CreateFileStatusRequest } from '../../requests/createFileStatusRequest'

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

    const logger = createLogger('createfileStatus')
    const newFileStatus: CreateFileStatusRequest = JSON.parse(event.body)
    logger.info("Adding new todo = " + newFileStatus.clientId)


    const userId = getUserId(event)
    
    const todoItem = await createFileStatus(newFileStatus, userId)
console.log("todo created")


return {
    statusCode: 201,
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Credentials': true
    },
    body: JSON.stringify({item: todoItem})
}

 
 
}
