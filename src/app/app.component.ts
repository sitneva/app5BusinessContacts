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

  changeState(state, key) {
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
}
