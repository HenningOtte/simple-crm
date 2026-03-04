import { Component, inject } from '@angular/core';
import { provideNativeDateAdapter } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule, MatCalendarCellClassFunction } from '@angular/material/datepicker';
import {
  MatDialogActions,
  MatDialogContent,
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { User } from '../../models/user.class';
import { UsersService } from '../services/users-service';

@Component({
  selector: 'app-dialog-edit-user',
  imports: [
    MatDialogModule,
    MatDialogActions,
    MatDialogContent,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressBarModule,
    MatDatepickerModule,
  ],
  templateUrl: './dialog-edit-user.html',
  styleUrl: './dialog-edit-user.scss',
  providers: [provideNativeDateAdapter()],
})
export class DialogEditUser {
  dialogRef = inject(MatDialogRef<DialogEditUser>);
  loading = false;
  birthdate?: Date;
  usersService = inject(UsersService);
  user = new User();
  userId: any = '';

  closeDialog() {
    this.dialogRef.close();
  }

  saveUser() {
    if (this.birthdate) {
      this.user.birthDate = this.birthdate?.getTime();
    }
    if (this.userId && this.user) {
      this.usersService.updateUser(this.userId, this.user);
    }
  }

  dateClass: MatCalendarCellClassFunction<Date> = (cellDate, view) => {
    // Only highligh dates inside the month view.
    if (view === 'month') {
      const date = cellDate.getDate();
      // Highlight the 1st and 20th day of each month.
      return date === 1 || date === 20 ? 'example-custom-date-class' : '';
    }
    return '';
  };
}
