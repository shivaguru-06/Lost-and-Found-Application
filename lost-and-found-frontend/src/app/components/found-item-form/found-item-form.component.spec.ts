import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoundItemFormComponent } from './found-item-form.component';

describe('FoundItemFormComponent', () => {
  let component: FoundItemFormComponent;
  let fixture: ComponentFixture<FoundItemFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FoundItemFormComponent]
    });
    fixture = TestBed.createComponent(FoundItemFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
