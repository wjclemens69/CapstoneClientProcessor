
import * as AWSXray from 'aws-xray-sdk'
import 'source-map-support/register'
import * as AWS from 'aws-sdk'
import { ClientInvestmentItem } from '../../Types/ClientInvestmentItem'
const investmenttablename = process.env.INVESTMENTS_TABLE

export async function createInvestmentItem(newInvestment: ClientInvestmentItem) {

    const XAWS = AWSXray.captureAWS(AWS)
    const todoClient = new XAWS.DynamoDB.DocumentClient()
    console.log("creating investment with ",newInvestment.cUSIP," ",newInvestment.currentYield)

    await todoClient.put({
        TableName: investmenttablename,
        Item: newInvestment

    }).promise()
    console.log("DONE!!! created inv with ",newInvestment)

  //  logger.info("creating new to do based on :" + toDoForPost + "has been created")
    return newInvestment






}