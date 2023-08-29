import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
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

  async findAll() {
    const teachers = await this.teacherModel.find();
    if( !teachers ) throw new NotFoundException(`There are not any teacher`);
    return teachers;
  }

  async findOne(id: string) {
    const teacher = await this.teacherModel.findOne({ teacher_id: id });

    if( !teacher ) throw new NotFoundException(`Teacher with id ${id} not founded`);
    return teacher;
  }

  async update(id: string, updateTeacherDto: UpdateTeacherDto) {
    const teacher = await this.findOne( id );
    try {
      await teacher.updateOne( updateTeacherDto );
      return { ...teacher.toJSON(), ...updateTeacherDto };
    } catch (error: any) {
      this.handleExceptions(error)
    }
  }

  async remove(id: string) {
    const { deletedCount } = await this.teacherModel.deleteOne( { teacher_id: id } )
    if( deletedCount === 0 ) {
      throw new BadRequestException(`Teacher with id ${id} not founded`);
    }
    return {
      status: "ok",
      messae: "Removed succefully"
    };
  }

  private handleExceptions(error: any) {
    if( error.code === 11000) {
      throw new BadRequestException('Teacher already created');
    }
    console.log(error);
    throw new InternalServerErrorException(`Can't create the user - check the server logs`);
  }
}
