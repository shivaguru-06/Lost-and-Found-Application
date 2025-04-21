import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemDetailsComponent } from './item-details.component';

describe('ItemDetailsComponent', () => {
  let component: ItemDetailsComponent;
  let fixture: ComponentFixture<ItemDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ItemDetailsComponent]
    });
    fixture = TestBed.createComponent(ItemDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
