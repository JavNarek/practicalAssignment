import { Component, OnInit } from '@angular/core';
import { CombinerService } from 'src/app/shared/services/combiner.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

  constructor(
    private combinerService: CombinerService
  ) { }

  ngOnInit(): void {
  }

}
