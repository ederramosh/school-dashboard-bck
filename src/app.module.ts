import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { StudentModule } from './student/student.module';
import 'dotenv/config';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.URI_MONGO),
    AuthModule,
    StudentModule,
  ],
})
export class AppModule {}
