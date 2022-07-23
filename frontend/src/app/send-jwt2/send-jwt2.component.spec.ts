import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendJwt2Component } from './send-jwt2.component';

describe('SendJwt2Component', () => {
  let component: SendJwt2Component;
  let fixture: ComponentFixture<SendJwt2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SendJwt2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SendJwt2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
