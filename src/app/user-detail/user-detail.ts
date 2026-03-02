import {
  Component,
  inject,
  OnInit,
  ChangeDetectorRef,
  runInInjectionContext,
  Injector,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../services/users-service';
import { User } from '../../models/user.class';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { DialogEditAddress } from '../dialog-edit-address/dialog-edit-address';
import { DialogEditUser } from '../dialog-edit-user/dialog-edit-user';

@Component({
  selector: 'app-user-detail',
  imports: [
    MatCardModule,
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    DialogEditAddress,
    DialogEditUser,
  ],
  templateUrl: './user-detail.html',
  styleUrl: './user-detail.scss',
})
export class UserDetail implements OnInit {
  readonly dialog = inject(MatDialog);
  private activatedRoute = inject(ActivatedRoute);
  readonly usersService = inject(UsersService);
  userId: any = '';
  singelUser: User = new User();
  private cd = inject(ChangeDetectorRef);
  private injector = inject(Injector);

  editMenu() {
    const dialog = this.dialog.open(DialogEditAddress);
    dialog.componentInstance.user = this.singelUser;
  }

  editUserDetail() {
    const dialogRef = this.dialog.open(DialogEditUser, {});
  }

  ngOnInit() {
    runInInjectionContext(this.injector, () => {
      const id = this.activatedRoute.snapshot.paramMap.get('id');
      if (!id) return;

      this.usersService.singleUserRef(id).subscribe((user) => {
        this.singelUser = new User(user);
        this.cd.detectChanges();
      });
    });
  }
}
