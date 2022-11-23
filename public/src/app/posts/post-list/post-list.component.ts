import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Post } from 'src/app/models/post.model';
import { PostService } from '../post.service';
import { PostsDataService } from '../posts-data.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  posts$: Observable<Post[]> = of([]);
  constructor(private postService: PostService, private postDataService: PostsDataService) { }

  ngOnInit(): void {
    this.posts$ = this.postService.entities$;
    // this.posts$ = this.postDataService.getAll();
  }

  onDeletePost(event: Event, id: string) {
    event.preventDefault();
    if (confirm('Are you sure you want to delete the post')) {
      this.postService.delete(id);
    }
  }

}
