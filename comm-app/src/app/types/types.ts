export type Post = {
  id: number;
  userId: string;
  username: string;
  title: string;
  tag: string;
  content: string;
  comments: string[];
  likes: string[];
  timestamp: string;
};

export type PostListData = {
  id: string;
  title: string;
  tag: string;
  timestamp: string;
  numLikes: number;
  username: string;
};

export type PostData = {
  title: string;
  content: string;
  tags: string[];
};

export type Comment = {
  id: string;
  username: string;
  userImg: string;
  postId: string;
  text: string;
  replyingTo: string;
  timestamp: string;
};
