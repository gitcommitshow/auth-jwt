import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateTokenComponent } from './generate-token.component';

describe('GenerateTokenComponent', () => {
  let component: GenerateTokenComponent;
  let fixture: ComponentFixture<GenerateTokenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenerateTokenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerateTokenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
