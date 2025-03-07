import { ErrorCodes, HttpException } from "./root";

export class UnAuthorizedExceptions extends HttpException {
    constructor (message:string, errorCode:ErrorCodes){
        super (message,errorCode,401,null)
    }
}