import { Component, OnInit } from '@angular/core';
import { StoreService } from 'src/app/shared/store.service';

@Component({
  selector: 'app-months-income',
  templateUrl: './months-income.component.html',
  styleUrls: ['./months-income.component.scss'],
})
export class MonthsIncomeComponent implements OnInit {
  month!: string;

  constructor(private store: StoreService) {}

  ngOnInit() {
    this.getMonthCurrent();
  }

  getMonthCurrent() {
    let date = new Date();
    let dateString = date.toLocaleDateString('pt-br', { month: 'long' });
    let letterDateString =
      dateString[0].toUpperCase() + dateString.substring(1);

    this.month = letterDateString;

    this.store.setStoreMonth(this.month);
  }
}
