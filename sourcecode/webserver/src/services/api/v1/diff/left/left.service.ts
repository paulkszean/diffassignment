// Initializes the `api/v1/diff/left` service on path `/api/v1/diff/left`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../../../../declarations';
import { Left } from './left.class';
import createModel from '../../../../../models/left.model';
import hooks from './left.hooks';

// Add this service to the service type index
declare module '../../../../../declarations' {
  interface ServiceTypes {
    'api/v1/diff/left': Left & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
  };

  // Initialize our service with any options it requires
  app.use('/api/v1/diff/left', new Left(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('api/v1/diff/left');

  service.hooks(hooks);
}
