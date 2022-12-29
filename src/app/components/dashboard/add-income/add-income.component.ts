import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IncomeCategory } from 'src/app/interfaces/incomeCategory';

@Component({
  selector: 'app-add-income',
  templateUrl: './add-income.component.html',
  styleUrls: ['./add-income.component.scss'],
})
export class AddIncomeComponent implements OnInit {
  form!: FormGroup;
  incomeType!: string;
  incomeList!: IncomeCategory[];

  constructor(private fb: FormBuilder) {}

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
  }

  initForm() {
    this.form = this.fb.group({
      incomeType: [null, Validators.required],
      incomeValue: [null, Validators.required],
      incomeDate: [null, Validators.required],
      incomeRepeat: [null],
    });
  }

  submit() {
    this.form.patchValue({
      incomeType: this.incomeType,
    });
    console.log(this.form.value);
  }
}
