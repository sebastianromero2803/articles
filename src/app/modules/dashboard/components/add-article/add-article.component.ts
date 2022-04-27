import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ArticleInterface } from '../../../../models/article.model';

@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.scss']
})
export class AddArticleComponent implements OnInit {

  articleId: string;
  articleAbstract: string[] | string;
  articleJournal: string;
  articleTitleDisplay: string;
  edition_mode: boolean;
  article: ArticleInterface;

  @Output() createArticleEmitter = new EventEmitter<ArticleInterface>();
  
  constructor() {
    this.articleId = '';
    this.articleAbstract = [];
    this.articleJournal = '';
    this.articleTitleDisplay = '';
    this.edition_mode = false;
    this.article = {} as ArticleInterface;
   }

  ngOnInit(): void { }

  createArticle() {

    this.article = {
      id: this.articleId,
      abstract: this.articleAbstract,
      journal: this.articleJournal,
      title_display: this.articleTitleDisplay,
      edition_mode: this.edition_mode
    }
    
    this.createArticleEmitter.emit(this.article);
  }

}
