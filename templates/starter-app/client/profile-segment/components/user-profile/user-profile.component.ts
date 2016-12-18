import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { select } from 'ng2-redux';

import { UserActions }  from '../../../header-segment/actions/user/user.actions';

@Component({
  moduleId: module.id,
  selector: 'user-profile',
  providers: [UserActions],
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})

export class UserProfileComponent {

  @select('user') user$: Observable<any>;

}
