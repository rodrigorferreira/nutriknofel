import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css']
})
export class PostFormComponent implements OnInit {
  postForm: FormGroup;
  postId: number | null = null;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {
    this.postForm = this.fb.group({
      title: ['', Validators.required],
      summary: ['', Validators.required],
      content: ['', Validators.required],
      image: [null],
      author: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.postId = this.route.snapshot.params['id'] ? +this.route.snapshot.params['id'] : null;

    if (this.postId) {
      this.loadPost();
    }
  }

  loadPost() {
    this.http.get(`${this.authService.getApiUrl()}posts/${this.postId}/`, this.authService.getAuthHeaders())
      .subscribe(
        (data: any) => {
          this.postForm.patchValue(data);
        },
        (error) => {
          console.error('Erro ao carregar o post:', error);
          this.errorMessage = 'Erro ao carregar o post';
        }
      );
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input?.files?.length) {
      this.postForm.patchValue({
        image: input.files[0]
      });
    }
  }

  onSubmit() {
    if (this.postForm.invalid) {
      return;
    }

    const formData = new FormData();
    Object.keys(this.postForm.controls).forEach(key => {
      const controlValue = this.postForm.get(key)?.value;
      if (controlValue) {
        formData.append(key, controlValue);
      }
    });

    if (this.postId) {
      this.updatePost(formData);
    } else {
      this.createPost(formData);
    }
  }

  createPost(formData: FormData) {
    this.http.post(`${this.authService.getApiUrl()}posts/`, formData, this.authService.getAuthHeaders())
      .subscribe(
        () => {
          this.router.navigate(['/blogadmin/posts']);
        },
        (error) => {
          console.error('Erro ao criar o post:', error);
          this.errorMessage = 'Erro ao criar o post';
        }
      );
  }

  updatePost(formData: FormData) {
    this.http.put(`${this.authService.getApiUrl()}posts/${this.postId}/`, formData, this.authService.getAuthHeaders())
      .subscribe(
        () => {
          this.router.navigate(['/blogadmin/posts']);
        },
        (error) => {
          console.error('Erro ao atualizar o post:', error);
          this.errorMessage = 'Erro ao atualizar o post';
        }
      );
  }
}
