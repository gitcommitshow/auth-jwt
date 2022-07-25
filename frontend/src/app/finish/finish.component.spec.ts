import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinishComponent } from './finish.component';

describe('FinishComponent', () => {
  let component: FinishComponent;
  let fixture: ComponentFixture<FinishComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinishComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FinishComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
