import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  readOnly = false;
  scaleValue = 1.0;

  graphData = {
    'a': ['b', 'c'],
    'b': ['f'],
    'c': ['e', 'd'],
    'd': [],
    'e': [],
    'f': ['g'],
    'g': []
  };

  scale(value: number) {
    this.scaleValue = this.scaleValue + value;
  }
}
