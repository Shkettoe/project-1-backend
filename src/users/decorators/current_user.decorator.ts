import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUser = createParamDecorator((d:never, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest()
    return request.userCurrent
})
