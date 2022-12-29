import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthsIncomeComponent } from './months-income.component';

describe('MonthsIncomeComponent', () => {
  let component: MonthsIncomeComponent;
  let fixture: ComponentFixture<MonthsIncomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonthsIncomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonthsIncomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
