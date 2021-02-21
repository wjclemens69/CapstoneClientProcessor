import { authConfig } from '../config'
import * as AWS from 'aws-sdk';
import Axios from 'axios'
import { apiEndpoint } from '../config'
import {ClientInvestmentItem} from '../types/ClientInvestmentItem'


export async function checkClientFileQueu() {
  
 const response = await Axios.get(`${apiEndpoint}/queue`)

for(let i=0; i<response.data.items.length; i++){
 

  var fileKey  = response.data.items[i].fileKey
  var s3 = new AWS.S3({
    accessKeyId: authConfig.accessKeyId,
    secretAccessKey: authConfig.secretAccessKey
  })

  var bucketParams = {
    Bucket : 'capstoneclientfileprocessbuckete-dev',
    Key: fileKey
  };

  var dv = await s3.getObject(bucketParams).promise().then(async (data: any) => {


  let jstuff =JSON.parse(data.Body.toString('utf-8') )

  console.log("jstuff = ",jstuff)
 let objinvestments = jstuff as unknown as ClientInvestmentItem[] 
 console.log("objinvestments  length = ",objinvestments.length)
 console.log("objinvestments = ",objinvestments)

console.log("1st objinvestments client = ",objinvestments[0].clientId)




 for (var item of objinvestments) 
 {


 console.log("DOWNLOADED Investment Item","client Id = ",item.clientId);

 const addInvestment = await Axios.post(`${apiEndpoint}/investment`, JSON.stringify(item))
console.log("InvestmentAdded",addInvestment)

const updateresponse = await Axios.patch(`${apiEndpoint}/queue/${fileKey}`)
console.log(updateresponse)


 }


 });

}
  
 }

