import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudAppComponent } from './crud-app.component';

describe('CrudAppComponent', () => {
  let component: CrudAppComponent;
  let fixture: ComponentFixture<CrudAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrudAppComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrudAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
