import { PostService } from './../post.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
// import { Route } from '@angular/compiler/src/core';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit {
  editPostForm: FormGroup = new FormGroup({});
  id: string = '';

  constructor(
    private PostService: PostService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.editPostForm = new FormGroup({
      title: new FormControl(null),
      description: new FormControl(null),
    });
    this.id = this.route.snapshot.params['id'];
    this.PostService.entities$.subscribe((posts) => {
      // const post = posts.find((post) => post.id === this.id);
      const post = posts.find((post) => post._id === this.id);

      this.editPostForm.patchValue({
        title: post?.title,
        description: post?.description,
      });
    });
  }

  onEditPost() {
    const postData = {
      ...this.editPostForm.value,
      id: this.id,
      _id: this.id // Generalmente no necesitariamos esta propiedad, pero la utilizamos ya que mongo usa _id en sus registros
    };

    this.PostService.update(postData);
    this.router.navigate(['/posts']);
  }

}
