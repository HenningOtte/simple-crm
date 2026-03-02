import { Component, inject } from '@angular/core';
import {
  MatDialogModule,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
} from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule, MatCalendarCellClassFunction } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { User } from '../../models/user.class';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { doc, setDoc, addDoc } from 'firebase/firestore';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-dialog-add-user',
  imports: [
    MatDialogContent,
    MatDialogActions,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDatepickerModule,
    MatProgressBarModule,
  ],
  templateUrl: './dialog-add-user.html',
  styleUrl: './dialog-add-user.scss',
  providers: [provideNativeDateAdapter()],
})
export class DialogAddUser {
  user = new User();
  birthdate?: Date;
  private firestore = inject(Firestore);
  loading = false;
  dialogRef = inject(MatDialogRef<DialogAddUser>);

  saveUser() {
    if (this.birthdate) {
      this.user.birthDate = this.birthdate?.getTime();
    }
    console.log('Current User: ', this.user.toJSON());
    this.addUser(this.user);
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

  getNotesRef() {
    return collection(this.firestore, 'users');
  }

  async addUser(user: User) {
    this.loading = true;
    const docRef = await addDoc(this.getNotesRef(), user.toJSON())
      .catch((err) => {
        console.error(err);
      })
      .then((docRef) => {
        console.log('Document written with ID: ', docRef?.id);
        this.loading = false;
        this.dialogRef.close();
      });
  }

  closeDialog() {
    this.dialogRef.close();
  }

  createUserObj() {}
}
