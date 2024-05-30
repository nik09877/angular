import { Pipe, PipeTransform } from '@angular/core';
import { Movie } from '../models/movie';

@Pipe({
  name: 'searchMovie',
})
export class SearchMoviePipe implements PipeTransform {
  transform(movies: Movie[], searchFilter: string): Movie[] {
    if (!movies || !searchFilter) {
      return movies;
    } else {
      return movies.filter(
        (movie) =>
          movie.title
            .toLocaleLowerCase()
            .includes(searchFilter.toLocaleLowerCase()) ||
          movie.genre.includes(searchFilter.toLocaleLowerCase())
      );
    }
  }
}
