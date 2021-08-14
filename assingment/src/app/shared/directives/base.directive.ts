import { Directive, OnDestroy } from '@angular/core'
import { Subject } from 'rxjs'

@Directive()
export class BaseComponentDirective implements OnDestroy {
 
  ngUnsubscribe = new Subject<void>()
  
  ngOnDestroy(): void {
    this.ngUnsubscribe.next()
    this.ngUnsubscribe.complete()
  }
}
