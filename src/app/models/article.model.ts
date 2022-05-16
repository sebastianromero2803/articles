export interface ArticleInterface {
  journal: string | any;
  abstract: string[] | string | any;
  title_display: string | any;
  isChoosed: boolean;
  showAbstract: boolean;
  counterEdits: number;
}

export interface ArticleResponseModel {
  abstract: string[];
  article_type: string;
  author_display: string[];
  eissn: string
  id: string
  journal: string
  publication_date: string
  score: number
  title_display: string
}