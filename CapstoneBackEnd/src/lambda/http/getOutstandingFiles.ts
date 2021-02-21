//import { createLogger } from '../../utils/logger'
import 'source-map-support/register'
//import * as AWS from 'aws-sdk'
import {getOutstandingQueuItem} from '../dataAccess/queueData'
import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'



export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    // TODO: Get all TODO items for a current user
    //const logger = createLogger('getFileStatus')

    console.log("Queue request ",event)


    

    //logger.info("getting items from table ", fileStatusTableName, " for ", userId)
    
    const rresult = await getOutstandingQueuItem()
    console.log("o process = ",rresult)
    
    //logger.info("retrieved items from " + fileStatusTableName + " for user " + userId)
    const items = rresult.Items
    return {
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Credentials': true
        },
        body: JSON.stringify({ items})

    }

}