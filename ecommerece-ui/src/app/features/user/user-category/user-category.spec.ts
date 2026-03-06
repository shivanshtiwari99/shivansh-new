import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCategory } from './user-category';

describe('UserCategory', () => {
  let component: UserCategory;
  let fixture: ComponentFixture<UserCategory>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserCategory]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserCategory);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
