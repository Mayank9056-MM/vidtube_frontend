export interface publishVideoData {
    video: File;
    thumbnail: File;
    title: string;
    description: string;
}

export interface updateVideoData {
    title?: string;
    description?: string;
    thumbnail?: File;
}