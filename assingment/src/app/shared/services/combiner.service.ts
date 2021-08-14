import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { forkJoin } from 'rxjs/internal/observable/forkJoin';
import { User, Post, CombinedData } from '../models/users.model';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root'
})
export class CombinerService {
  private combinedData = new ReplaySubject <CombinedData[]> ()
  combinedDataSubject = this.combinedData.asObservable()
  
  constructor(
    private userService: UsersService
  ) { }

  private combineData(sourceData:User[], injectData:Post[]){
    const groupedData = injectData.reduce<any>((acc, item)=>{
      if(acc[item.userId]?.length){
        acc[item.userId].push(item)
      }else{
        acc[item.userId]= []
        acc[item.userId].push(item)
      }
      return acc
    },{})
    
    return sourceData.map(item=>{
      return {...item, posts:groupedData[item.id] ? groupedData[item.id]:[]}
    })
  }

  getCombinedData(){
   forkJoin(
      {
        users: this.userService.getUserList(),
        posts: this.userService.getPostList()
      }
    ).subscribe(data=>{
      const {users, posts} = data
      this.combinedData.next(this.combineData(users, posts))
    })
  }
}
