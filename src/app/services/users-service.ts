import { Injectable, inject, runInInjectionContext, Injector } from '@angular/core';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private firestore = inject(Firestore);
  private injector = inject(Injector);
  allUsers: any = [];

  getUsers() {
    return runInInjectionContext(this.injector, () => {
      const usersRef = collection(this.firestore, 'users');
      return collectionData(usersRef, { idField: 'id' });
    });
  }
}
