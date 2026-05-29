import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Kurser } from './kurser';

describe('Kurser', () => {
  let component: Kurser;
  let fixture: ComponentFixture<Kurser>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Kurser],
    }).compileComponents();

    fixture = TestBed.createComponent(Kurser);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
