import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { ArticleInterface } from '@app-models/article.model';

@Component({
  selector: 'app-existent-articles',
  templateUrl: './existent-articles.component.html',
  styleUrls: ['./existent-articles.component.scss']
})
export class ExistentArticlesComponent implements OnInit {

  @Input() articles: ArticleInterface[];
  @Output() removeArticleEmitter = new EventEmitter<number>();

  edit: ArticleInterface = {
    id: '',
    journal: '',
    abstract: '',
    title_display: '',
    edition_mode: false
  };

  constructor() {
    this.articles = [];
  }

  ngOnInit(): void {
    
  }

  removeArticle(index: number) {
    this.removeArticleEmitter.emit(index)
  }

  editArticle(articleId: string): void {
    const articleIndex = this.articles.findIndex((art) => art.id === articleId);
    this.edit = this.articles[articleIndex];
  }

}

