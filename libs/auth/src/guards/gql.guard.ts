import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthGuard } from '@nestjs/passport';
import { GqlExecutionContext } from '@nestjs/graphql';
import { isPublic } from '@lib/auth/decorators';
import { Reflector } from '@nestjs/core';

@Injectable()
export class GqlGuard extends AuthGuard('jwt') implements CanActivate {
  constructor(private reflector: Reflector) {
    super();
  }

  getRequest(ctx: ExecutionContext) {
    const _ctx = GqlExecutionContext.create(ctx);
    return _ctx.getContext().req;
  }
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const _isPublic = isPublic(context, this.reflector);
    if (_isPublic) {
      return true;
    }
    console.log(context);
    return super.canActivate(context);
  }
}
