export class HttpException extends Error {
    message: string;
    errorCode:any;
    statusCode:number;
    error:ErrorCodes;




    constructor(message:string ,errorCode:ErrorCodes,statusCode:number,error:any){
        super(message)
        this.message=message
        this.errorCode=errorCode
        this.statusCode=statusCode
        this.error=error
    }
}


export enum ErrorCodes{
    USER_NOT_FOUND=1001,
    USER_ALREDAY_EXSITS=1002,
    INCORRECT_PASSWORD=1003,
    INPROCESSABLE_ENTITY=2001,
    INTERNAL_EXCEPTIONS=3000
}