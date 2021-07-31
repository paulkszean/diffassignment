import app from '../../../../../src/app';

describe('\'api/v1/diff/left\' service', () => {
  it('registered the service', () => {
    const service = app.service('api/v1/diff/left');
    expect(service).toBeTruthy();
  });
});
