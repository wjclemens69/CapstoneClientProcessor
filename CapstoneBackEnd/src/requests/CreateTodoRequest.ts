/**
 * Fields in a request to create a single TODO item.
 */
export interface CreatefileStatusRequest {
   fileKey: string
    clientId: string
    processed: string
   
    uploadeDate: string
    fileUrl: string
  fileName: string
  dueDate: string
}



export interface CreateTodoRequestb {
  name: string
  dueDate: string
}


