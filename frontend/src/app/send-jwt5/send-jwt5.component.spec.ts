import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendJwt5Component } from './send-jwt5.component';

describe('SendJwt5Component', () => {
  let component: SendJwt5Component;
  let fixture: ComponentFixture<SendJwt5Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SendJwt5Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SendJwt5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
