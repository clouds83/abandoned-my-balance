import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DeleteIncome } from 'src/app/interfaces/deleteIncome';
import { ListIncome } from 'src/app/interfaces/listIncome';
import { ApiService } from 'src/app/services/api.service';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import { StoreService } from 'src/app/shared/store.service';
import { AddIncomeComponent } from '../add-income/add-income.component';
import { UpdateIncomeComponent } from '../update-income/update-income.component';

@Component({
  selector: 'app-income-list',
  templateUrl: './income-list.component.html',
  styleUrls: ['./income-list.component.scss'],
})
export class IncomeListComponent implements OnInit, AfterViewInit {
  selectedMonth!: string;
  user!: string;
  loading = false;
  emptyResult = false;
  arrIncome: any[] = [];
  public dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = [
    'tipoReceita',
    'valor',
    'dataEntrada',
    '_id',
    'acoes',
  ];
  @ViewChild('paginator') paginator!: MatPaginator;

  constructor(
    private dialog: MatDialog,
    private store: StoreService,
    private localStorage: LocalstorageService,
    private api: ApiService
  ) {}

  ngOnInit() {
    this.store.getStoreIncome().subscribe((res) => {
      if (res) {
        this.getIncomeList(this.selectedMonth);
      }
    });
  }

  ngAfterViewInit() {
    this.store.getStoreMonth().subscribe((res) => {
      this.selectedMonth = res;
    });
    this.getIncomeList(this.selectedMonth);
  }

  getIncomeList(selectedMonth: string) {
    this.user = this.localStorage.getLocalStorage('user');
    this.api
      .getIncomeEntry(selectedMonth, this.user)
      .subscribe((res: ListIncome) => {
        this.loading = true;
        console.log('loading ->', this.loading);

        let arr: any[] = [];

        if (res.result.length === 0) {
          this.emptyResult = true;
          this.arrIncome = [];
        } else {
          this.emptyResult = false;
          this.arrIncome = arr;

          setTimeout(() => {
            this.dataSource.paginator = this.paginator;
          }, 2001);
          res.result.forEach((element: any) => {
            arr.push(element.user.month.listMonth);
          });
        }

        setTimeout(() => {
          this.dataSource.data = arr;
          this.dataSource.paginator = this.paginator;
          this.loading = false;

          console.log('loading ->', this.loading);
        });
      });
  }

  openDialog() {
    this.dialog.open(AddIncomeComponent, {
      width: '600px',
      data: {
        any: '',
      },
    });
  }

  applyFilter(event: any) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  selectAction(action: string, element: any) {
    if (action.indexOf('edit.png') != -1) {
      this.dialog.open(UpdateIncomeComponent, {
        width: '600px',
        data: {
          data: element,
        },
      });
    } else {
      const question = confirm('Tem certeza que deseja excluir essa receita?');

      if (question) {
        this.api.deleteIncome(element._id).subscribe((res: DeleteIncome) => {
          if (res) {
            this.store.setStoreIncome(true);
          }
        });
      }
    }
  }
}
