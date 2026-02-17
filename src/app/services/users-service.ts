import { Injectable, OnInit, inject } from '@angular/core';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { doc, setDoc, addDoc, getDocs } from 'firebase/firestore';
import { User } from '../../models/user.class';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private firestore = inject(Firestore);

  getUsersRef() {
    return collection(this.firestore, 'users');
  }

  async loadUsers() {
    const usersRef = this.getUsersRef();
    const snapshot = await getDocs(usersRef);
    snapshot.docs.map((doc) => {
      const user = doc.data() as User;
      console.log(user.firstName);
    });
  }
}
