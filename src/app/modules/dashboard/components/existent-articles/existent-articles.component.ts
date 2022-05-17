import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ArticleInterface } from '@app-models/article.model';
import Swal from 'sweetalert2';
import { ArticleIndexInterface } from '../../../../models/articleIndex.model';

@Component({
  selector: 'app-existent-articles',
  templateUrl: './existent-articles.component.html',
  styleUrls: ['./existent-articles.component.scss']
})
export class ExistentArticlesComponent implements OnChanges {

  articlesForm: FormGroup;
  dict: ArticleIndexInterface;
  article: ArticleInterface;

  @Input() articleList: ArticleInterface[];
  @Output() showAbstractEmitter = new EventEmitter<number>();
  @Output() removeArticleEmitter = new EventEmitter<number>();
  @Output() editArticleEmitter = new EventEmitter<number>();
  @Output() addEditedArticleEmitter = new EventEmitter<ArticleIndexInterface>();

  constructor(private formBuilder: FormBuilder) {
    this.articleList = [];
    this.dict = {} as ArticleIndexInterface;
    this.article = {} as ArticleInterface;

    this.articlesForm = this.formBuilder.group({
      articles: this.formBuilder.array([]),
    });
    
  }

  get getArticleList() {
    return this.articlesForm.get("articles") as FormArray;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['articleList'].currentValue) {
      this.articleList = changes['articleList'].currentValue;
      this.getArticleList.clear();
      this.articleList.forEach((element) => {
        this.getArticleList.push(this.addArticle(element));
      });
    }
  }

  addArticle(articleData: ArticleInterface) {
    return this.formBuilder.group({
      title: [articleData.title_display],
      journal: [articleData.journal],
      abstract: [articleData.abstract],
    });
  }

  addEditedArticle(index: number) {
    this.dict.ind = index;
    this.article = {
      abstract: this.getArticleList.at(index).value.abstract,
      journal: this.getArticleList.at(index).value.journal,
      title_display: this.getArticleList.at(index).value.title,
      isChoosed: false,
      showAbstract: false,
      counterEdits: this.articleList[index].counterEdits
    }
  
    this.dict.article = this.article;
    this.addEditedArticleEmitter.emit(this.dict);
  
    this.dict = {
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
    
  }

  getImageSource(index: number) {
    return this.articleList[index].journal.toLowerCase().includes('plos one') ? './assets/img/descarga.png' : './assets/img/not_found.png'
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
        this.getArticleList.removeAt(index);
        this.removeArticleEmitter.emit(index);
      }
    });
  }

  editArticle(index: number) {
    this.editArticleEmitter.emit(index)
  }

  cancelEdition(index: number) {
    this.editArticleEmitter.emit(index)
  }

}

