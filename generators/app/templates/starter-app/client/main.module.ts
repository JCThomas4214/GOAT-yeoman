
/*
==============================================================
* Root Module
==============================================================
// Any assets included in this file will be attached
// to the global scope of the application.
*/

/*
--------------------------------------------------
Main component which gets bootstrapped
--------------------------------------------------
//Named AppComponent in compliance with Angular best practices
*/
import { AppComponent }                              from './main-segment/components/app/app.component';

/*
--------------------------------------------------
Modules
--------------------------------------------------
//other necessary modules for this app
*/
import { NgModule, isDevMode }                       from '@angular/core';
import { FormsModule }                               from '@angular/forms';
import { BrowserModule }                             from '@angular/platform-browser';
import { HttpModule, JsonpModule }                   from '@angular/http';
import { MaterialModule }                            from '@angular/material';
import { NgReduxModule, NgRedux, DevToolsExtension } from 'ng2-redux';
import { _NgRedux }                                  from './main-segment/actions/redux.sol';

/*
--------------------------------------------------
Routing
--------------------------------------------------
//enables navigation capabilities capitilizing on the browsers history stack
*/
import { routing }                                   from './routes';

/*
--------------------------------------------------
HTTP Requests
--------------------------------------------------
//imports to handle http events to send and receive data from api's
*/
import { Http, XHRBackend, RequestOptions }          from '@angular/http';
/*
--------------------------------------------------
Components
--------------------------------------------------
//Declare components here
*/
//user created components
import { HeaderComponent }                           from './header-segment/components/header/header.component';
import { NavBarComponent }                           from './header-segment/components/nav-bar/nav-bar.component';
import { SignInOutComponent }                        from './header-segment/components/sign-in-out/sign-in-out.component';
import { HomeComponent }                             from './main-segment/components/home/home.component';
import { Four0FourComponent }                        from './main-segment/components/404/four0four.component';
import { UserProfileComponent }                      from './profile-segment/components/user-profile/user-profile.component';
import { FooterComponent }                           from './footer-segment/components/footer/footer.component';
<%- newComponentImports.join('\n') %>

//Angular and 3rd party components

/*
--------------------------------------------------
Directives
--------------------------------------------------
//Declare directives here
*/
//user created directives

//Angular and 3rd party directives

/*
--------------------------------------------------
Services
--------------------------------------------------
//Declare services that need to be singletons here
*/
//user created services
import { ErrorHandlerActions }                       from './main-segment/actions/error/errorHandler.actions';
import { SEOActions }                                from './main-segment/actions/seo/seo.actions';
import { SocketService }                             from './main-segment/services/socketio/socketio.service';
import { HttpIntercept }                             from './main-segment/services/auth/auth.service';
import { UserService }                               from './header-segment/services/user/user.service';

//Angular and 3rd party serices
import { Cookie }                                    from 'ng2-cookies/ng2-cookies';

/*
--------------------------------------------------
Pipes
--------------------------------------------------
//Declare pipes here
*/
//User created pipes

//Angular and 3rd party pipes

/*
--------------------------------------------------
Non NPM libraries
--------------------------------------------------
//Declare all custom non npm libraries here
//There are thousands of non NPM javascript libraries, why limit ourselves!!
// ----- Note if possible also include a types definition file.
*/

/*
--------------------------------------------------
Redux Store Interface
--------------------------------------------------
//Declare import for redux store interface
*/
import { IAppState, rootReducer, enhancers }         from './store/index';
let createLogger = require('redux-logger');

/*
--------------------------------------------------
exported functions for AoT
--------------------------------------------------
*/
export function httpFactory(backend: XHRBackend, defaultOptions: RequestOptions) {
  return new HttpIntercept(backend, defaultOptions);
}

/*
--------------------------------------------------
NgModule
--------------------------------------------------
//decorator which packages all resources imported above for the app
//without this decorator Angular cannot use any of those above assets
*/
@NgModule({
  //imports: this object imports helper modules which are children in the module tree
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    JsonpModule,
    MaterialModule.forRoot(),
    NgReduxModule,
    routing
  ],
  //declarations: this object imports all child components which are used in this module
  declarations: [
    Four0FourComponent,
    UserProfileComponent,
    FooterComponent,
    SignInOutComponent,
    HeaderComponent,
    HomeComponent,
    AppComponent,
    NavBarComponent,
    <%= newComponents.join(',\n\t') %>
  ],
  //providers: this object imports all necessary services into the module
  providers: [
    {
      provide: Http,
      useFactory: httpFactory,
      deps: [XHRBackend, RequestOptions]
    },
    // ng2-rdux AoT workaround solution
    // { provide: NgRedux, useClass: _NgRedux },
    /////////////////////////////////////
    ErrorHandlerActions,
    SEOActions,
    SocketService,
    UserService,
    Cookie,
    { provide: DevToolsExtension, useClass: DevToolsExtension }
  ],
  //bootstrap: identifies which component is supposed to be bootstrapped
  bootstrap: [AppComponent]
})

//by convention the root module is called AppModule as stated in the Angular2 docs
//we call AppModule in main.ts to bootstrap the application which points to the AppComponent defined in @NgModule
export class MainModule {
  constructor(
    private ngRedux: NgRedux<IAppState>,
    private devTool: DevToolsExtension) {

    // configure the store here, this is where the enhancers are set
    this.ngRedux.configureStore(rootReducer, {},
      isDevMode() ? [createLogger({ collapsed: true })] : [],
      isDevMode() && devTool.isEnabled() ? [...enhancers, devTool.enhancer()] : [...enhancers]);
  }
}
