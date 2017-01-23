/*
=========================================================================================================
Bootstrapping component
=========================================================================================================
//According to Angular best practices the App component should be used for bootstrapping the application.
//This component gets bootstrapped through app.module.ts, the magic occurs in the @NgModule decorater's bootstrap property,
//we set that value to the AppComponent class defined in this component
//then the app.module.ts gets invoked in the main.ts bootstrap method.
*/


//main imports
import { Component, ViewChild, AfterViewInit, ElementRef, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { NgRedux, select } from 'ng2-redux';
import { ErrorHandlerActions } from '../../actions/error/errorHandler.actions';
import { SEOActions } from '../../actions/seo/seo.actions';
import { Observable } from 'rxjs/Observable';

declare let TweenMax: any;
declare let TimelineMax: any;
declare let Power0: any;

//decorator
@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

//class which is implemented once the AfterViewInit event in tha Angular event lifecycle has fired.
//-- to learn more about Angular's event lifecycle read here: https://angular.io/docs/ts/latest/guide/lifecycle-hooks.html
export class AppComponent {
  //this decorator is for NgRedux. you can read more about Redux here: https://github.com/angular-redux/ng2-redux
  @select('error') error$: Observable<any>;

  private errorTimeline: any;

  //this decorator gabs the object associated with the #errorToast template variable assigned in the app.componnent.html file,
  //-- and assigns this object to the class variable errorToast
  @ViewChild('errorToast') errorToast: ElementRef;

  constructor(
    private errorHandler: ErrorHandlerActions,
    private el: ElementRef,
    private ref: ChangeDetectorRef
    ) {}

  ngAfterViewInit() {

    // initialize error handling animation timeline
    this.errorTimeline = new TimelineMax({ paused: true });
    this.errorTimeline
      .to(this.errorToast.nativeElement, 0, {display:'block',y:400})
      .to(this.errorToast.nativeElement, 1, {y:0})
      .to(this.errorToast.nativeElement, 1, {y:400, display:'none'}, "+=3")
      .add(() => this.errorHandler.hideError());

    // Let the component be in charge of triggering the animation
    this.error$.subscribe((error) => error.get('message') ? this.errorTimeline.play(0) : null);
  }
}