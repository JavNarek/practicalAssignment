import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs/internal/Observable';
import { delay } from 'rxjs/operators';
import { Post, User } from '../models/users.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {


  constructor(
    private httpClient: HttpClient
  ) { }


  getUserList(): Observable<User[]> {
    const url = `assets/users.json`
    return this.httpClient.get<User[]>(url).pipe(delay(5000)) // Slow late response imitation
  }

  getPostList(): Observable<Post[]> {
    const url = `assets/posts.json`
    return this.httpClient.get<Post[]>(url)
  }
}
