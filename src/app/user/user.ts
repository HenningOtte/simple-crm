import { Component, inject, signal, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogAddUser } from '../dialog-add-user/dialog-add-user';
import { MatCardModule } from '@angular/material/card';
import { UsersService } from '../services/users-service';

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
  positionOptions = ['above'];
  readonly dialog = inject(MatDialog);
  readonly animal = signal('');
  usersService = inject(UsersService);

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddUser, {});

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      if (result !== undefined) {
        this.animal.set(result);
      }
    });
  }

  ngOnInit(): void {
    this.usersService.loadUsers();
  }
}
