import 'source-map-support/register'
import { getUserId } from '../utils'
import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'

import { UpdateFileStatusRequest as UpdateFileStatusRequest } from '../../requests/UpdateTodoRequest'

import {UpdateItem} from '../dataAccess/fileStatusData'


export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const fileKey = event.pathParameters.fileKey

    console.log("event body: ", event.body)

    const clientId = getUserId(event)

    const updatedFileStatus: UpdateFileStatusRequest = JSON.parse(event.body)
    
    const cupdatedTodo = await UpdateItem(updatedFileStatus, fileKey, clientId)
    return {
        statusCode: 201,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Credentials': true
        }, body: JSON.stringify({ item: { cupdatedTodo } })

    }



  
}




