export interface HashnodePostsResponse {
  data: {
    publication: {
      posts: HashnodePublicationPostConnection;
    };
  };
}

export interface HashnodePostResponse {
  data: {
    publication: {
      post: HashnodePost;
    };
  };
}

interface HashnodeContent {
  markdown?: string;
  html?: string;
  text?: string;
}

interface HashnodeCoverImage {
  url: string;
  isPortrait?: boolean;
}

interface HashnodeFeedPostConnection {
  edges: HashnodePostEdge[];
  pageInfo: HashnodePageInfo;
}

interface HashnodePageInfo {
  hasNextPage: boolean;
  endCursor: string;
}

interface HashnodePost {
  title: string;
  brief: string;
  slug: string;
  coverImage?: HashnodeCoverImage;
  author?: HashnodeUser;
  tags?: HashnodeTag[];
  content?: HashnodeContent;
  readTimeInMinutes: number;
  publishedAt: string;
  updatedAt: string;
}

interface HashnodePostEdge {
  node: HashnodePost;
  cursor: string;
}

interface HashnodePublicationPostConnection {
  edges: HashnodePostEdge[];
  pageInfo: HashnodePageInfo;
  totalDocuments: number;
}

interface HashnodeTag {
  id: string;
  name: string;
  slug: string;
  logo: string;
  tagline: string;
  postsCount: number;
  posts: HashnodeFeedPostConnection;
}

interface HashnodeUser {
  name: string;
  tagline: string;
  profilePicture: string;
  bioV2: HashnodeContent;
}
