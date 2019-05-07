//Imports
import { Starship } from './Starship.model';

//StarshipResponse model (that comes from the api)
export interface StarshipResponse {
        count: number,
        next: any,
        previous: any,
        results: Starship[]
}