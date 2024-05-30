import { Component, OnInit } from '@angular/core';
import { MovieService } from '../services/movie.service';
import { Movie } from '../models/movie';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  topRatedMovies!: Movie[];
  latestMovies!: Movie[];
  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.movieService.getAllMovies().subscribe((data: Movie[]) => {
      this.topRatedMovies = data
        .slice()
        .sort((a, b) => (a.rating > b.rating ? -1 : 1))
        .slice(0, 8);

      this.latestMovies = data
        .slice()
        .sort((a, b) => (a.year > b.year ? -1 : 1))
        .slice(0, 3);
    });
  }
}
