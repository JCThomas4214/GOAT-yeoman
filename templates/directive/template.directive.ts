import { Directive, Input } from '@angular/core';
import { TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({ selector: '[<%= namelower %>]' })
export class <%= directivename %>Directive {

  /*
    Steps after creation
    - finish the structural directive
    - connect to the approapriate scope (component, app.module {global})
  */

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
    ) { }

  @Input() set my<%= directivename %>(condition: boolean) {
    if (!condition) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }

  }
}