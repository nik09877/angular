// loki.service.ts
import { Injectable } from '@angular/core';
import Loki from 'lokijs';
import { Observable, catchError, from, map, of } from 'rxjs';
import { dummyMovies } from '../../../dummy-data'; // Adjust the import path as necessary
import { Movie } from '../models/movie';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class LokiService {
  private db!: Loki;
  private moviesCollection!: Loki.Collection<Movie>;
  private usersCollection!: Loki.Collection<User>;
  private dbInitialized: Promise<void>;

  constructor() {
    this.dbInitialized = new Promise((resolve, reject) => {
      this.db = new Loki('bookMyShow.db', {
        autoload: true,
        autoloadCallback: () => {
          try {
            this.initializeDatabase();
            resolve();
          } catch (error) {
            reject(error);
          }
        },
        autosave: true,
        autosaveInterval: 1000, // Save to disk every second
      });
    });
  }

  private initializeDatabase() {
    this.moviesCollection = this.db.getCollection('movies');
    if (!this.moviesCollection) {
      this.moviesCollection = this.db.addCollection<Movie>('movies');
    }

    const usersCollection = this.db.getCollection('users');
    if (!usersCollection) {
      this.db.addCollection('users');
    }

    // Add demo movies if the collection is empty
    if (this.moviesCollection.count() === 0) {
      this.moviesCollection.insert(dummyMovies);
    }
  }

  register(user: User): Observable<User> {
    return new Observable<User>((observer) => {
      try {
        this.usersCollection.insert(user);
        observer.next(user);
        observer.complete();
      } catch (error) {
        observer.error(error);
      }
    });
  }

  login() {}

  getAllMovies(): Observable<Movie[]> {
    return from(
      this.dbInitialized.then(() => {
        return this.moviesCollection.find();
      })
    );
  }

  getMovieById(id: number): Observable<Movie> {
    return from(
      this.dbInitialized.then(() => {
        const result = this.moviesCollection.find({ id: id });
        console.log(result);
        if (result.length > 0) {
          return result[0];
        } else {
          throw new Error(`Movie with ID ${id} not found`);
        }
      })
    );
  }
}
