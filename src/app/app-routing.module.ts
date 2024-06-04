import { AuthGuard } from './auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { MovieComponent } from './movie/movie.component';
import { AllMoviesComponent } from './movie/all-movies/all-movies.component';
import { DetailViewMovieComponent } from './movie/detail-view-movie/detail-view-movie.component';
import { TheatreComponent } from './theatre/theatre.component';
import { ViewByMovieComponent } from './theatre/view-by-movie/view-by-movie.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'movie',
    component: MovieComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: AllMoviesComponent },
      { path: ':movieId', component: DetailViewMovieComponent },
    ],
  },
  {
    path: 'theatre',
    canActivate: [AuthGuard],
    component: TheatreComponent,
    children: [
      { path: 'viewbyMovie/:movieId', component: ViewByMovieComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
