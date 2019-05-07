import { Component, Output, EventEmitter } from '@angular/core';

import { SpaceshipsDataService } from '../../services/spaceships-data.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'stp-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss']
})
export class SearchComponent {
    constructor(private service: SpaceshipsDataService, private spinner: NgxSpinnerService, private toastr: ToastrService){}

    //Distance in MGLT
    public distance;
    
    //Event Emitter for passing search results
    @Output() onSearch = new EventEmitter();

    //Toast error function for form validation
    showError() {
      this.toastr.error('The distance should be greater than zero', 'Invalid Distance', { positionClass: 'toast-top-center' });
    }

    //Function that get all the scpaceships from the service and emit the results for cards creation
    getSpaceships(distance){
      //Validation
      if(this.distance <= 0 || this.distance == undefined){
        this.showError();
      } else {
        //Spinner to improve UX by giving the user a feeback about the waiting time
        this.spinner.show();
        //Service call
        this.service.getNumberOfStopsToGetProvisions(distance)
          .then((stopsPerShip) => {
            //Timeout to hide feeback spinner
            setTimeout(() => {
              this.spinner.hide();
            }, 500);
            //Emit search results
            this.onSearch.emit(stopsPerShip);
        })
      }
    }

}