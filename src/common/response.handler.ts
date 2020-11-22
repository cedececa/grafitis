import { Result } from './result.interface'

export class ResponseHandler {
  static JSON(object: any, message = '', code = 200): Result {
    return {
      code: code,
      message: message,
      data: object,
      succeed: object || object instanceof Array ? true : false,
    }
  }
}
