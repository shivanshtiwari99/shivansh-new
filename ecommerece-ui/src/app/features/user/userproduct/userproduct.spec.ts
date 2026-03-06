import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Userproduct } from './userproduct';

describe('Userproduct', () => {
  let component: Userproduct;
  let fixture: ComponentFixture<Userproduct>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Userproduct]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Userproduct);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
