export class apiResponse{
    constructor(
        message="succesfull",
        statusCode,
        data,
    ){
        this.message=message
        this.data=data
        this.statusCode=statusCode
    }
}