export declare type Post = {
    instagram_id: string;
    caption: string;
    comments_count: number;
    like_count: number;
    permalink: string;
    shortcode: string;
    media_type: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
    media_url: string;
    thumbnail_url?: string;
    timestamp: string;
}
export declare type User = {
    id: number;
    provider: string;
    name: string;
    account_id: string;
    biography: string;
    profile_picture_url: string;
    followers_count: number;
    follows_count: number;
    media_count: number;
    media: Post[];
};

export declare type HeaderElements = 'profilePicture' | 'fullName' | 'username' | 'verifiedBadge' | 'postsCount' | 'followersCount' | 'followingCount' | 'followButton' | 'biography';
export declare type PostElements = 'likesCount' | 'commentsCount' | 'text';

export declare type Config = {
    targetId: string;
    accountId: string; maxItemsPerRow?: number; rows?: number; gap?: number; showHeader?: boolean; headerElements?: HeaderElements[] | undefined; postElements?: PostElements[] | undefined; postStyle?: "Overlay" | "Stacked" | undefined; tempalte?: string | undefined;
    template: string;
    breakpoints: { [key: string]: { itemsPerRow: number, spaceBetween: number } };
    includeCSS?: boolean;
};

export declare type RenderProps = {
    accountId: string;
    numberOfPosts: number;
    rows?: number;
    gap?: number;
    showHeader?: boolean;
    headerElements?: HeaderElements[];
    postElements?: PostElements[];
    postStyle?: "Overlay" | "Stacked";
    template?: string;
}
