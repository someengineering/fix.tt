export interface HashnodeDraftResponse {
  draft: HashnodeDraft;
}

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

export interface HashnodePublicationResponse {
  publication: {
    id: string;
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

export interface HashnodeDraft {
  id: string;
  title: string;
  // subtitle?: string;
  coverImage?: HashnodeCoverImage;
  author: HashnodeUser;
  tags?: HashnodeTag[];
  content?: HashnodeContent;
  dateUpdated: string;
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
  id: string;
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
  updatedAt?: string;
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

export interface HashnodeTag {
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
