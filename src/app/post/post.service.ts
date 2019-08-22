import { Post } from './post.interface';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({providedIn: 'root'})
// Note: providedIn create a singleton instance

export class PostService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

  getPosts() {
    return [...this.posts];
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  addPosts(title: string, content: string) {
    const post: Post = {
      title,
      content
    };

    this.posts.push(post);
    this.postsUpdated.next([...this.posts]);
  }
}
