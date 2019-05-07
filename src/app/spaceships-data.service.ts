import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class SpaceshipsDataService {
  HOURS = 24;

  YEAR = 365 * this.HOURS;
  MONTH = 30 * this.HOURS;
  WEEK = 7 * this.HOURS;
  DAY = 1 * this.HOURS;

  constructor() {}

  getNumberOfStopsToGetProvisions(distance){
    return new Promise((resolve, reject) => {
      this.getStarships('https://swapi.co/api/starships', [], resolve, reject);
    })
      .then(response => {
        let spaceships = [];
        response.forEach(element => {
          spaceships.push(
            {
              name: element.name,
              model: element.model,
              stops: this.getNumberOfStops(distance, element)
            }
          );
        });
        return spaceships;
      })
  }

  getStarships = (url, starships, resolve, reject) => {
    axios.get(url)
      .then(response => {
        const starshipsCollection = starships.concat(response.data.results);
        if (response.data.next !== null) {
          this.getStarships(response.data.next, starshipsCollection, resolve, reject);
        } else {
          resolve(starshipsCollection);
        }
      })
      .catch(error => {
        console.log(error);
        reject('There is something wrong with our nerds, maybe one of them fell down while retrieving the data!');
      })
    }

  private getNumberOfStops(distance, element) {
    if(element.consumables == 'unknown' || element.MGLT == 'unknown'){
      return 'Unknown';
    } else {
      return this.transformInt((distance / element.MGLT) / this.calculateHoursOfProvisions(element.consumables));
    }
  }

    calculateHoursOfProvisions(time:String){
      let period;
      let quantifier;
      let hoursOfProvisions;

      if(time !== 'unknown'){
        period = time.split(' ')[1];
        quantifier = time.split(' ')[0];
      }

      switch(period){
        case 'year':
        case 'years':
        hoursOfProvisions = this.YEAR * quantifier;
        break;

        case 'month':
        case 'months':
        hoursOfProvisions = this.MONTH * quantifier;
        break;
        
        case 'week':
        case 'weeks':
        hoursOfProvisions = this.WEEK * quantifier;
        break;

        case 'day':
        case 'days':
        hoursOfProvisions = this.DAY * quantifier;
        break;

        default:
        break;
      }

      return Number(hoursOfProvisions);
      
    }

    transformInt(number){
      return parseInt(Number(number).toFixed(0));
    }
}
