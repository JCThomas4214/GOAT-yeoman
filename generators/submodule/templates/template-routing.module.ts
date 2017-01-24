import { NgModule }            from '@angular/core';
import { RouterModule }        from '@angular/router';

import { <%= modulename %>Component }    from './<%= fname %>.component';

@NgModule({
  imports: [RouterModule.forChild([
    { path: '', component: <%= modulename %>Component }
  ])],
  exports: [RouterModule]
})
export class <%= modulename %>RoutingModule {}