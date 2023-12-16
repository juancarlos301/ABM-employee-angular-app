import { Injectable } from '@angular/core';

import { Employee } from '../models';
@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  listEMployees: Employee[] = [];
  constructor() {}

  getEmployees() {
    return this.listEMployees.slice();
  }
}
