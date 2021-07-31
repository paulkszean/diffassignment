import verifyPostPayload from '../../../../../hooks/verify-post-payload';

export default {
  before: {
    all: [],
    find: [],
    get: [],
    create: [verifyPostPayload],
    update: [],
    patch: [],
    remove: [],
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },
};
