import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ramschema } from './ramschema';

describe('Ramschema', () => {
  let component: Ramschema;
  let fixture: ComponentFixture<Ramschema>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Ramschema],
    }).compileComponents();

    fixture = TestBed.createComponent(Ramschema);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
