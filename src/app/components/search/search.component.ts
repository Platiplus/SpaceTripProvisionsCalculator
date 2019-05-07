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

    public distance;

    @Output() onSearch = new EventEmitter();

    showError() {
      this.toastr.error('The distance should be greater than zero', 'Invalid Distance', { positionClass: 'toast-top-center'});
    }

    getSpaceships(distance){
      if(this.distance <= 0 || this.distance == undefined){
        this.showError();
      } else {
        this.spinner.show();
        this.service.getNumberOfStopsToGetProvisions(distance)
          .then((stopsPerShip) => {
            setTimeout(() => {
              this.spinner.hide();
            }, 500);
            this.onSearch.emit(stopsPerShip);
        })
      }
    }

}