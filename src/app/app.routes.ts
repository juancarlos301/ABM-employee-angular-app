import { Routes } from '@angular/router';
import { AddEditEmployeeComponent, ListEmployeesComponent } from './components';

export const routes: Routes = [
  {
    path: '',
    component: ListEmployeesComponent,
  },
  {
    path: 'add',
    component: AddEditEmployeeComponent,
  },
  {
    path: 'edit/:id',
    component: AddEditEmployeeComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];
