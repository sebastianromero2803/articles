import { Component, EventEmitter, OnInit, Output, Input, SimpleChanges } from '@angular/core';
import { ArticleInterface } from '../../../../models/article.model';
import { ArticleIndexInterface } from '../../../../models/articleIndex.model';

@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.scss']
})
export class AddArticleComponent implements OnInit {

  articleAbstract: string[] | string;
  articleJournal: string;
  articleTitleDisplay: string;
  articleIsChoosed: boolean;
  articleShowAbstract: boolean;
  articleCounterEdits: number;
  article: ArticleInterface;

  indexArticle: number;
  dict: ArticleIndexInterface;

  @Input() editDictionary: ArticleIndexInterface;
  @Output() createArticleEmitter = new EventEmitter<ArticleInterface>();
  @Output() addEditedArticleEmitter = new EventEmitter<ArticleIndexInterface>();
  
  constructor() {
    this.articleAbstract = [];
    this.articleJournal = '';
    this.articleTitleDisplay = '';
    this.articleIsChoosed = false;
    this.articleShowAbstract = false;
    this.articleCounterEdits = 0;
    this.article = {} as ArticleInterface;

    this.indexArticle = 0;
    this.editDictionary = {} as ArticleIndexInterface;

    this.dict = {} as ArticleIndexInterface;
   }

  ngOnInit(): void { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['editDictionary'].currentValue) {
      if(!this.editDictionary.article.isChoosed) {
        this.clearInputs();
      }
      else{
        this.articleAbstract = this.editDictionary.article.abstract;
        this.articleJournal = this.editDictionary.article.journal;
        this.articleTitleDisplay = this.editDictionary.article.title_display;
      }
    }
  }

  clearInputs() {
    this.articleAbstract = [];
    this.articleJournal = '';
    this.articleTitleDisplay = '';
  }

  addEditedArticle() {
    this.indexArticle = this.editDictionary.ind;
    this.article = {
      abstract: this.articleAbstract,
      journal: this.articleJournal,
      title_display: this.articleTitleDisplay,
      isChoosed: this.articleIsChoosed,
      showAbstract: this.articleShowAbstract,
      counterEdits: this.editDictionary.article.counterEdits
    }

    this.dict = { ind: this.indexArticle, article: this.article };

    this.addEditedArticleEmitter.emit(this.dict);

    this.editDictionary = {
      ind: 0,
      article: {
        abstract: [],
        journal: '',
        title_display: '',
        isChoosed: false,
        showAbstract: false,
        counterEdits: 0
      }
    }

    this.clearInputs();
    
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

}
