import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  posts: any[] = [];
  errorMessage = '';

  constructor(private http: HttpClient, private authService: AuthService) {}

  ngOnInit() {
    this.getPosts();
  }

  getPosts() {
    this.http.get(`${this.authService.getApiUrl()}posts/`)
      .subscribe(
        (data: any) => {
          this.posts = data;
        },
        error => {
          this.errorMessage = 'Erro ao carregar posts';
          console.error('Erro ao carregar posts:', error);
        }
      );
  }
}
