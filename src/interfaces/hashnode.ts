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

export interface HashnodePublicationPostConnection {
  edges: HashnodePostEdge[];
  pageInfo: HashnodePageInfo;
  totalDocuments: number;
}

interface HashnodeSocialMediaLinks {
  website?: string;
  github?: string;
  twitter?: string;
  instagram?: string;
  facebook?: string;
  stackoverflow?: string;
  linkedin?: string;
  youtube?: string;
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
  socialMediaLinks: HashnodeSocialMediaLinks;
  bioV2: HashnodeContent;
}
