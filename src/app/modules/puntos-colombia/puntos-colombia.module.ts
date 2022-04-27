import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";

import { PuntosColombiaComponent } from "./components/principal/puntos-colombia.component";

import { CardService } from "@app-services/card.service";



@NgModule({
  declarations: [PuntosColombiaComponent],
  imports: [CommonModule, FormsModule, RouterModule],
  exports: [PuntosColombiaComponent],
  providers: [CardService]
})
export class PuntosColombiaModule {}
