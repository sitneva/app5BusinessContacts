import {Injectable} from '@angular/core';
import {FirebaseListObservable} from 'angularfire2/database-deprecated';
import {Business} from '../interfaces/Business';
import {Category} from '../interfaces/Category';
import {AngularFirestore} from 'angularfire2/firestore';
import {AngularFireDatabase} from 'angularfire2/database';

@Injectable()
export class FirebaseService {
  businesses: FirebaseListObservable<Business[]>;
  categories: FirebaseListObservable<Category[]>;
  constructor(private _af: AngularFireDatabase) {

  }

  getBusiness() {
    this.businesses = this._af.list('/businesses').valueChanges() as FirebaseListObservable<Business[]>
    return this.businesses;
  }

  getCategories() {
    this.categories = this._af.list('/categories').valueChanges() as FirebaseListObservable<Category[]>
    return this.categories;
  }
}
