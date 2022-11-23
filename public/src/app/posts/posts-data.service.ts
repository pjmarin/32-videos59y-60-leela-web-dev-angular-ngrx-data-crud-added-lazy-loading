import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Post } from './../models/post.model';
import { Injectable } from '@angular/core';
import { DefaultDataService, HttpUrlGenerator } from '@ngrx/data';
import { HttpClient } from '@angular/common/http';
import { Update } from '@ngrx/entity';
import { PostUpdateI } from "../models/post-update-data-model";

@Injectable()
export class PostsDataService extends DefaultDataService<Post> {
  constructor(http: HttpClient, httpUrlGenerator: HttpUrlGenerator) {
    super('Post', http, httpUrlGenerator);
  }

  override getAll(): Observable<Post[]> {
    return this.http
      .get(`http://localhost:5000/posts/getPosts`)
      .pipe(
        map((data) => {
          const posts: Post[] = [];
          for (let [key, value] of Object.entries(data)) {
            posts.push({ ...value, id: key });
          }

          return posts;
        })
      );
  }

  override add(post: Post): Observable<Post> {
    return this.http
      .post<{ _id: string }>(
        `http://localhost:5000/posts/addPost`,
        post
      )
      .pipe(
        map((data) => {
          return { ...post, id: data._id };
        })
      );
  }

  // update method no funciona por el tema de la id de mongo que es _id
  override update(post: Update<Post>): Observable<Post> {
    return this.http.put<Post>(
      "http://localhost:5000/posts/updatePost",
      { ...post.changes }
    );
  }

  // Nuevo metodo funciona pero hay que poner any como tipo de dato de la variable data que viene del operador map
  // override update(post: Update<Post>): Observable<Post> {
  //   return this.http.put<Post>(
  //     "http://localhost:5000/posts/updatePost",
  //     { ...post.changes }
  //   ).pipe(
  //     // map((data: { id?: string, _id?: string, title: string, description: string }) => {
  //       // return { changes: {title: post.title, description: post.description}, id: data._id };
  //       // return { ...data, post: { id: data['post']._id, title: data['post'].title, description: data['post'].description }};
  //     map((data: any) => {  
  //       const { post } = data;
  //       const { _id } = post;
  //       const customResp = { post: { id: _id, title: post.title, description: post.description } };
  //       // return {...data, post: {...data.post, id: _id}};
  //       // return {id: _id, _id, title: post.title, description: post.description};
  //       return {id: _id, title: post.title, description: post.description};
  //       // return { ...data };
  //       // return customResp;
  //     })
  //   );
  // }

  // Nuevo metodo funcionando solo en el caso de que en el back devolvamos { post: post }, se ha cambiado y se devuelve solo post,
  // sin ser la propiedad de un objeto, con lo cual funciona con el metodo original
  // override update(post: Update<Post>): Observable<Post> {
  //   return this.http.put<Post>(
  //     "http://localhost:5000/posts/updatePost",
  //     { ...post.changes }
  //   ).pipe(
  //     // map((data: { id?: string, _id?: string, title: string, description: string }) => {
  //       // return { changes: {title: post.title, description: post.description}, id: data._id };
  //       // return { ...data, post: { id: data['post']._id, title: data['post'].title, description: data['post'].description }};
  //     map((data: PostUpdateI) => {  
  //       const { post } = data;
  //       // const { _id } = post;
  //       const _id = post?._id ? post?._id : "";
  //       const customResp = { post: { id: _id, title: post?.title, description: post?.description } };
  //       // return {...data, post: {...data.post, id: _id}};
  //       // return {id: _id, _id, title: post.title, description: post.description};
  //       return {id: _id, title: post?.title || "", description: post?.description || ""};
  //       // return { ...data };
  //       // return customResp;
  //     })
  //   );
  // }

  override delete(id: string): Observable<string> {
    return this.http
      .delete(`http://localhost:5000/posts/deletePost/${id}`)
      .pipe(
        map((data) => {
          return id;
        })
      );
  }
}