import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ArticleInterface } from '../models/article.model';

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {

  constructor(private http: HttpClient) {
   }

  public getData() {
    return this.http.get('https://api.plos.org/search?q=title:DNA');
  }
  
}
