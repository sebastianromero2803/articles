export interface ArticleInterface {
  journal: string;
  abstract: string[] | string;
  title_display: string;
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