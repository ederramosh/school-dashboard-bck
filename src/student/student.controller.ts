import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { ValidRoles } from 'src/auth/constant/constant';

@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Post()
  @Auth( ValidRoles.ADMIN, ValidRoles.TEACHER )
  create(@Body() createStudentDto: CreateStudentDto) {
    return this.studentService.create(createStudentDto);
  }

  @Get()
  @Auth( ValidRoles.ADMIN )
  findAll() {
    return this.studentService.findAll();
  }

  @Get(':id')
  @Auth()
  findOne(@Param('id') id: string) {
    return this.studentService.findOne(id);
  }

  @Patch(':id')
  @Auth( ValidRoles.ADMIN, ValidRoles.TEACHER )
  update(@Param('id') id: string, @Body() updateStudentDto: UpdateStudentDto) {
    return this.studentService.update(id, updateStudentDto);
  }

  //Instead of delete, we will change the active status to false
  @Delete(':id')
  @Auth( ValidRoles.ADMIN )
  remove(@Param('id') id: string) {
    return this.studentService.remove(id);
  }
}
