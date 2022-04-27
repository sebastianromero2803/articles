import { Component, EventEmitter, OnInit, Output, Input, SimpleChanges } from '@angular/core';
import { ArticleInterface } from '../../../../models/article.model';

@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.scss']
})
export class AddArticleComponent implements OnInit {

  articleAbstract: string[] | string;
  articleJournal: string;
  articleTitleDisplay: string;
  article: ArticleInterface;

  indexArticle: number;

  @Input() editDictionary: {ind: number, article: ArticleInterface};
  @Output() createArticleEmitter = new EventEmitter<ArticleInterface>();
  @Output() editArticleEmitter = new EventEmitter<{ind: number, article: ArticleInterface}>();
  
  constructor() {
    this.articleAbstract = [];
    this.articleJournal = '';
    this.articleTitleDisplay = '';
    this.article = {} as ArticleInterface;

    this.indexArticle = 0;
    this.editDictionary = { ind: 0, article: {} as ArticleInterface };
   }

  ngOnInit(): void { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['editDictionary'].currentValue) {
      this.articleAbstract = this.editDictionary.article.abstract;
      this.articleJournal = this.editDictionary.article.journal;
      this.articleTitleDisplay = this.editDictionary.article.title_display;
    }
  }

  editArticle() {
    this.indexArticle = this.editDictionary.ind;
    this.article = {
      abstract: this.editDictionary.article.abstract,
      journal: this.editDictionary.article.journal,
      title_display: this.editDictionary.article.title_display,
    }

    this.editArticleEmitter.emit({ind: this.indexArticle, article: this.article});
  }

  createArticle() {

    this.article = {
      abstract: this.articleAbstract,
      journal: this.articleJournal,
      title_display: this.articleTitleDisplay,
    }
    
    this.createArticleEmitter.emit(this.article);

    this.articleAbstract = [];
    this.articleJournal = '';
    this.articleTitleDisplay = '';
  }

}
