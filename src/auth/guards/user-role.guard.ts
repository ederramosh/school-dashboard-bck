import { Reflector } from '@nestjs/core';
import { CanActivate, ExecutionContext, Injectable, BadRequestException, ForbiddenException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { User } from '../entities/user.entity';
import { META_ROLES } from '../constant/constant';

@Injectable()
export class UserRoleGuard implements CanActivate {

  constructor( private readonly reflector: Reflector ) {}
  
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const validRoles: string[] = this.reflector.get( META_ROLES, context.getHandler() );

    if( !validRoles || !validRoles.length ) return true;

    const user: User = context.switchToHttp().getRequest().user;

    if( !user )
      throw new BadRequestException( 'User not found' )
    
    for( const rol of user.rol ) {
      if( validRoles.includes( rol ) ) return true;
    }

    throw new ForbiddenException( `User '${ user.fullname }' need a valid role: [${ validRoles }]`);
  }
}