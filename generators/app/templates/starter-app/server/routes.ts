/**
 * Main application routes
 */
import {userRoutes} from './mongo-db/api/user/user.router';
<%- routerImports.join('\n') %>
import {authRoutes} from './mongo-db/auth/auth.router';

export default function routes(app) {
  // Insert routes below
  app.use('/api/users', userRoutes);
  <%- expressRouters.join('\n\t') %>
  app.use('/auth', authRoutes);
};
