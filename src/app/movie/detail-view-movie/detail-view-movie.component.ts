import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Movie } from '../../models/movie';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-detail-view-movie',
  templateUrl: './detail-view-movie.component.html',
  styleUrl: './detail-view-movie.component.css',
})
export class DetailViewMovieComponent implements OnInit {
  movie!: Movie;
  movieId!: number;
  constructor(
    private actRouter: ActivatedRoute,
    private router: Router,
    private mService: MovieService
  ) {}

  ngOnInit(): void {
    this.movieId = +this.actRouter.snapshot.params['movieId'];
    this.mService.getMovieById(this.movieId).subscribe((data: Movie) => {
      console.log(data);
      this.movie = data;
    });
  }
}
