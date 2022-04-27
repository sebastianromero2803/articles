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
  @Output() editArticleEmitter = new EventEmitter<number>();

  constructor() {
    this.articles = [];
  }

  ngOnInit(): void {
    
  }

  removeArticle(index: number) {
    this.removeArticleEmitter.emit(index)
  }

  editArticle(index: number): void {
    this.editArticleEmitter.emit(index)
  }

}

