import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { combineLatest, of } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { forkJoin } from 'rxjs/internal/observable/forkJoin';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { BaseComponentDirective } from 'src/app/shared/directives/base.directive';
import { CombinedData } from 'src/app/shared/models/users.model';
import { CombinerService } from 'src/app/shared/services/combiner.service';
import { DownloadService } from 'src/app/shared/services/download.service';

@Component({
  selector: 'app-user-post',
  templateUrl: './user-post.component.html',
  styleUrls: ['./user-post.component.scss'],
  providers: [DownloadService]
})
export class UserPostComponent extends BaseComponentDirective implements OnInit {
  user:CombinedData | undefined
test:any
  constructor(
    private route: ActivatedRoute,
    private combinerService: CombinerService,
    private downloadService:DownloadService
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
    .subscribe(val=>{
      this.getUserFromCombinedData(val[1],val[0])
    })
    // const html5 = '<p>Foo<br>here<img src="photo.jpg"></p>'
    // const doc = new DOMParser().parseFromString(html5, 'text/html');
    // const xhtml = new XMLSerializer().serializeToString(document.getElementsByClassName('voters')[0]);
    // console.log(xhtml);
    // this.loadImageBase64(xhtml)

  }
  ngAfterViewInit(){
    const xhtml = new XMLSerializer().serializeToString(document.getElementsByClassName('voters')[0]);
    this.func(xhtml)

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

  // loadImageBase64(src: string) {
  //   return new Promise((resolve,reject)=>{
  //     const canvas = document.createElement('canvas')
  //     const ctx = canvas.getContext('2d')
  //     const img = document.createElement('img')
  //     img.addEventListener('error', reject)
  //     img.addEventListener('load', ({target}: any)=>{
  //       console.log(target)
  //       ctx?.drawImage(target, 0, 0)
  //       resolve(canvas.toDataURL())
  //     })
  //     img.src = src
  //   })
  // }

  func(param:any){
    const {body} = document
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    canvas.width = canvas.height = 200

    const tempImg = document.createElement('img')
    tempImg.addEventListener('load', onTempImageLoad)
    tempImg.src = 'data:image/svg+xml,' + encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><foreignObject width="100%" height="100%">${param}</foreignObject></svg>`)

    const targetImg = document.createElement('img')
    body.appendChild(targetImg)

    function onTempImageLoad(e:any){
      ctx?.drawImage(e.target, 0, 0)
      targetImg.src = canvas.toDataURL()
    }
  }
}
