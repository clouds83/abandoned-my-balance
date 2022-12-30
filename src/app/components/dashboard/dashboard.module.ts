import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { MenuComponent } from './menu/menu.component';
import { IncomeCardComponent } from './income-card/income-card.component';
import { ExpensesCardComponent } from './expenses-card/expenses-card.component';
import { BalanceCardComponent } from './balance-card/balance-card.component';
import { IncomeListComponent } from './income-list/income-list.component';
import { ExpensesListComponent } from './expenses-list/expenses-list.component';
import { FooterComponent } from './footer/footer.component';
import { MessageHourComponent } from './message-hour/message-hour.component';
import { ImgProfileComponent } from './img-profile/img-profile.component';
import { SharedMaterialModule } from 'src/app/shared/shared-material/shared-material.module';
import { CardViewComponent } from './card-view/card-view.component';
import { AddIncomeComponent } from './add-income/add-income.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MonthsIncomeComponent } from './months-income/months-income.component';
import { CurrencyMaskModule, CURRENCY_MASK_CONFIG } from 'ng2-currency-mask';

export const CustomCurrencyMaskConfig = {
  align: 'left',
  allowNegative: true,
  decimal: ',',
  precision: 2,
  prefix: 'R$ ',
  suffix: '',
  thousands: '.',
};

@NgModule({
  declarations: [
    DashboardComponent,
    MenuComponent,
    IncomeCardComponent,
    ExpensesCardComponent,
    BalanceCardComponent,
    IncomeListComponent,
    ExpensesListComponent,
    FooterComponent,
    MessageHourComponent,
    ImgProfileComponent,
    CardViewComponent,
    AddIncomeComponent,
    MonthsIncomeComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedMaterialModule,
    ReactiveFormsModule,
    FormsModule,
    CurrencyMaskModule,
  ],
  providers: [
    {
      provide: CURRENCY_MASK_CONFIG,
      useValue: CustomCurrencyMaskConfig,
    },
  ],
})
export class DashboardModule {}
