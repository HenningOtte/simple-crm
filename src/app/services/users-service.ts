import { Injectable, inject, runInInjectionContext, Injector } from '@angular/core';
import {
  Firestore,
  collectionData,
  collection,
  docData,
  doc,
  updateDoc,
} from '@angular/fire/firestore';
import { User } from '../../models/user.class';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private firestore = inject(Firestore);
  private injector = inject(Injector);
  allUsers: any = [];

  singleUserRef(userId: string) {
    return docData(doc(this.usersRef(), userId));
  }

  usersRef() {
    return collection(this.firestore, 'users');
  }

  getUsers() {
    return collectionData(this.usersRef(), { idField: 'id' });
  }

  async updateUser(id: string, user: User) {
    const userRef = doc(this.usersRef(), id);
    await updateDoc(userRef, user.toJSON());
  }
}
