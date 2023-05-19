import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailMatcherComponent } from './email-matcher.component';

describe('EmailMatcherComponent', () => {
  let component: EmailMatcherComponent;
  let fixture: ComponentFixture<EmailMatcherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmailMatcherComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmailMatcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
