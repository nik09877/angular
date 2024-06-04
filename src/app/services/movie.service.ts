import { Injectable } from '@angular/core';
import { LokiService } from './loki.service';
import { Observable, of } from 'rxjs';
import { Movie } from '../models/movie';
import { Seat } from '../models/Seat';

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
  getSeatsByMovieId(id: number) {
    return this.loki.getSeatsByMovieId(id);
  }
  updateSeatStatus(movieId: number, seats: Seat[]) {
    return this.loki.updateSeatStatus(movieId, seats);
  }
}
