import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExistentArticlesComponent } from './existent-articles.component';

describe('ExistentArticlesComponent', () => {
  let component: ExistentArticlesComponent;
  let fixture: ComponentFixture<ExistentArticlesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExistentArticlesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExistentArticlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
