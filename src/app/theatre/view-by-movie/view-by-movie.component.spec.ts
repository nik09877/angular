import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewByMovieComponent } from './view-by-movie.component';

describe('ViewByMovieComponent', () => {
  let component: ViewByMovieComponent;
  let fixture: ComponentFixture<ViewByMovieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewByMovieComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewByMovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
