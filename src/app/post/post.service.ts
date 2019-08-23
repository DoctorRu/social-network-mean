import { Post } from './post.interface';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
// Note: providedIn create a singleton instance

export class PostService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();
  constructor(private http: HttpClient) {

  }

  getPosts() {
    const Url = 'http://localhost:3000/api/posts';
    this.http
    .get<{message: string, posts: any}>(Url)
    .pipe( map( result  => {
        return result.posts.map( post => {
          return {
            id: post._id,
            title: post.title,
            content: post.content
          };
        });
      } ) )
    .subscribe( (posts) => {
      this.posts = posts;
      this.postsUpdated.next([...this.posts]);
    });
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  addPosts(id: null, title: string, content: string) {
    const Url = 'http://localhost:3000/api/posts';
    const post: Post = {
      id,
      title,
      content
    };

    this.http.post<{message: string}>(Url, post)
      .subscribe( res => {
        console.log(res.message);
        this.posts.push(post);
        this.postsUpdated.next([...this.posts]);
      });
  }

  deletePost(postID: string) {
    const Url = 'http://localhost:3000/api/posts/';
    this.http.delete(Url + postID)
      .subscribe( () => {
        this.posts = this.posts.filter( post => post.id !== postID );
        this.postsUpdated.next([...this.posts]);
        console.log('Post deleted');
      }
    );

  }
}
