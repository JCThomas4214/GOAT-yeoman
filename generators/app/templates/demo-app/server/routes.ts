/**
 * Main application routes
 */
import {userRoutes} from './api/user/user.router';
import {wonderRoutes} from './api/wonder/wonder.router';
<%- routerImports.join('\n') %>
import {authRoutes} from './auth/auth.router';

export default function routes(app) {
  // Insert routes below
  app.use('/api/users', userRoutes);
  app.use('/api/wonders', wonderRoutes);
  <%- expressRouters.join('\n\t') %>
  app.use('/auth', authRoutes);
};
