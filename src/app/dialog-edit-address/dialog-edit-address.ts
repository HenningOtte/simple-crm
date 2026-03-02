import { Component, inject } from '@angular/core';
import {
  MatDialogModule,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { User } from '../../models/user.class';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { doc, setDoc, addDoc } from 'firebase/firestore';
import { UsersService } from '../services/users-service';

@Component({
  selector: 'app-dialog-edit-address',
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
  templateUrl: './dialog-edit-address.html',
  styleUrl: './dialog-edit-address.scss',
})
export class DialogEditAddress {
  dialogRef = inject(MatDialogRef<DialogEditAddress>);
  usersService = inject(UsersService);
  loading = false;
  user = new User();
  birthdate?: Date;
  data = inject(MAT_DIALOG_DATA);

  saveUser() {
    console.log('Test');
    // console.log('Current User: ', this.user.toJSON());
    // this.addUser(this.user);
  }

  getNotesRef() {
    return this.usersService.usersRef();
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
}
