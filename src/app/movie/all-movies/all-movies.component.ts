import { Component } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { Movie } from '../../models/movie';

@Component({
  selector: 'app-all-movies',
  templateUrl: './all-movies.component.html',
  styleUrl: './all-movies.component.css',
})
export class AllMoviesComponent {
  allMovies!: Movie[];
  movies!: Movie[];
  topRatedMovies!: Movie[];
  latestMovies!: Movie[];

  movieFilterValue: string | any;
  activeTab: number = 0;

  constructor(private mService: MovieService) {}

  ngOnInit(): void {
    this.mService.getAllMovies().subscribe((data: Movie[]) => {
      this.allMovies = data;
      this.movies = data;
      this.topRatedMovies = data
        .slice()
        .sort((a, b) => (a.rating > b.rating ? -1 : 1))
        .slice(0, 9);

      this.latestMovies = data
        .slice()
        .sort((a, b) => (a.year > b.year ? -1 : 1))
        .slice(0, 6);
    });
  }

  topRated() {
    this.activeTab = 1;
    this.movies = this.topRatedMovies;
  }
  recentMovies() {
    this.activeTab = 2;
    this.movies = this.latestMovies;
  }
  getAllMovies() {
    this.activeTab = 0;
    this.movies = this.allMovies;
  }
}
