export interface HashnodePostsResponse {
  publication: {
    posts: HashnodePublicationPostConnection;
  };
}

export interface HashnodePostResponse {
  publication: {
    post: HashnodePost;
  };
}

export interface HashnodeTagResponse {
  tag: HashnodeTag;
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

export interface HashnodePost {
  title: string;
  subtitle?: string;
  brief: string;
  slug: string;
  coverImage?: HashnodeCoverImage;
  author: HashnodeUser;
  tags?: HashnodeTag[];
  content?: HashnodeContent;
  readTimeInMinutes: number;
  publishedAt: string;
  updatedAt: string;
}

export interface HashnodePostEdge {
  node: HashnodePost;
  cursor: string;
}

interface HashnodePublicationPostConnection {
  edges: HashnodePostEdge[];
  pageInfo: HashnodePageInfo;
  totalDocuments: number;
}

interface HashnodeSocialMediaLinks {
  website?: string;
  github?: string;
  twitter?: string;
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

export interface HashnodeUser {
  name: string;
  tagline: string;
  profilePicture: string;
  socialMediaLinks: HashnodeSocialMediaLinks;
  bioV2: HashnodeContent;
}
