import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddIncomeComponent } from '../add-income/add-income.component';

@Component({
  selector: 'app-income-list',
  templateUrl: './income-list.component.html',
  styleUrls: ['./income-list.component.scss'],
})
export class IncomeListComponent {
  constructor(private dialog: MatDialog) {}

  openDialog() {
    this.dialog.open(AddIncomeComponent, {
      width: '600px',
      data: {
        any: '',
      },
    });
  }
}
