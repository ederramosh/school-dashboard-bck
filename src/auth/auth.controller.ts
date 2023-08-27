import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, SetMetadata } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { LoginUserDto } from './dto/login-auth.dto';
import { GetUser } from './decorators/get-user.decorator';
import { User } from './entities/user.entity';
import { RawHeaders } from './decorators/raw-headers.decorator';
import { UserRoleGuard } from './guards/user-role.guard';
import { RoleProtected } from './decorators/role-protected.decorator';
import { ValidRoles } from './constant/constant';
import { Auth } from './decorators/auth.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  create(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.create(createAuthDto);
  }

  @Get('login')
  login(@Body() LoginUserDto: LoginUserDto) {
    return this.authService.login(LoginUserDto);
  }

  @Get('profile')
  @UseGuards( AuthGuard() )
  testingPrivateRoute( @RawHeaders() rawHeaders: string[], @GetUser() user: User, @GetUser( 'email' ) email: string ) {
    return {
      ok: true,
      message: 'You got it!!!',
      user,
      email,
      rawHeaders
    };
  }

  @Get('check-profile')
  @RoleProtected( ValidRoles.ADMIN )
  @UseGuards( AuthGuard(), UserRoleGuard )
  checkProfile( @GetUser() user: User ) {
    return {
      ok: true,
      message: 'You did it again!!',
      user
    }
  }

  @Get('check-profile-v2')
  @Auth( ValidRoles.ADMIN )
  checkProfileV2( @GetUser() user: User ) {
    return {
      ok: true,
      message: 'You did it again!!',
      user
    }
  }

  @Get()
  findAll() {
    return this.authService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
    return this.authService.update(+id, updateAuthDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }
}
