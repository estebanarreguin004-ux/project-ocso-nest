import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';
import { EmployeesModule } from './employees/employees.module';
import { ProductsModule } from './products/products.module';
import { ProvidersModule } from './providers/providers.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ManagersModule } from './managers/managers.module';
import { LocationsModule } from './locations/locations.module';
import { RegionsModule } from './regions/regions.module';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { EXPIRES_IN, JWT_KEY } from './auth/Constants/jwt.constants';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    JwtModule.register({
      global: true, 
      secret: JWT_KEY,
      signOptions: { expiresIn: EXPIRES_IN },
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('host'),
        port: configService.get<number>('port') || 5432,
        username: 'postgres', 
        password: String(configService.get('pass')), 
        database: configService.get<string>('name'),
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
    EmployeesModule,
    ProductsModule,
    ProvidersModule,
    ManagersModule,
    LocationsModule,
    RegionsModule,
    AuthModule,
  ],
})
export class AppModule {}
