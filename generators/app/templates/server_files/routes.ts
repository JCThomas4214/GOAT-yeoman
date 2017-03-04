/**
 * Main application routes
 */
import {userRoutes} from './<%= defaultDb %>/api/user/user.router';
<%- routerImports.join('\\n') %>
import {authRoutes} from './<%= defaultDb %>/auth/auth.router';

export default function routes(app) {
  // Insert routes below
  app.use('/api/users', userRoutes);
  <%- expressRouters.join('\\n\\t') %>
  app.use('/auth', authRoutes);
};
