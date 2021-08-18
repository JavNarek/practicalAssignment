import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserPostComponent } from './components/user-post/user-post.component';
import { UsersListComponent } from './components/users-list/users-list.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: UsersListComponent,
  },
  {
    path: ':id',
    pathMatch: 'full',
    component: UserPostComponent,
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}
