export type Post = {
  id: number;
  userId: string;
  title: string;
  tag: string;
  content: string;
  comments: number[];
  likes: string[];
  timestamp: Date;
};

export type PostData = {
  title: string;
  content: string;
  tags: string[];
};

export type Comment = {
  _id: string;
  userId: string;
  postId: string;
  text: string;
  replyingTo: string;
  timestamp: Date;
};
