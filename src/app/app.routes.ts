import { Routes } from '@angular/router';
import { Dashboard } from './dashboard/dashboard';
import { User } from './user/user';

export const routes: Routes = [
  { path: 'dashboard', component: Dashboard },
  { path: 'user', component: User },
];
