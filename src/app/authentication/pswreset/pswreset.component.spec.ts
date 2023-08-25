import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PswresetComponent } from './pswreset.component';

describe('PswresetComponent', () => {
  let component: PswresetComponent;
  let fixture: ComponentFixture<PswresetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PswresetComponent]
    });
    fixture = TestBed.createComponent(PswresetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
