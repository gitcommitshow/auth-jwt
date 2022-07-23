import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendJwt3Component } from './send-jwt3.component';

describe('SendJwt3Component', () => {
  let component: SendJwt3Component;
  let fixture: ComponentFixture<SendJwt3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SendJwt3Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SendJwt3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
