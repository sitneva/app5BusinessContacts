import {Injectable} from '@angular/core';
import {FirebaseListObservable} from 'angularfire2/database-deprecated';
import {Business} from '../interfaces/Business';
import {Category} from '../interfaces/Category';
import {AngularFirestore} from 'angularfire2/firestore';
import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class FirebaseService {
  buss: AngularFireList<any>;
  cat: AngularFireList<any>;
  businesses: Observable<Business[]>;
  categories: Observable<Category[]>;
  constructor(private _af: AngularFireDatabase) {

  }

  getBusiness(category: string = null) {
    if (category != null && category !== '0' ) {
      this.buss = this._af.list('/businesses', ref => ref.orderByChild('category').equalTo(category));
    } else {
      this.buss = this._af.list('/businesses');
    }

    this.businesses = this.buss.snapshotChanges().map(changes => {
      return changes.map(c => ({ $key: c.payload.key, ...c.payload.val() }));
    });
    return this.businesses;
  }

  getCategories() {
    this.cat = this._af.list('/categories');
    this.categories = this.cat.snapshotChanges().map(changes => {
      return changes.map(c => ({ $key: c.payload.key, ...c.payload.val() }));
    });
    return this.categories;
  }

  addBusiness(newBusiness: Business) {
    return this.buss.push(newBusiness);
  }

  updateBusiness(key, updBusiness) {
    return this.buss.update(key, updBusiness);
  }

  removeBusiness(key) {
    return this.buss.remove(key);
  }
}
