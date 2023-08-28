import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Student } from './entities/student.entity';

@Injectable()
export class StudentService {

  constructor(
    @InjectModel( Student.name )
    private readonly studentModel: Model<Student>,
  ) {}

  async create(createStudentDto: CreateStudentDto) {
    
    try {
      
      const student = await this.studentModel.create( createStudentDto );
      return student;

    } catch (error: any) {
      if( error.code === 11000) {
        throw new BadRequestException('Student already created');
      }
      console.log(error);
      throw new InternalServerErrorException(`Can't create the user - check the server logs`);
    }
  }

  findAll() {
    return `This action returns all student`;
  }

  findOne(id: number) {
    return `This action returns a #${id} student`;
  }

  update(id: number, updateStudentDto: UpdateStudentDto) {
    return `This action updates a #${id} student`;
  }

  remove(id: number) {
    return `This action removes a #${id} student`;
  }
}
