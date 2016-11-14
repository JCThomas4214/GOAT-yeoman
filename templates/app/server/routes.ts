/**
 * Main application routes
 */
import {authRoutes} from './auth/auth.router';
import {userRoutes} from './api/user/user.router';
import {wonderRoutes} from './api/wonder/wonder.router';
<%- routerImports.join('\n') %>

export function routes(app) {
  	// Insert routes below
  	app.use('/auth', authRoutes);
  	app.use('/api/users', userRoutes);
  	app.use('/api/wonders', wonderRoutes);
  	<%- expressRouters.join('\n\t') %>
};
