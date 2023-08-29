import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { Teacher } from './entities/teacher.entity';

@Injectable()
export class TeacherService {

  constructor(
    @InjectModel( Teacher.name )
    private readonly teacherModel: Model<Teacher>,
  ) {}

  async create(createTeacherDto: CreateTeacherDto) {
    try {
      const teacher = await this.teacherModel.create( createTeacherDto );
      return teacher;
    } catch (error: any) {
      this.handleExceptions(error);
    }
  }

  //we need to create a login

  findAll() {
    return `This action returns all teacher`;
  }

  findOne(id: number) {
    return `This action returns a #${id} teacher`;
  }

  update(id: number, updateTeacherDto: UpdateTeacherDto) {
    return `This action updates a #${id} teacher`;
  }

  remove(id: number) {
    return `This action removes a #${id} teacher`;
  }

  private handleExceptions(error: any) {
    if( error.code === 11000) {
      throw new BadRequestException('Teacher already created');
    }
    console.log(error);
    throw new InternalServerErrorException(`Can't create the user - check the server logs`);
  }
}
