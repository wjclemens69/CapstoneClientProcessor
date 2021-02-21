import 'source-map-support/register'




import { getUserId } from '../utils'
import { createLogger } from '../../utils/logger'

import {createFileStatus as createFileStatus} from '../dataAccess/fileStatusData'


import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'


import { CreatefileStatusRequest } from '../../requests/CreateTodoRequest'



export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

    const logger = createLogger('createFileStatus')
    const newStatus: CreatefileStatusRequest = JSON.parse(event.body)
    logger.info("Adding new todo = " + newStatus.fileName)


    const userId = getUserId(event)
    
    const todoItem = await createFileStatus(newStatus, userId)
console.log("todo created hmmmmm")


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


