import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendJwt4Component } from './send-jwt4.component';

describe('SendJwt4Component', () => {
  let component: SendJwt4Component;
  let fixture: ComponentFixture<SendJwt4Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SendJwt4Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SendJwt4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
