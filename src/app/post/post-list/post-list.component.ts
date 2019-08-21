import { Component, Input, OnInit } from '@angular/core';
import { Post } from '../post.interface';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})

export class PostListComponent implements OnInit {
  // posts = [
  //   { title: 'First post', content: 'This is the first post content' },
  //   { title: 'Secpnd post', content: 'This is the second post content' },
  //   { title: 'Third post', content: 'This is the third post content' },
  // ];

  @Input() posts: Post[] = [];

  constructor(public postService: PostService) {
  }

  ngOnInit() {
    this.posts = this.postService.getPosts();
  }
}
