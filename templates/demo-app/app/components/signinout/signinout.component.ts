import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { select } from 'ng2-redux';

import { UserActions }  from '../../actions/user/user.actions';
import { UserFormActions } from '../../actions/user-form/user-form.actions';
import { ErrorHandlerActions } from '../../actions/error/error-handler.actions';

@Component({
  selector: 'signinout',
  providers: [UserActions, UserFormActions],
  templateUrl: './signinout.component.html',
  styleUrls: ['./signinout.component.scss']
})
export class SignInOutComponent implements OnInit {
  @select('user') user$: Observable<any>;
  @select('userForm') userForm$: Observable<any>;

  constructor(
    private userActions: UserActions,
    private userFormActions: UserFormActions,
    private errorHandler: ErrorHandlerActions) { }

  ngOnInit() {
    this.userActions.getMe();
  }
}
