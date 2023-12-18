import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterModule } from '@angular/router';

import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models';
import { ConfirmMessageComponent } from '../shared';
@Component({
  selector: 'app-list-employees',
  standalone: true,
  imports: [
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule,
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatSnackBarModule,
    RouterModule,
  ],
  templateUrl: './list-employees.component.html',
  styleUrl: './list-employees.component.css',
})
export class ListEmployeesComponent implements AfterViewInit {
  displayedColumns: string[] = [
    'name',
    'email',
    'civilStatus',
    'dateGetIn',
    'sex',
    'phone',
    'actions',
  ];
  dataSource: MatTableDataSource<Employee>;

  listEMployees: Employee[] = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private _employeeService: EmployeeService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {
    this.dataSource = new MatTableDataSource();
  }

  ngAfterViewInit() {
    this.chargeEMployees();
    this.dataSource = new MatTableDataSource(this.listEMployees);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  chargeEMployees() {
    this.listEMployees = this._employeeService.getEmployees();
    this.dataSource = new MatTableDataSource(this.listEMployees);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 30000,
    });
  }

  deteleEmployee(index: number) {
    const dialogRef = this.dialog.open(ConfirmMessageComponent, {
      width: '350px',
      data: { message: 'are you sure that you want delete the employee?' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'accept') {
        this.openSnackBar('The EMployee was deleted successfully.', '');
        this._employeeService.deleteEmployee(index);
        this.chargeEMployees();
      }
    });
  }
}
