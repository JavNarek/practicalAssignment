import { Injectable }  from '@angular/core';
import { CombinerService } from './combiner.service';
 
@Injectable()
export class AppInitService {
 
    constructor(
      private combinerService: CombinerService
    ) {
      this.combinerService.getCombinedData()
    }
    
    init() {
      return new Promise<void>((resolve, reject) => {
        this.combinerService.combinedDataSubject
        .subscribe(
          () =>{
            resolve()
          },
          ()=>{
            reject()
          }
        )
      });
    }
}