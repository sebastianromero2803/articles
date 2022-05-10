import { Component, OnInit } from "@angular/core";
import {ArticlesService} from "@app-services/articles.service";
import {ArticleInterface} from "@app-models/article.model";
import { ArticleIndexInterface } from '../../models/articleIndex.model';
import Swal from 'sweetalert2';

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit   {

  articles: ArticleInterface[];
  editDictionary = { ind: 0, article: {} as ArticleInterface };
  message: string;

  constructor(private articleService: ArticlesService) {
    this.articles = [];
    this.message = '';
  }

  ngOnInit() {
    this.articleService.getData().subscribe((response: any) => {
      this.articles = response.response.docs.map((art: any) => {
        art.abstract = art.abstract.join('\n');
        art.counterEdits = 0;
        return art;
      });
    });
  }

  showAbstract(index: number) {
    this.articles[index].showAbstract = !this.articles[index].showAbstract;
  }
  
  removeArticle(index: number) {
    this.articles.splice(index, 1);
    Swal.fire('Article removed', '', 'success');
  }

  createArticle(article: ArticleInterface) {
    this.articles.push(article);
  }

  editArticle(index: number) {
    this.editDictionary = { ind: index, article: this.articles[index]};
  }

  addEditedArticle(dict: ArticleIndexInterface) {
    this.articles.splice(dict.ind, 1, dict.article);
    console.log(dict);
    this.message = 'You have edited this article '+ dict.article.counterEdits + ' times';
    Swal.fire(this.message, '', 'success');
  }

}
