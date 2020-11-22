import { TypeOrmModule } from '@nestjs/typeorm'
import { join } from 'path'

export default TypeOrmModule.forRoot({
  type: 'mysql',
  host: '92.38.171.129',
  port: 3306,
  username: 'root',
  password: 'Zx171260225!',
  database: 'iw',
  entities: [join(__dirname, '**', '*.entity{.ts,.js}')],
  synchronize: true,
  logging: [, /* 'query' */ 'error' /* 'debug' */],
  /*   logger: 'debug',
   */
})
