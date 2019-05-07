import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StarshipResponse } from '../model/StarshipResponse.model'
import { Starship } from '../model/Starship.model'
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SpaceshipsDataService {
  HOURS = 24;

  YEAR = 365 * this.HOURS;
  MONTH = 30 * this.HOURS;
  WEEK = 7 * this.HOURS;
  DAY = 1 * this.HOURS;

  constructor(private http: HttpClient) {}

  getNumberOfStopsToGetProvisions(distance){
    return new Promise((resolve, reject) => {
      this.getStarships(environment.api_url, [], resolve, reject);
    })
      .then(response => {
        let ships: Starship[] = [].concat(response);
        let spaceships = [];
        ships.forEach(element => {
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
    this.http.get<StarshipResponse>(url)
      .subscribe(response => {
        const starshipsCollection = starships.concat(response.results);
        if (response.next !== null) {
          this.getStarships(response.next, starshipsCollection, resolve, reject);
        } else {
          resolve(starshipsCollection);
        }
      }, error => {
        reject('There is something wrong with our nerds, maybe one of them fell down while retrieving the data!');
      });
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
