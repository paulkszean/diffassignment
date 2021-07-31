import { Application } from '../declarations';
import apiV1DiffLeft from './api/v1/diff/left/left.service';
import apiV1DiffRight from './api/v1/diff/right/right.service';
import apiV1Diff from './api/v1/diff/diff.service';
// Don't remove this comment. It's needed to format import lines nicely.

// Created three endpoints
// 1. apiV1DiffLeft = api/v1/diff/left. To store left data
// 2. apiV1DiffRight = api/v1/diff/left. To store left data
// 1. apiV1Diff = api/v1/diff/left. To store left data
export default function (app: Application): void {
  app.configure(apiV1DiffLeft);
  app.configure(apiV1DiffRight);
  app.configure(apiV1Diff);
}
 