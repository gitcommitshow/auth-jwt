import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JwtusesComponent } from './jwtuses.component';

describe('JwtusesComponent', () => {
  let component: JwtusesComponent;
  let fixture: ComponentFixture<JwtusesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JwtusesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JwtusesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
