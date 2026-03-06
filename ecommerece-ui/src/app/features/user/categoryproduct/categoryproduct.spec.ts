import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Categoryproduct } from './categoryproduct';

describe('Categoryproduct', () => {
  let component: Categoryproduct;
  let fixture: ComponentFixture<Categoryproduct>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Categoryproduct]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Categoryproduct);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
