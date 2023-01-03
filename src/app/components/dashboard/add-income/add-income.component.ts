import { DialogRef } from '@angular/cdk/dialog';
import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { IncomeCategory } from 'src/app/interfaces/incomeCategory';
import { RegisterIncome } from 'src/app/interfaces/registerIncome';
import { ApiService } from 'src/app/services/api.service';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import { StoreService } from 'src/app/shared/store.service';

@Component({
  selector: 'app-add-income',
  templateUrl: './add-income.component.html',
  styleUrls: ['./add-income.component.scss'],
})
export class AddIncomeComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  typeRevenue!: string;
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
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private fb: FormBuilder,
    @Inject(DOCUMENT) private document: any,
    private localStorage: LocalstorageService,
    private store: StoreService,
    private api: ApiService,
    private dialogRef: DialogRef<AddIncomeComponent>
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

    this.store
      .getStoreMonth()
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
        this.month = res;
      });

    this.preventFutureDate();
  }

  initForm() {
    this.form = this.fb.group({
      typeRevenue: [null, Validators.required],
      value: [null, Validators.required],
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
      typeRevenue: this.typeRevenue,
    });

    if (this.isValidForm()) {
      let user = this.localStorage.getLocalStorage('user');

      let typeRevenue = this.getControlValue(this.form, 'typeRevenue');
      let value = this.getControlValue(this.form, 'value');
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
              typeRevenue,
              value,
              dateEntry,
            },
          },
        },
      };

      if (this.getControlValue(this.form, 'incomeRepeat')) {
        for (let i = 0; i < this.monthList.length; i++) {
          dateEntry = new Date(
            dateReplace[0],
            this.getMonthIndex(this.monthList[i]),
            dateReplace[2]
          );

          const payload = {
            user: {
              title: user,
              month: {
                title: this.monthList[i],
                listMonth: {
                  typeRevenue,
                  value,
                  dateEntry,
                },
              },
            },
          };

          this.api.addIncome(payload).subscribe();

          this.store.setStoreIncome(true);

          this.dialogRef.close();
        }
      }

      this.api
        .addIncome(payload)
        // .pipe(takeUntil(this.destroy$))
        .subscribe((res: RegisterIncome) => {
          if (res) {
            this.store.setStoreIncome(true);
          }
        });

      this.dialogRef.close();
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

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
