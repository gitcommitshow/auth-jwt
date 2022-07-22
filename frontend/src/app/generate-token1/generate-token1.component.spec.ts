import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateToken1Component } from './generate-token1.component';

describe('GenerateToken1Component', () => {
  let component: GenerateToken1Component;
  let fixture: ComponentFixture<GenerateToken1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenerateToken1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerateToken1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
