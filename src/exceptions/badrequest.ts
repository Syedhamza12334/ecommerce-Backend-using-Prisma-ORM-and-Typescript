import { ErrorCodes, HttpException } from "./root";

export class BadRequestExceptions extends HttpException {
    constructor (message:string, errorCode:ErrorCodes){
        super (message,errorCode,400,null)
    }
}