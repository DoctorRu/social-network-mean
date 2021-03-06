import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Post } from '../post.interface';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})

export class PostCreateComponent {
  enteredContent = '';
  enteredTitle = '';

  constructor(public postService: PostService) {

  }

  onAddPost(form: NgForm) {
    if (form.invalid) {
      return;
    }

    this.postService.addPosts(null, form.value.title, form.value.content);
    form.resetForm();
  }
}
