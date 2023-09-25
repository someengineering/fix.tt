export interface HashnodePostsResponse {
  data: {
    publication: {
      posts: {
        edges: {
          node: HashnodePost;
          cursor: string;
        }[];
      };
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

interface HashnodePost {
  title: string;
  brief: string;
  slug: string;
  author?: HashnodeAuthor;
  content?: { markdown: string };
  readTimeInMinutes: number;
}

interface HashnodeAuthor {
  name: string;
  tagline: string;
  profilePicture: string;
}
