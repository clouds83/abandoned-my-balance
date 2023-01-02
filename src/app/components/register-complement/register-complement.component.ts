import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';
import { FormValidations } from 'src/app/shared/validations/form-validations';
import { Subject, takeUntil } from 'rxjs';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import { RegisterUser } from 'src/app/interfaces/registerUser';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-register-complement',
  templateUrl: './register-complement.component.html',
  styleUrls: ['./register-complement.component.scss'],
})
export class RegisterComplementComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  preview!: any;
  isDefault = true;
  defaultImage = '../../../assets/images/avatar-default.png';
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private api: ApiService,
    private localStorage: LocalstorageService,
    private utils: UtilsService
  ) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.form = this.fb.group({
      name: [this.data.data?.name, Validators.required],
      email: [this.data.data?.email, [Validators.required, Validators.email]],
      age: [this.data.data?.age, Validators.required],
      image: [null],
      password: [null, [Validators.required]],
      confirmPassword: [
        null,
        [Validators.required, FormValidations.equalsTo('password')],
      ],
    });
  }

  onChange(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      this.isDefault = false;

      const file = event.target.files[0];

      const reader = new FileReader();

      reader.onload = (e) => (this.preview = reader.result);

      reader.readAsDataURL(file);

      this.form.patchValue({
        image: file,
      });
    }
  }

  createFormPayload(
    name = this.getControlValue(this.form, 'name'),
    email = this.getControlValue(this.form, 'email'),
    age = this.getControlValue(this.form, 'age'),
    image = this.getControlValue(this.form, 'image'),
    password = this.getControlValue(this.form, 'password'),
    confirmPassword = this.getControlValue(this.form, 'confirmPassword')
  ) {
    const payload = {
      name,
      email,
      age,
      image,
      password,
      confirmPassword,
    };

    return payload;
  }

  getControlValue(form: FormGroup, control: string) {
    return form.controls[control].value;
  }

  submit() {
    if (this.isFormValid()) {
      this.api
        .registerUser(this.createFormPayload())
        .pipe(takeUntil(this.destroy$))
        .subscribe((res: RegisterUser) => {
          this.utils.showSuccess(res.message);
          this.localStorage.setLocalStorage(
            'userInfo', //TODO só é salvo na criação de usuário
            JSON.stringify(res.user)
          );
          this.refreshPage();
        });
    }
  }

  isFormValid(): boolean {
    return this.form.valid;
  }

  refreshPage() {
    setTimeout(() => {
      location.reload();
    }),
      3000;
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe;
  }
}
