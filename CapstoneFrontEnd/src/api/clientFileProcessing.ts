import { authConfig } from '../config'
import * as AWS from 'aws-sdk';
import {CreateFileStatusRequest} from '../types/CreateFileStatusRequest'
import Axios from 'axios'
import { apiEndpoint } from '../config'



export async function checkClientFileQueu() {
 

  
  
  const response = await Axios.get(`${apiEndpoint}/queue`)

for(let i=0; i<response.data.items.length; i++){
  console.log("Updating file key ",i," ",response.data.items[i].fileKey); //use i instead of 0

  var fileKey  = response.data.items[i].fileKey
console.log("updating quew ")
const updateresponse = await Axios.patch(`${apiEndpoint}/queue/${fileKey}`)
console.log(updateresponse)

  var s3 = new AWS.S3({
    accessKeyId: authConfig.accessKeyId,
    secretAccessKey: authConfig.secretAccessKey
  })

  var bucketParams = {
    Bucket : 'capstoneclientfileprocessbuckete-dev',
    Key: fileKey
  };

  var dv = await s3.getObject(bucketParams).promise().then((data: any) => {
    console.log('file downloaded successfully',"s3 result = ",dv)

  let jstuff =JSON.parse(data.Body.toString('utf-8') )
 let objcars = jstuff as unknown as ClientRecord[] 
 for (var item of objcars) 
 {
 console.log("print a from  new function",item);
 }
  


 //let jstuff =JSON.parse(data.Body.toString('utf-8') )
//let objcars = jstuff as unknown as ClientRecord[] 
//for (var item of objcars) 
//{
//console.log("print a from  new function",item);
//}
 });




}




//const updateresponse = await Axios.patch(`${apiEndpoint}/queue/${fileKey}`)


  //console.log("q updated: ",updateresponse)





//  console.log("Response Items file key ",response.data.Items[0].fileKey)



  

  //console.log("response =    ",response)

  var keepgoing:boolean = true


  //while (keepgoing) {

    //console.log("Going....")
    // code block to be executed
//}


   //console.log("Access key ",authConfig.secretAccessKey)

// //0a5d3eae-b3c3-4f97-91b5-ba213659dcaa
// //'TestInput.json'
// var s3 = new AWS.S3({
//     accessKeyId: authConfig.accessKeyId,
//     secretAccessKey: authConfig.secretAccessKey
//   })

//   var bucketParams = {
//     Bucket : 'clientfilesbucketb-dev',
//     Key: '0a5d3eae-b3c3-4f97-91b5-ba213659dcaa'
//   };

//   var dv = s3.getObject(bucketParams).promise().then((data: any) => {
//     console.log('file downloaded successfully')

//  let jstuff =JSON.parse(data.Body.toString('utf-8') )
// let objcars = jstuff as unknown as ClientRecord[] 
// for (var item of objcars) 
// {
// console.log("print a from  new function",item);
// }
//  });
  
 }



// export async function createFileStatus(
//   idToken: string,
//   statusRequest: CreateFileStatusRequest
// ): Promise<CreateFileStatusRequest> {
//   const response = await Axios.post(`${apiEndpoint}/fileStatusb`,  JSON.stringify(statusRequest), {
//     headers: {
//       'Content-Type': 'application/json',
//       'Authorization': `Bearer ${idToken}`
//     }
//   })
//   return response.data.item
// }


interface ClientRecord{
  
    PURCHASEDATE: string,
    CANDYPURCHASED: string,
    CASHPAID: string,
    BUYERNAME: string 

}
