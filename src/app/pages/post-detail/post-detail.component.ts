import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService, BlogPost } from '../../blog.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {
  post: BlogPost | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private blogService: BlogService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const postId = params.get('id');

      if (postId !== null && !isNaN(+postId)) {
        this.loadPost(+postId);
      } else {
        console.error('ID do post inválido ou não encontrado na rota');
        // Redirecionar ou mostrar uma mensagem de erro conforme a lógica do seu aplicativo
      }
    });
  }

  loadPost(postId: number): void {  // Certifique-se de que o método 'loadPost' está definido
    this.blogService.getPost(postId).subscribe({
      next: (post) => {
        this.post = post;
      },
      error: (error) => {
        console.error('Erro ao carregar o post:', error);
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/blog']);  // Navega de volta para a página do blog
  }
}
