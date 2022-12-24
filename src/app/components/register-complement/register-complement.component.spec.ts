import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterComplementComponent } from './register-complement.component';

describe('RegisterComplementComponent', () => {
  let component: RegisterComplementComponent;
  let fixture: ComponentFixture<RegisterComplementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterComplementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterComplementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
