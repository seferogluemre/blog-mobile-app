export interface BlogPost {
  id: number;
  title: string;
  description: string;
  tags: string[];
  commentCount: number;
  createdAt?: string;
  author?: string;
}

export interface BlogDetail {
  id: number;
  title: string;
  content: string;
  description: string;
  tags: string[];
  author: Author;
  createdAt: string;
  readingTime: number; // dakika cinsinden
  commentCount: number;
  comments: BlogComment[];
}

export interface Author {
  id: number;
  name: string;
  username: string;
  avatar?: string;
}

export interface BlogComment {
  id: number;
  postId: number;
  author: Author;
  content: string;
  createdAt: string;
}

export interface Comment {
  id: number;
  postId: number;
  text: string;
  author: string;
  createdAt: string;
}

export interface Tag {
  id: number;
  name: string;
  color?: string;
} 