import { AuthorGuard } from './author.guard';

describe('AuthorGuard', () => {
  it('should be defined', () => {
    expect(new AuthorGuard()).toBeDefined();
  });
});
