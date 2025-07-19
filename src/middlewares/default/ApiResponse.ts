// utils/ApiResponse.ts
export default class ApiResponse {
     constructor(public success: boolean, public message: string, public data: any = null) {
          if (!data) delete this.data;
     }
}
