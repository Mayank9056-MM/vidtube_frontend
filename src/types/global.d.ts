export interface User {
    _id: string;
    username: string;
    fullName: string;
    email: string;
    avatar: string;
    coverImage: string;
    watchHistory: string[];
    createdAt: string;
    updatedAt: string;
}

  export interface Video {
    id: number;
    thumbnail: string;
    title: string;
    channel: string;
    views: string;
    time: string;
    duration: string;
  };
