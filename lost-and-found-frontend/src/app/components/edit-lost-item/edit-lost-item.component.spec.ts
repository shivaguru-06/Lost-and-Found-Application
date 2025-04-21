import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditLostItemComponent } from './edit-lost-item.component';

describe('EditLostItemComponent', () => {
  let component: EditLostItemComponent;
  let fixture: ComponentFixture<EditLostItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditLostItemComponent]
    });
    fixture = TestBed.createComponent(EditLostItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
