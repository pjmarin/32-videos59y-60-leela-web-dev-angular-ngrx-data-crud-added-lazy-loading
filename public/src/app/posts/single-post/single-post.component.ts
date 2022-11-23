import { Post } from './../../models/post.model';
import { PostService } from './../post.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.css']
})
export class SinglePostComponent implements OnInit {
  post: Post = { id: "", title: "", description: "" };
  constructor(private route: ActivatedRoute, private PostService: PostService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.PostService.entities$.subscribe((posts) => {
      const post = posts.find((post) => post.id === id);
      if(post) {
        this.post = post;
      }
    });
  }

}
