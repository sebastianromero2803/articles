import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { DashboardRoutingModule } from "../dashboard/dashboard-routing.module";
import { AngularMaterialModule, FormsModule } from '@shared/index';

import { DashboardComponent } from "./dashboard.component";

import { AddArticleComponent } from './components/add-article/add-article.component';
import { ExistentArticlesComponent } from './components/existent-articles/existent-articles.component';

import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [DashboardComponent, AddArticleComponent, AddArticleComponent, ExistentArticlesComponent],
  imports: [CommonModule, DashboardRoutingModule, AngularMaterialModule, FormsModule, ReactiveFormsModule],
})
export class DashboardModule {}
