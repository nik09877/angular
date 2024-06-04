import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { authReducer } from './store/reducers/auth.reducer';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MovieComponent } from './movie/movie.component';
import { AllMoviesComponent } from './movie/all-movies/all-movies.component';
import { DetailViewMovieComponent } from './movie/detail-view-movie/detail-view-movie.component';
import { SearchMoviePipe } from './custom-pipes/search-movie.pipe';
import { TheatreComponent } from './theatre/theatre.component';
import { ViewByMovieComponent } from './theatre/view-by-movie/view-by-movie.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    NavbarComponent,
    MovieComponent,
    AllMoviesComponent,
    DetailViewMovieComponent,
    SearchMoviePipe,
    TheatreComponent,
    ViewByMovieComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forRoot({ auth: authReducer }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
