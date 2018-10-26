import { LoginGuard } from './pages/login/login.guard';
import { NotFoundModule } from './pages/not-found/not-found.module';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { HomeModule } from './pages/home/home.module';
import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [
  {
      path: '',
      pathMatch: 'full',
      redirectTo: 'home'
  },
  {
      path: 'home',
      loadChildren: './pages/home/home.module#HomeModule'
  },
  {
    path: 'login',
    canActivate: [LoginGuard],
    component: LoginComponent
  },
  {
      path: '**',
      component: NotFoundComponent
  }
];

@NgModule({
  imports: [
    HomeModule,
    NotFoundModule,
    RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload', useHash: true })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
