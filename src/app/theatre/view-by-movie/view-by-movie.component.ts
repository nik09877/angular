import { MovieService } from './../../services/movie.service';
import { Component, OnInit } from '@angular/core';
import { Movie } from '../../models/movie';
import { ActivatedRoute, Router } from '@angular/router';
import { Seat } from '../../models/Seat';

@Component({
  selector: 'app-view-by-movie',
  templateUrl: './view-by-movie.component.html',
  styleUrls: ['./view-by-movie.component.css'],
})
export class ViewByMovieComponent implements OnInit {
  movie!: Movie;
  movieId!: number;
  seatMap: Seat[][] = [];
  seats: Seat[] = [];
  selectedSeatsCount: number = 0;
  totalPrice: number = 0;

  constructor(
    private actRouter: ActivatedRoute,
    private router: Router,
    private mService: MovieService
  ) {}

  ngOnInit() {
    this.movieId = +this.actRouter.snapshot.params['movieId'];
    this.mService.getMovieById(this.movieId).subscribe((data: Movie) => {
      this.movie = data;
    });

    // Initialize seat map for the first movie
    this.fetchSeatStatus(this.movieId);
  }

  fetchSeatStatus(movieId: number): void {
    this.mService.getSeatsByMovieId(movieId).subscribe((seats: Seat[]) => {
      this.seats = seats;
      for (let i = 0; i < 6; i++) {
        this.seatMap.push([]);
        for (let j = 0; j < 8; j++) {
          this.seatMap[i].push(this.seats[i * 8 + j]);
        }
      }
    });
  }

  toggleSeat(rowIndex: number, seatIndex: number): void {
    const seat = this.seatMap[rowIndex][seatIndex];
    if (seat.occupied) return;
    if (this.selectedSeatsCount < 4 || seat.selected) {
      seat.selected = !seat.selected;
      this.updateSelectedCount();
    }
  }

  updateSelectedCount(): void {
    this.selectedSeatsCount = this.seatMap.reduce((acc, row) => {
      return acc + row.filter((seat) => seat.selected).length;
    }, 0);

    this.totalPrice = this.seatMap.reduce((acc, row) => {
      return (
        acc +
        row
          .filter((seat) => seat.selected)
          .reduce((rowAcc, seat) => rowAcc + seat.price, 0)
      );
    }, 0);
  }

  handlePayment() {
    const updatedSeats: Seat[] = this.seatMap.flat().map((seat: Seat) => {
      if (seat.selected) {
        return { ...seat, selected: false, occupied: true };
      }
      return seat;
    });

    this.mService.updateSeatStatus(this.movieId, updatedSeats).subscribe(() => {
      this.router.navigate(['/home']);
    });
  }
}
