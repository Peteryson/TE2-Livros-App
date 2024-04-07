import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: 'autores',
    loadChildren: () =>
      import('./autores/autores.module').then((m) => m.AutoresPageModule),
  },
  {
    path: 'livros',
    loadChildren: () => import('./livros/livro.module').then(module => module.LivroModule)
  },
  {
    path: 'api',
    loadChildren: () => import('./api/api.module').then(m => m.ApiModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
