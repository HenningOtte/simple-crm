import { Injectable, inject, runInInjectionContext, Injector } from '@angular/core';
import { Firestore, collectionData, collection, docData } from '@angular/fire/firestore';
import { doc } from 'firebase/firestore';

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
}
