import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BestMethodComponent } from './best-method.component';

describe('BestMethodComponent', () => {
  let component: BestMethodComponent;
  let fixture: ComponentFixture<BestMethodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BestMethodComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BestMethodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
