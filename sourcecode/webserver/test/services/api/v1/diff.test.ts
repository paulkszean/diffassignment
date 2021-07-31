import app from '../../../../src/app';

describe('\'api/v1/diff\' service', () => {
  it('registered the service', () => {
    const service = app.service('api/v1/diff');
    expect(service).toBeTruthy();
  });
});
