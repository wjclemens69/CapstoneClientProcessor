import 'source-map-support/register'
//import { getUserId } from '../utils'
import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'
import { getUserId } from '../utils'
import {deleteItem as deleteFileStatus} from '../dataAccess/fileStatusData'


export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const clientId = getUserId(event)


    const fileKey = event.pathParameters.fileKey

    console.log("Trying to delete ", fileKey)

   

    const deleteFileStatusResult = await deleteFileStatus(fileKey, clientId)


    

    return {
        statusCode: 201,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Credentials': true
        },
        body: JSON.stringify(deleteFileStatusResult)




    }
}


