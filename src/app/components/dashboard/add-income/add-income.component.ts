import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IncomeCategory } from 'src/app/interfaces/incomeCategory';
import { LocalstorageService } from 'src/app/services/localstorage.service';

@Component({
  selector: 'app-add-income',
  templateUrl: './add-income.component.html',
  styleUrls: ['./add-income.component.scss'],
})
export class AddIncomeComponent implements OnInit {
  form!: FormGroup;
  incomeType!: string;
  incomeList!: IncomeCategory[];
  month!: string;
  monthList: string[] = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ];

  constructor(
    private fb: FormBuilder,
    @Inject(DOCUMENT) private document: any,
    private localStorage: LocalstorageService
  ) {}

  ngOnInit() {
    this.initForm();

    this.incomeList = [
      {
        name: 'Salário',
      },
      {
        name: 'Décimo terceiro',
      },
      {
        name: 'Rendimento',
      },
      {
        name: 'Décimo terceiro',
      },
      {
        name: 'Aluguel',
      },
    ];

    this.preventFutureDate();
  }

  initForm() {
    this.form = this.fb.group({
      incomeType: [null, Validators.required],
      incomeValue: [null, Validators.required],
      incomeDate: [null, Validators.required],
      incomeRepeat: [null],
    });
  }

  preventFutureDate() {
    const inputDate = this.document.querySelector('#incomeDate');

    let date = new Date();

    let month: any = date.getMonth() + 1;
    let day: any = date.getDate();
    let year: any = date.getFullYear();

    if (day < 10) {
      day = '0' + day.toString();
    }
    if (month < 10) {
      month = '0' + month.toString();
    }

    let maxDate = year + '-' + month + '-' + day;

    inputDate.max = maxDate;
  }

  submit() {
    this.form.patchValue({
      incomeType: this.incomeType,
    });

    if (this.isValidForm()) {
      let user = this.localStorage.getLocalStorage('user');

      let incomeType = this.getControlValue(this.form, 'incomeType');
      let incomeValue = this.getControlValue(this.form, 'incomeValue');
      const date = this.getControlValue(this.form, 'incomeDate');

      const dateReplace = date
        .replaceAll('-', '$')
        .replaceAll(' ', '$')
        .split('$');

      let fixedMonth = Number(dateReplace[1] - 1);

      let newDate = new Date(dateReplace[0], fixedMonth, dateReplace[2]);

      const monthDateSelected =
        newDate
          .toLocaleDateString('pt-br', {
            month: 'long',
          })[0]
          .toUpperCase() +
        newDate
          .toLocaleDateString('pt-br', {
            month: 'long',
          })
          .substring(1);

      let currenMonthIndex = this.getMonthIndex(monthDateSelected);
      let dateEntry = new Date(
        dateReplace[0],
        currenMonthIndex,
        dateReplace[2]
      );

      const payload = {
        user: {
          title: user,
          month: {
            title: this.month,
            listMonth: {
              incomeType,
              incomeValue,
              dateEntry,
            },
          },
        },
      };
    }
  }

  isValidForm() {
    return this.form.valid;
  }

  getControlValue(form: FormGroup, control: string) {
    return form.controls[control].value;
  }

  getMonthIndex(month: string) {
    let index = this.monthList.findIndex((monthIndex) => {
      return monthIndex === month;
    });

    return index;
  }
}
