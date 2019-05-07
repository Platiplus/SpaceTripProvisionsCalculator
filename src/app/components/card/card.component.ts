import { Component, Input } from '@angular/core';

@Component({
  selector: 'stp-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {
    @Input() spaceship;
}