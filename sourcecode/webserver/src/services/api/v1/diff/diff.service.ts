// Initializes the `api/v1/diff` service on path `/api/v1/diff`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../../../declarations';
import { Diff } from './diff.class';
import createModel from '../../../../models/diff.model';
import hooks from './diff.hooks';

// Add this service to the service type index
declare module '../../../../declarations' {
  interface ServiceTypes {
    'api/v1/diff': Diff & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/api/v1/diff', new Diff(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('api/v1/diff');

  service.hooks(hooks);
}
