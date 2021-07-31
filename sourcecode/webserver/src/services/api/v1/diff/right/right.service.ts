// Initializes the `api/v1/diff/right` service on path `/api/v1/diff/right`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../../../../declarations';
import { Right } from './right.class';
import createModel from '../../../../../models/right.model';
import hooks from './right.hooks';

// Add this service to the service type index
declare module '../../../../../declarations' {
  interface ServiceTypes {
    'api/v1/diff/right': Right & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
  };

  // Initialize our service with any options it requires
  app.use('/api/v1/diff/right', new Right(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('api/v1/diff/right');

  service.hooks(hooks);
}
