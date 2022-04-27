import { Component, OnInit } from "@angular/core";
import {ArticlesService} from "@app-services/articles.service";
import {ArticleInterface} from "@app-models/article.model";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit   {

  articles: ArticleInterface[];

  constructor(private articleService: ArticlesService) {
    this.articles = [];
  }

  ngOnInit() {
    this.articleService.getData().subscribe((response: any) => {
      this.articles = response.response.docs.map((art: any) => {
        art.editMode = false;
        art.editCount = 0;
        art.abstract = art.abstract.join('\n');
        return art;
      });
    });
  }
  
  removeArticle(index: number) {
    this.articles.splice(index, 1);
  }

  createArticle(article: ArticleInterface) {
    this.articles.push(article);
  }

}
