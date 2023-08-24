import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from "passport-jwt";
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../entities/user.entity';
import { IJwtPayload } from '../interfaces/jwt-payload.interface';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy( Strategy ) {
    
    constructor (
        @InjectModel( User.name )
        private readonly userModel: Model<User>,
        configService: ConfigService,
      ) {
        super ( {
            secretOrKey: configService.get( 'JWT_SECRET' ),
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        } );
      }

    async validate ( payload: IJwtPayload ): Promise<User> {
        const { email } = payload;

        const user = await this.userModel.findOne({ email });

        if( !user ) throw new UnauthorizedException( 'Token not valid' );

        if( !user.isActive ) throw new UnauthorizedException( 'User is inactive, talk with an admin' );

        return user;
    }
}