import { ViewportScroller } from '@angular/common';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { combineLatest, of } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { BaseComponentDirective } from 'src/app/shared/directives/base.directive';
import { CombinedData } from 'src/app/shared/models/users.model';
import { CombinerService } from 'src/app/shared/services/combiner.service';
import { DownloadService } from 'src/app/shared/services/download.service';

@Component({
  selector: 'app-user-post',
  templateUrl: './user-post.component.html',
  styleUrls: ['./user-post.component.scss'],
  encapsulation:ViewEncapsulation.None,
  providers: [DownloadService]
})
export class UserPostComponent extends BaseComponentDirective implements OnInit {
  user:CombinedData | undefined
test:any
  constructor(
    private route: ActivatedRoute,
    private combinerService: CombinerService,
    private downloadService:DownloadService,
    private viewportScroller: ViewportScroller
  ) {
    super()

  }

  ngOnInit(): void {
    combineLatest(
      [
        this.getParam(),
        this.getUsers()
      ]
    )
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(val=>{
      this.getUserFromCombinedData(val[1],val[0])
    })

  }


  getUserFromCombinedData(data:CombinedData[], param: Params){
    const {id} = param
    this.user = data.find(item => item.id === +id)
  }


  getParam(): Observable<Params>{
    return this.route.params
  }

  getUsers():Observable<CombinedData[]>{
    return this.combinerService.combinedDataSubject
  }


  downloadAsCSV(){
    const headers = ['title', 'body']
    this.downloadService.downloadFile(this.user?.posts, headers, 'jsontocsv')
  }

  onClick(elementId: string): void {
    this.viewportScroller.scrollToAnchor(elementId);
  }

  downloadAsSVG(){
    this.downloadService.downloadPNG('export','crop')
  }
}
