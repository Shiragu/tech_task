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
  avatar: ImageBitmap;
}

export interface IComment {
  id: number;
  created: string;
  text: string;
  author: number;
  parent: number | null;
  likes: number;
}
