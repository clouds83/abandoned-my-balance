import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IncomeCategory } from 'src/app/interfaces/incomeCategory';

@Component({
  selector: 'app-update-income',
  templateUrl: './update-income.component.html',
  styleUrls: ['./update-income.component.scss'],
})
export class UpdateIncomeComponent implements OnInit {
  form!: FormGroup;
  typeRevenue!: string;
  incomeList!: IncomeCategory[];
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    @Inject(DOCUMENT) private document: any
  ) {}

  ngOnInit() {
    this.initForm();
    this.fillData();
    this.preventFutureDate();

    this.incomeList = [
      {
        name: 'Investimento',
      },
      {
        name: 'Outros',
      },
      {
        name: 'Férias',
      },
      {
        name: '13 Sálario',
      },
      {
        name: 'PLR',
      },
      {
        name: 'Aposentaria',
      },
      {
        name: 'Aluguel',
      },
      {
        name: 'Salario',
      },
    ];
  }

  initForm() {
    this.form = this.fb.group({
      typeRevenue: [null, Validators.required],
      value: [null, Validators.required],
      dateEntry: [null, Validators.required],
    });
  }

  fillData() {
    if (this.data) {
      this.typeRevenue = this.data.data?.typeRevenue;
      this.form.patchValue({
        typeRevenue: this.data.data?.typeRevenue,
        value: this.data.data.value,
        dateEntry: this.data.data.dateEntry,
      });
    }
  }

  preventFutureDate() {
    const inputDate = this.document.querySelector('#dateEntry');

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
    const categoryInput = this.getControlValue(this.form, 'typeRevenue');

    if (!categoryInput) {
    }
  }

  getControlValue(form: FormGroup, control: string) {
    return form.controls[control].value;
  }
}
