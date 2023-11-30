export interface IPagination<T> {
  pagination: {
    page: number;
    size: number;
    total_pages: number;
  };
  data: T;
}

export interface IAuthor {
  id: number;
  name: string;
  avatar: string;
}

export interface IComment {
  isLiked?: boolean;
  child?: IComment;
  id: number;
  created: string;
  text: string;
  author: number;
  parent: number | null;
  likes: number;
}
