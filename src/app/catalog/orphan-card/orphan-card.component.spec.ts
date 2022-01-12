import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrphanCardComponent } from './orphan-card.component';

describe('OrphanCardComponent', () => {
  let component: OrphanCardComponent;
  let fixture: ComponentFixture<OrphanCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrphanCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrphanCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
