import { Post } from './post.interface';
import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
// Note: providedIn create a singleton instance

export class PostService {
  private posts: Post[] = [];

  getPosts() {
    return [...this.posts];
  }

  addPosts(title: string, content: string) {
    const post: Post = {
      title: title,
      content: content
    };
    this.posts.push(post);
  }
}
