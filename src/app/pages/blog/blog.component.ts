// blog.component.ts

import { Component, OnInit } from '@angular/core';
import { BlogService, BlogPost } from '../../blog.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  posts: BlogPost[] = [];

  constructor(private blogService: BlogService) { }

  ngOnInit(): void {
    this.blogService.getPosts().subscribe(
      (data: BlogPost[]) => {
        this.posts = data;
      },
      (error) => {
        console.error('Erro ao carregar posts:', error);
      }
    );
  }
}
