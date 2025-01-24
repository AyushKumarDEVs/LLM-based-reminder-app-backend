export class apiError extends Error {
    constructor(
        statusCode,
        message = "Something went wrong",
        errors = [],
    ) {
        // Pass the error message to the parent Error class
        super(message);
        this.statusCode = statusCode;
        this.errors = errors;

        // Maintain proper stack trace (optional but helpful for debugging)
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, apiError);
        }
    }
}
