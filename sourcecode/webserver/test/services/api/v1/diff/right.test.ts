import app from '../../../../../src/app';

describe('\'api/v1/diff/right\' service', () => {
  it('registered the service', () => {
    const service = app.service('api/v1/diff/right');
    expect(service).toBeTruthy();
  });
});
