import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { ArticleInterface } from '@app-models/article.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-existent-articles',
  templateUrl: './existent-articles.component.html',
  styleUrls: ['./existent-articles.component.scss']
})
export class ExistentArticlesComponent implements OnChanges {

  @Input() articles: ArticleInterface[];
  @Output() showAbstractEmitter = new EventEmitter<number>();
  @Output() cancelEditionEmitter = new EventEmitter<boolean>();
  @Output() removeArticleEmitter = new EventEmitter<number>();
  @Output() editArticleEmitter = new EventEmitter<number>();

  constructor() {
    this.articles = [];
  }


  ngOnChanges(changes: SimpleChanges): void {
    if (changes['articles'].currentValue) {
      this.articles = changes['articles'].currentValue;
    }
  }

  getImageSource(index: number) {
    return this.articles[index].journal.toLowerCase().includes('plos one') ? './assets/img/descarga.png' : './assets/img/not_found.png'
  }

  showAbstract(index: number) {
    this.showAbstractEmitter.emit(index)
  }

  removeArticle(index: number) {
    Swal.fire({
      title: 'Are you sure you want to remove this article?',
      showDenyButton: true,
      confirmButtonText: 'Delete',
      denyButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        this.removeArticleEmitter.emit(index)
      }
    });
  }

  editArticle(index: number) {
    this.articles[index].isChoosed = true;
    this.articles[index].counterEdits++;
    this.editArticleEmitter.emit(index)
  }

  cancelEdition(index: number) {
    this.articles[index].isChoosed = false;
    this.editArticleEmitter.emit(index)
  }

}

