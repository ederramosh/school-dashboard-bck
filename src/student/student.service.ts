import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
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
      this.handleExceptions(error);
    }
  }

  async findAll() {
    const students = await this.studentModel.find();
    return students;
  }

  async findOne(id: string) {
    const student = await this.studentModel.findOne({ student_id: id});

    if( !student ) throw new NotFoundException(`Student with id ${id} not founded`);

    return student;
  }

  async update(id: string, updateStudentDto: UpdateStudentDto) {
    const student = await this.findOne( id );
    try {
      await student.updateOne( updateStudentDto );
      return { ...student.toJSON(), ...updateStudentDto };
    } catch( error ) {
      this.handleExceptions(error);
    }

  }

  async remove(id: string) {
    const { deletedCount } = await this.studentModel.deleteOne( { student_id: id } );

    if( deletedCount === 0) {
      throw new BadRequestException(`Student with id ${id} not founded`);
    }

    return {
      status: "ok",
      message: 'Removed succefully',
    };
  }

  private handleExceptions(error: any) {
    if( error.code === 11000) {
      throw new BadRequestException('Student already created');
    }
    console.log(error);
    throw new InternalServerErrorException(`Can't create the user - check the server logs`);
  }
}
