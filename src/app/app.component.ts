import {Component, OnInit} from '@angular/core';
import {FirebaseService} from './services/firebase.service';
import {Business} from './interfaces/Business';
import {Category} from './interfaces/Category';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  businesses: Business[];
  categories: Category[];
  appState: string;
  activeKey: string;
  constructor(private firebaseService: FirebaseService) {

  }

  ngOnInit() {
    this.firebaseService.getBusiness().subscribe(businesses =>
      this.businesses = businesses );

    this.firebaseService.getCategories().subscribe(categories =>
      this.categories = categories );
  }

  changeState(state, key = null) {
    console.log('Key: ' + JSON.stringify(key));
    if (key) {
      this.activeKey = key;
      console.log('Active key:' + this.activeKey);
    }
    this.appState = state;
    console.log('appState:' + this.appState);
  }

  onFilterCategory(category) {
    this.firebaseService.getBusiness(category).subscribe(businesses =>
      this.businesses = businesses );
  }

  addBusiness(
    company: string,
    category: string,
    years_in_business: number,
    description: string,
    phone: string,
    email: string,
    street_address: string,
    city: string,
    state: string,
    zipcode: string) {
    const created_at = new Date().toDateString();

    const newBussines: Business = {
      company: company,
      category: category,
      years_in_business: years_in_business,
      description: description,
      phone: phone,
      email: email,
      street_address: street_address,
      city: city,
      state: state,
      zipcode: zipcode,
      created_at: created_at
    };

    this.firebaseService.addBusiness(newBussines);
    this.changeState('default');
  }
}
