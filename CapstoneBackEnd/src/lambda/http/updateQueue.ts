import 'source-map-support/register'
import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'

//import { QueueItem } from '../../requests/NewQueueItem'

import {UpdateQueue} from '../dataAccess/queueData'


export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const fileKey = event.pathParameters.fileKey

    console.log("event body for queu update: ", event.body)
   
    const updateResult = await UpdateQueue(fileKey)
    return {
        statusCode: 201,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Credentials': true
        }, body: JSON.stringify({ item: { cupdatedTodo: updateResult } })

    }



  
}


