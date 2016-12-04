/**
 * Main application routes
 */
import {userRoutes} from './api/user/user.router';
<%- routerImports.join('\n') %>
import {authRoutes} from './auth/auth.router';

export function routes(app) {
    // Insert routes below
    app.use('/api/users', userRoutes);
    <%- expressRouters.join('\n\t') %>
    app.use('/auth', authRoutes);
};
