import { Post } from './post.interface';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({providedIn: 'root'})
// Note: providedIn create a singleton instance

export class PostService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();
  constructor(private http: HttpClient) {

  }

  getPosts() {
    const Url = 'http://localhost:3000/api/posts';
    this.http.get<{message: string, posts: Post[]}>(Url)
      .subscribe( (data) => {
        this.posts = data.posts;
        this.postsUpdated.next([...this.posts]);
    });
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  addPosts(id: null, title: string, content: string) {
    const post: Post = {
      id,
      title,
      content
    };

    this.posts.push(post);
    this.postsUpdated.next([...this.posts]);
  }
}
