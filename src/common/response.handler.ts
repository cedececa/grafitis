import { HttpException, HttpStatus } from '@nestjs/common'
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
  static HttpException(
    data: any = null,
    errorMessage = '',
    status: HttpStatus = HttpStatus.OK,
  ) {
    throw new HttpException(
      {
        status: status,
        message: errorMessage,
        data: data,
      },
      status,
    )
  }
}
