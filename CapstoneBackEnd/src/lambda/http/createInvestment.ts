import 'source-map-support/register'
import { createLogger } from '../../utils/logger'
import {createInvestmentItem} from '../dataAccess/investmentData'
import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'
import { ClientInvestmentItem } from '../../Types/ClientInvestmentItem'

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

    const logger = createLogger('createFileStatus')
    const newInvestment: ClientInvestmentItem = JSON.parse(event.body)
    logger.info("Adding new todo = " + newInvestment.cUSIP)
    const investmentItem = await createInvestmentItem(newInvestment)
    console.log("investment created lambda")


return {
    statusCode: 201,
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Credentials': true
    },
    body: JSON.stringify({item: investmentItem})
}

 
 
}
