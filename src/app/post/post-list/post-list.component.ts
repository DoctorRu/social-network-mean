import { Component, Input } from '@angular/core';
import { Post } from '../post.interface';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})

export class PostListComponent {
  // posts = [
  //   { title: 'First post', content: 'This is the first post content' },
  //   { title: 'Secpnd post', content: 'This is the second post content' },
  //   { title: 'Third post', content: 'This is the third post content' },
  // ];

  @Input() posts: Post[] = [];
}
