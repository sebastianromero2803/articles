import { Component, OnInit } from "@angular/core";
import {ArticlesService} from "@app-services/articles.service";
import {ArticleInterface, ArticleResponseModel} from "@app-models/article.model";
import { ArticleIndexInterface } from "@app-models/articleIndex.model";
import Swal from 'sweetalert2';


@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit   {

  articles: ArticleInterface[];
  message: string;

  constructor(private articleService: ArticlesService) {
    this.articles = [];
    this.message = '';
  }

  ngOnInit() {
    this.articleService.getData().subscribe((response: any) => {
      this.articles = response.response.docs.map((element: ArticleResponseModel, index: number) => {
        const payload = {
          id: index,
          title_display: element.title_display,
          journal: element.journal,
          abstract: element.abstract.join('\n'),
          counterEdits: 0,
        }
        return Object.assign({}, payload);
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
    this.articles = [...this.articles, article];
    console.log(this.articles);
    Swal.fire('Article added', '', 'success');
  }

  editArticle(index: number) {
    this.articles[index].isChoosed = !this.articles[index].isChoosed;
    this.articles[index].showAbstract = true;
  }

  addEditedArticle(dict: ArticleIndexInterface) {
    this.articles[dict.ind].showAbstract = false;
    this.articles.splice(dict.ind, 1, dict.article);
    this.articles[dict.ind].counterEdits++;
    if (!(dict.article.counterEdits - 1))
      this.message = 'You have edited this article '+ dict.article.counterEdits + ' time';
    else
      this.message = 'You have edited this article '+ this.articles[dict.ind].counterEdits + ' times';
    Swal.fire(this.message, '', 'success');
  }

}
