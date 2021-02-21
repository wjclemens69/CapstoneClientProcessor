import 'source-map-support/register'
import * as AWS from 'aws-sdk'
import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'
import { getUserId } from '../utils'



const bucketName = process.env.CLIENTFILES_FILEBUCKET
const tableName = process.env.FILESTATUS_TABLEC

const todoClient = new AWS.DynamoDB.DocumentClient()



const s3 = new AWS.S3({
    signatureVersion: 'v4'
})


export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    console.log("Event Add Todo: ",event)
    const todoId = event.pathParameters.fileKey
    const userId = getUserId(event);
    console.log("got user id ", userId)

    const url = await updateURL(todoId)


    console.log("Got the url", url)

    return {
        statusCode: 201,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Credentials': true
        },
        body: JSON.stringify({ "uploadUrl": url })


    }


    async function updateURL(todoId: string): Promise<String> {
        console.log("todoid = ",todoId)
        
        console.log("getting signed")

        const url = s3.getSignedUrl('putObject', {
            Bucket: bucketName,
            Key: todoId,
            Expires: 300
        })

        console.log("got it?")

        const attachmentUrl: string = 'https://' + bucketName + '.s3.amazonaws.com/' + todoId
        
        const options = {
            TableName: tableName,
            Key: {
                clientId: userId,
                fileKey: todoId
            },
            UpdateExpression: "set fileUrl = :r",
            ExpressionAttributeValues: {
                ":r": attachmentUrl
            },
            ReturnValues: "UPDATED_NEW"
        };
        await todoClient.update(options).promise()

        return url;
    }
} 