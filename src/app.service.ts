import { Injectable } from '@nestjs/common'

@Injectable() // decorator - annotation
export class AppService {
  hello(): string {
    return 'Hello World!'
  }
}
