import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  posts: any[] = [];
  isLoading = true;  // Indica se os posts estão sendo carregados
  errorMessage = '';  // Para armazenar mensagens de erro

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getPosts();
  }

  getPosts() {
    const headers = this.authService.getAuthHeaders();
    console.log('Headers enviados:', headers);  // Verifique se o token está sendo enviado

    this.http.get(`${this.authService.getApiUrl()}posts/`, headers)
      .subscribe(
        (data: any) => {
          this.posts = data;
          this.isLoading = false;
        },
        (error) => {
          this.isLoading = false;
          if (error.status === 401) {
            this.router.navigate(['/login']);
          } else {
            this.errorMessage = 'Erro ao carregar posts';
            console.error('Erro ao carregar posts:', error);
          }
        }
      );
  }

  createPost() {
    this.router.navigate(['/blogadmin/posts/new']);
  }

  editPost(id: number) {
    this.router.navigate([`/blogadmin/posts/edit/${id}`]);
  }

  deletePost(id: number) {
    if (confirm('Tem certeza de que deseja excluir este post?')) {
      this.http.delete(`${this.authService.getApiUrl()}posts/${id}/`, this.authService.getAuthHeaders())
        .subscribe(
          () => {
            this.getPosts();  // Recarrega os posts após a exclusão
          },
          error => {
            this.errorMessage = 'Erro ao excluir o post';
            console.error('Erro ao excluir o post:', error);
          }
        );
    }
  }
}
