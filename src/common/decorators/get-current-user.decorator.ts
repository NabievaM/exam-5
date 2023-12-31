import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { JwtPayloadWithRefreshToken } from '../../types';

export const GetCurrentUser = createParamDecorator(
  (
    data: keyof JwtPayloadWithRefreshToken | undefined,
    context: ExecutionContext,
  ) => {
    const request = context.switchToHttp().getRequest();
    console.log(data);
    console.log(request.user);

    if (!data) return request.user;
    return request.user[data];
  },
);
