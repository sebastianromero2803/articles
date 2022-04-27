import { Component } from '@angular/core';
import { CardService } from '@app-services/card.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {

  get cards() {
    return this.cardService.cards;
  }

  constructor( public cardService: CardService ) { }

}
