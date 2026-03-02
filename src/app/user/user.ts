import { Component, inject, signal, OnInit, runInInjectionContext, Injector } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogAddUser } from '../dialog-add-user/dialog-add-user';
import { MatCardModule } from '@angular/material/card';
import { UsersService } from '../services/users-service';
import { Firestore } from '@angular/fire/firestore';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-user',
  imports: [
    MatIconModule,
    MatDividerModule,
    MatButtonModule,
    MatTooltipModule,
    MatDialogModule,
    DialogAddUser,
    MatCardModule,
    RouterLink,
    RouterModule,
  ],
  templateUrl: './user.html',
  styleUrl: './user.scss',
})
export class User implements OnInit {
  private firestore = inject(Firestore);
  positionOptions = ['above'];
  readonly dialog = inject(MatDialog);
  readonly animal = signal('');
  private injector = inject(Injector);
  readonly usersService = inject(UsersService);
  allUsers: any[] = [];

  openDialog() {
    const dialogRef = this.dialog.open(DialogAddUser, {});

    dialogRef.afterClosed().subscribe((result) => {
      if (result !== undefined) {
        this.animal.set(result);
      }
    });
  }

  observeUsers() {
    runInInjectionContext(this.injector, () => {
      this.usersService.getUsers().subscribe((users) => {
        this.allUsers = users;
        console.log(users);
      });
    });
  }

  ngOnInit() {
    this.observeUsers();
  }
}
