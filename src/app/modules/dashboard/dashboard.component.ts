import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import {ArticlesService} from "@app-services/articles.service";
import {ArticleInterface} from "@app-models/article.model";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit   {

  articles: ArticleInterface[];
  editDictionary = { ind: 0, article: {} as ArticleInterface };

  constructor(private articleService: ArticlesService) {
    this.articles = [];
  }

  ngOnInit() {
    this.articleService.getData().subscribe((response: any) => {
      this.articles = response.response.docs.map((art: any) => {
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

  editArticle(index: number) {
    this.editDictionary = { ind: index, article: this.articles[index]};
  }

}
