import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendJwt1Component } from './send-jwt1.component';

describe('SendJwt1Component', () => {
  let component: SendJwt1Component;
  let fixture: ComponentFixture<SendJwt1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SendJwt1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SendJwt1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
