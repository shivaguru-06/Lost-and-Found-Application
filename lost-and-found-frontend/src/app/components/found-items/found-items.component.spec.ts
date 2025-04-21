import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoundItemsComponent } from './found-items.component';

describe('FoundItemsComponent', () => {
  let component: FoundItemsComponent;
  let fixture: ComponentFixture<FoundItemsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FoundItemsComponent]
    });
    fixture = TestBed.createComponent(FoundItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
