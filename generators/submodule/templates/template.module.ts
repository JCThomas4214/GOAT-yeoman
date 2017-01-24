import { NgModule }                                  from '@angular/core';
import { SharedModule }                              from '../../shared/shared.module';
import { <%= modulename %>RoutingModule }            from './<%= fname %>-routing.module';

// import your components below
import { <%= modulename %>Component }                from './<%= fname %>.component';

@NgModule({
  imports:      [ SharedModule, <%= modulename %>RoutingModule ],
  declarations: [
  	// List your components here
    <%= modulename %>Component
  ]
})
export class <%= modulename %>Module { }