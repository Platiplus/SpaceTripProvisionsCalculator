import { Component } from '@angular/core';
import { SpaceshipsDataService } from './services/spaceships-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private service: SpaceshipsDataService) {}

  title = 'Space Trip Provisions Calculator';
  distance;
  spaceships = [];

  getSpaceshipsAndPopulateCards(distance){
    this.service.getNumberOfStopsToGetProvisions(distance).then((stopsPerShip) => {
      this.spaceships = stopsPerShip;
    })
  }
}