import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { ServicesComponent } from './pages/services/services.component';
import { BlogComponent } from './pages/blog/blog.component';
import { PostDetailComponent } from './pages/post-detail/post-detail.component';
import { LoginComponent } from './blogadmin/login/login.component'; // Importa o componente de login
import { PostsComponent } from './blogadmin/posts/posts.component'; // Importa o componente de administração de posts

import { AuthGuard } from './blogadmin/auth.guard'; // Importa o guard de autenticação
import { PostFormComponent } from './blogadmin/post-form/post-form.component';

const routes: Routes = [
  { path: '', component: HomeComponent }, // Rota para a página inicial
  { path: 'sobre', component: AboutComponent }, // Rota para a página "Sobre"
  { path: 'servicos', component: ServicesComponent }, // Rota para a página "Serviços"
  { path: 'blog', component: BlogComponent }, // Rota para a página do blog
  { path: 'post/:id', component: PostDetailComponent }, // Rota para a página de detalhes do post, com parâmetro ID

  // Rota para a página de login do blogadmin
  { path: 'login', component: LoginComponent },

  // Rota para a administração de posts, protegida por AuthGuard
  { path: 'blogadmin/posts', component: PostsComponent, canActivate: [AuthGuard] },
  { path: 'blogadmin/posts/new', component: PostFormComponent, canActivate: [AuthGuard] },  // Rota para criar post
  { path: 'blogadmin/posts/edit/:id', component: PostFormComponent, canActivate: [AuthGuard] },  // Rota para editar post

  // Redireciona para a página inicial se a rota não for encontrada
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
