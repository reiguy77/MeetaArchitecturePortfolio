import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminControls } from './admin-controls';

describe('AdminControls', () => {
  let component: AdminControls;
  let fixture: ComponentFixture<AdminControls>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminControls]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminControls);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
