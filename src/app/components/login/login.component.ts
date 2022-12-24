import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { LoginUser } from 'src/app/interfaces/loginUser';
import { ApiService } from 'src/app/services/api.service';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import { RegisterComplementComponent } from '../register-complement/register-complement.component';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  formRegister!: FormGroup;
  formLogin!: FormGroup;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private fb: FormBuilder,
    private modal: MatDialog,
    private api: ApiService,
    private localStorage: LocalstorageService,
    private utils: UtilsService
  ) {}

  ngOnInit() {
    this.initForms();
  }

  initForms() {
    this.formRegister = this.fb.group({
      name: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      age: [null, [Validators.required]],
    });

    this.formLogin = this.fb.group({
      email: ['cox@email.com ', [Validators.required, Validators.email]],
      password: ['123', [Validators.required]],
    });
  }

  openComplementModal() {
    this.modal.open(RegisterComplementComponent, {
      width: '36rem',
      autoFocus: false,
      maxHeight: '90vh',
      data: {
        data: this.createDataDialog(),
      },
    });
  }

  login() {
    if (this.isValidForm()) {
      const { email } = this.createPayLoad();

      this.api
        .loginUser(this.createPayLoad())
        .pipe(takeUntil(this.destroy$))
        .subscribe((res: LoginUser) => {
          let { token } = res;
          this.localStorage.setLocalStorage('token', token);
          this.localStorage.setLocalStorage('user', email);
          this.utils.showSuccess('Login realizado com sucesso!');
        });
    }
  }

  isValidForm(): boolean {
    return this.formLogin.valid;
  }

  createPayLoad(
    email = this.getControlValue(this.formLogin, 'email'),
    password = this.getControlValue(this.formLogin, 'password')
  ) {
    const payload = {
      email,
      password,
    };

    return payload;
  }

  createDataDialog(
    name = this.getControlValue(this.formRegister, 'name'),
    email = this.getControlValue(this.formRegister, 'email'),
    age = this.getControlValue(this.formRegister, 'age')
  ) {
    const dataDialog = {
      name,
      email,
      age,
    };

    return dataDialog;
  }

  getControlValue(form: FormGroup, control: string) {
    return form.controls[control].value;
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
