export class apiError {
    constructor(
        statusCode,
        message ,
        errors = [],
    ) {
        this.message=message;
        this.statusCode = statusCode;

    }
}
