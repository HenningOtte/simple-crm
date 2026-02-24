import { Routes } from '@angular/router';
import { Dashboard } from './dashboard/dashboard';
import { User } from './user/user';
import { UserDetail } from './user-detail/user-detail';

export const routes: Routes = [
  { path: 'dashboard', component: Dashboard },
  { path: 'user', component: User },
  { path: 'user/:id', component: UserDetail },
];
