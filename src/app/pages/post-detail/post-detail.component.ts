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
      const postId = params.get('id'); // postId pode ser string | null

      if (postId !== null && !isNaN(+postId)) {
        this.loadPost(+postId); // Convertendo postId para number e passando para loadPost
      } else {
        console.error('ID do post inválido ou não encontrado na rota');
        // Trate de acordo com a lógica do seu aplicativo, por exemplo, redirecionando ou mostrando uma mensagem de erro.
      }
    });
  }

  private loadPost(postId: number): void {
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
    this.router.navigate(['/']); // Navega de volta para a página inicial ou a página anterior conforme configurado nas rotas
  }
}
