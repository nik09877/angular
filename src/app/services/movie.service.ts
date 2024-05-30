import { Injectable } from '@angular/core';
import { LokiService } from './loki.service';
import { Observable, of } from 'rxjs';
import { Movie } from '../models/movie';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  constructor(private loki: LokiService) {}

  getAllMovies() {
    return this.loki.getAllMovies();
  }
  getMovieById(id: number) {
    return this.loki.getMovieById(id);
  }
}
