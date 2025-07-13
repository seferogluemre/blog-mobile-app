export interface BlogPost {
  id: number;
  title: string;
  description: string;
  tags: string[];
  commentCount: number;
  createdAt?: string;
  author?: string;
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