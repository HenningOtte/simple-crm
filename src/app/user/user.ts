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
import { Firestore, collectionData, collection } from '@angular/fire/firestore';

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
    this.usersService.getUsers().subscribe((users) => {
      this.allUsers = users;
    });
  }

  ngOnInit() {
    this.observeUsers();
  }
}
