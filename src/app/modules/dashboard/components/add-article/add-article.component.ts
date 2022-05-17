import { Component, EventEmitter, Output } from '@angular/core';
import { ArticleInterface } from '../../../../models/article.model';
import { ArticleIndexInterface } from '../../../../models/articleIndex.model';

@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.scss']
})
export class AddArticleComponent {

  articleAbstract: string[] | string;
  articleJournal: string;
  articleTitleDisplay: string;
  articleIsChoosed: boolean;
  articleShowAbstract: boolean;
  articleCounterEdits: number;
  article: ArticleInterface;

  indexArticle: number;
  dict: ArticleIndexInterface;

  @Output() createArticleEmitter = new EventEmitter<ArticleInterface>();
  
  constructor() {
    this.articleAbstract = '';
    this.articleJournal = '';
    this.articleTitleDisplay = '';
    this.articleIsChoosed = false;
    this.articleShowAbstract = false;
    this.articleCounterEdits = 0;
    this.article = {} as ArticleInterface;

    this.indexArticle = 0;

    this.dict = {} as ArticleIndexInterface;
   }

  createArticle() {

    if(this.articleAbstract.length > 0 && this.articleJournal.length > 0 && this.articleTitleDisplay.length > 0) {
      this.article = {
        abstract: this.articleAbstract,
        journal: this.articleJournal,
        title_display: this.articleTitleDisplay,
        isChoosed: this.articleIsChoosed,
        showAbstract: this.articleShowAbstract,
        counterEdits: this.articleCounterEdits
      }
      
      this.createArticleEmitter.emit(this.article);
      
      this.clearInputs();
    }
  }

  clearInputs() {
    this.articleAbstract = [];
    this.articleJournal = '';
    this.articleTitleDisplay = '';
  }

}
