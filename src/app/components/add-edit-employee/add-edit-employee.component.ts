import { Component, OnInit } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  MAT_RADIO_DEFAULT_OPTIONS,
  MatRadioModule,
} from '@angular/material/radio';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Employee } from '../../models';
import { EmployeeService } from '../../services/employee.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-edit-employee',
  standalone: true,
  imports: [
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    CommonModule,
    MatRadioModule,
    RouterModule,
    ReactiveFormsModule,
  ],
  templateUrl: './add-edit-employee.component.html',
  styleUrl: './add-edit-employee.component.css',
  providers: [
    {
      provide: MAT_RADIO_DEFAULT_OPTIONS,
      useValue: { color: 'primary' },
    },
  ],
})
export class AddEditEmployeeComponent implements OnInit {
  optionsCivilStatus = ['single', 'married', 'divorced'];

  myForm: FormGroup;

  idEmployee: any;
  action = 'create';

  constructor(
    private fb: FormBuilder,
    private _EmployeeService: EmployeeService,
    private route: Router,
    private _snackBar: MatSnackBar,
    private aRoute: ActivatedRoute
  ) {
    this.myForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.maxLength(20)]],
      phone: [
        '',
        [
          Validators.required,
          Validators.maxLength(10),
          Validators.minLength(10),
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
      dateGetIn: ['', [Validators.required]],
      civilStatus: ['', [Validators.required]],
      sex: ['', [Validators.required]],
    });
    this.idEmployee = this.aRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    if (this.idEmployee !== undefined) {
      this.action = 'edit';
      this.getEmployee(+this.idEmployee);
    }
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 30000,
    });
  }

  saveEmployee() {
    const employee: Employee = {
      fullName: this.myForm?.get('fullName')?.value || '',
      phone: this.myForm?.get('phone')?.value || '',
      email: this.myForm?.get('email')?.value || '',
      dateGetIn: this.myForm?.get('dateGetIn')?.value || '',
      civilStatus: this.myForm?.get('civilStatus')?.value || '',
      sex: this.myForm?.get('sex')?.value || '',
    };

    if (this.idEmployee !== undefined) {
      this.editEmployee(employee);
    } else {
      this.createEmployee(employee);
    }

    this.openSnackBar(
      `The EMployee was ${
        this.idEmployee !== undefined ? 'edited' : 'created'
      } successfully.`,
      ''
    );
    this.route.navigate(['/']);
  }

  getEmployee(index: number) {
    const employee = this._EmployeeService.getEmployee(index);
    this.myForm.patchValue(employee);
  }

  editEmployee(employee: Employee) {
    this._EmployeeService.editEmployee(employee, +this.idEmployee);
  }

  createEmployee(employee: Employee) {
    this._EmployeeService.saveEmployee(employee);
  }
}
