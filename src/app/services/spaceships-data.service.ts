import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

//Models importing
import { StarshipResponse } from '../model/StarshipResponse.model'
import { Starship } from '../model/Starship.model'

@Injectable({
  providedIn: 'root'
})
export class SpaceshipsDataService {
  //CONSTANTS

  //Number of hours in a day to use for calculations
  private HOURS = 24;
  
  //Calculations of time periods based on default values
  private YEAR = 365 * this.HOURS;
  private MONTH = 30 * this.HOURS;
  private WEEK = 7 * this.HOURS;
  private DAY = 1 * this.HOURS;

  constructor(private http: HttpClient) {}

  //Function that retrieves the formatted card objects with the proper information based on the api response
  public getNumberOfStopsToGetProvisions(distance){
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

  //Recursive function to retrieve all the ships from the api, repeating itself in case of more pages
  private getStarships = (url, starships, resolve, reject) => {
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

  //Function that retrieves the number of stops per ship
  private getNumberOfStops(distance, element) {
    if(element.consumables == 'unknown' || element.MGLT == 'unknown'){
      return 'Unknown';
    } else {
      return this.transformInt((distance / element.MGLT) / this.calculateHoursOfProvisions(element.consumables));
    }
  }

  //Function to calculate total hours of provisions that the ship is able to carry based on the string received from the api
  private calculateHoursOfProvisions(time:String){
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

  //Function to parse string to int **not necessary but improves readability**
  private transformInt(number){
    return parseInt(Number(number).toFixed(0));
  }
}
