/**
 * Fields in a request to update a single TODO item.
 */
export interface UpdateFileStatusRequest {
  fileName: string
  dueDate: string
  processed: boolean
}