import { Injectable } from '@angular/core';

import { Employee } from '../models';
@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  listEMployees: Employee[] = [
    {
      civilStatus: 'alone',
      email: 'example.com',
      dateGetIn: new Date(),
      fullName: 'example employee 1',
      phone: '1233443434',
      sex: 'male',
    },
    {
      civilStatus: 'alone',
      email: 'example.com',
      dateGetIn: new Date(),
      fullName: 'example employee 2',
      phone: '1233443434',
      sex: 'male',
    },
    {
      civilStatus: 'married',
      email: 'example.com',
      dateGetIn: new Date(),
      fullName: 'example employee 3',
      phone: '1233443434',
      sex: 'female',
    },
  ];
  constructor() {}

  getEmployees() {
    return this.listEMployees.slice();
  }

  getEmployee(index: number) {
    return this.listEMployees.find((item, i) => i === index) || {};
  }

  deleteEmployee(index: number) {
    this.listEMployees.splice(index, 1);
  }

  saveEmployee(employee: Employee) {
    this.listEMployees.unshift(employee);
  }

  editEmployee(employee: Employee, index: number) {
    console.log(typeof index);

    this.listEMployees = this.listEMployees.map((item, i) => {
      if (i === index) {
        return employee;
      }
      return item;
    });
    console.log(this.listEMployees);
  }
}
