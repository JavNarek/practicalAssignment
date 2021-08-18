import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { BaseComponentDirective } from 'src/app/shared/directives/base.directive';
import { CombinedData, User } from 'src/app/shared/models/users.model';
import { CombinerService } from 'src/app/shared/services/combiner.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent
  extends BaseComponentDirective
  implements OnInit
{
  users: CombinedData[] = [];

  constructor(
    private combinerService: CombinerService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    super();
  }

  ngOnInit(): void {
    this.combinerService.combinedDataSubject
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((data) => {
        this.users = data;
      });
  }

  click(user: CombinedData) {
    const { id } = user;
    if (id) {
      this.router.navigate([id], { relativeTo: this.route });
    }
  }
}
