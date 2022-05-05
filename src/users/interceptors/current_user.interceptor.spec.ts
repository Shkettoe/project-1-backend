import { CurrentUserInterceptor } from './current_user.interceptor';

describe('CurrentUserInterceptor', () => {
  it('should be defined', () => {
    expect(new CurrentUserInterceptor()).toBeDefined();
  });
});
