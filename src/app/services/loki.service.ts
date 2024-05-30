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

    this.usersCollection = this.db.getCollection('users');
    if (!this.usersCollection) {
      this.usersCollection = this.db.addCollection<User>('users');
    }

    // Add demo movies if the collection is empty
    if (this.moviesCollection.count() === 0) {
      this.moviesCollection.insert(dummyMovies);
    }
  }

  register(user: User): Observable<User> {
    return from(
      this.dbInitialized.then(() => {
        console.log(user);
        console.log(this.usersCollection);
        const userExists = this.usersCollection.findOne({ email: user.email });
        if (userExists) {
          throw new Error('user already exists');
        }

        this.usersCollection.insert(user);
        console.log(this.usersCollection);
        return user;
      })
    );
  }

  login(
    searchType: string,
    searchVal: string,
    password: string
  ): Observable<User> {
    return from(
      this.dbInitialized.then(() => {
        const user = this.usersCollection.findOne({ [searchType]: searchVal });
        if (!user) {
          throw new Error('User not found');
        } else if (user.password !== password) {
          throw new Error('Invalid password');
        } else {
          return user; // Authentication successful
        }
      })
    );
  }

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
