import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { User } from './entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { IJwtPayload } from './interfaces/jwt-payload.interface';
import { LoginUserDto } from './dto/login-auth.dto';

@Injectable()
export class AuthService {

  constructor(
    @InjectModel( User.name )
    private readonly userModel: Model<User>,
    private readonly jwtService: JwtService,
  ) {}

  async create(createAuthDto: CreateAuthDto) {
    try {
      const { email, password, fullname, isActive, rol  } = createAuthDto;
      const newUser = { email, fullname, isActive, rol }
      // const user = await this.userModel.create( createAuthDto );
      const user = await this.userModel.create( 
        { 
          ...newUser, 
          password: bcrypt.hashSync( password, 10 )
        }
      );
      
      const userCreated = user.toObject();
      delete userCreated.password;
      return {
        token: this.getJwtToken( { email: user.email} ),
        userCreated
      };

    } catch (error: any) {
        if( error.code === 11000 ) {
          throw new BadRequestException(`User already exists in db ${JSON.stringify( error.keyValue )}`);
        }
        console.log(error);
        throw new InternalServerErrorException(`Can't create the user - check the server logs`);
    }
  }

  async login( loginUserDto: LoginUserDto ) {
    const { email, password } = loginUserDto;

    const user = await this.userModel.findOne({ email: email }).select({"email": 1, "password": 1});

    if( !user || !bcrypt.compareSync( password, user.password ))
      throw new UnauthorizedException( 'Invalid credentials' );
    
      return {
        token: this.getJwtToken( { email: user.email} ),
        user
      };
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }

  private getJwtToken( payload: IJwtPayload ) {
    return this.jwtService.sign( payload );
  }

}
