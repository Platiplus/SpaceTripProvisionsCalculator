import { Starship } from './Starship.model';

export interface StarshipResponse {
        count: number,
        next: any,
        previous: any,
        results: Starship[]
}