import mustache from 'mustache';
import { DEFAULT_TEMPLATE } from './constants';
import { RenderProps } from './types';

export class FeedFramer {
    apiToken: string;
    baseUrl: string;
    constructor(config: { apiToken: string, baseUrl?: string }) {
        this.apiToken = config.apiToken;
        this.baseUrl = config.baseUrl || 'https://feedframer.com';
    }
    protected request<T>(endpoint: string, options?: RequestInit): Promise<T> {
        const url = `${this.baseUrl}${endpoint}`;
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.apiToken,
            'Accept': 'application/json',
        };
        const config = {
            ...options,
            headers,
        };

        return fetch(url, config).then((res) => res.json());
    }
    public getData({
        accountId,
        numberOfPosts
    }: {
        accountId: string;
        numberOfPosts: number
    }): Promise<{ data: any }> {
        const url = `/api/feed?numberOfPosts=${numberOfPosts}&accountId=${accountId}`;
        return this.request(url);
    }

    // Method to generate dynamic CSS
    private generateDynamicCSS(
        targetId: string,
        itemsPerRow: number,
        spaceBetween: number,
        breakpoints: { [key: string]: { itemsPerRow: number, spaceBetween: number } }
    ): void {

        const style = document.createElement('style');
        let baseStyles = `
          #${targetId} .ff-posts {
              display: grid;
              grid-template-columns: 1fr;
              gap: ${spaceBetween}px;
          }
          @container (min-width: 480px) {
              #${targetId}  .ff-posts {
              grid-template-columns: 1fr 1fr;
              gap: ${spaceBetween}px;
              }
          }
          @container (min-width: 800px) {
              #${targetId}  .ff-posts {
              grid-template-columns: repeat(${itemsPerRow}, 1fr);
              gap: ${spaceBetween}px;
              }
          }
        `;

        // Append responsive styles for each breakpoint
        let responsiveStyles = '';
        for (let [width, settings] of Object.entries(breakpoints)) {
            responsiveStyles += `
            @container (min-width: ${width}px) {
              #${targetId} .ff-posts-container {
                grid-template-columns: repeat(${settings.itemsPerRow}, 1fr);
                gap: ${settings.spaceBetween}px;
              }
            }
          `;
        }

        style.innerHTML = baseStyles + responsiveStyles;
        document.head.appendChild(style);
    }

    public async renderer({
        accountId,
        numberOfPosts,
        showHeader = true,
        headerElements = ['profilePicture', 'fullName', 'username', 'verifiedBadge', 'postsCount', 'followersCount', 'followingCount', 'followButton'],
        postElements = ['likesCount', 'commentsCount', 'text'],
        postStyle = "Overlay",
        template = DEFAULT_TEMPLATE,
    } : RenderProps ): Promise<string> {
        const {data} = await this.getData({ accountId, numberOfPosts });
        const renderedHTML = mustache.render(template, {
            ...data,
            show_header: showHeader,
            post_style: postStyle.toLowerCase(),
            show_profile_picture:  headerElements.includes('profilePicture'),
            show_full_name:  headerElements.includes('fullName'),
            show_username:  headerElements.includes('username'),
            show_verified_badge:  headerElements.includes('verifiedBadge'),
            show_posts_count:  headerElements.includes('postsCount'),
            show_followers_count:  headerElements.includes('followersCount'),
            show_following_count:  headerElements.includes('followingCount'),
            show_follow_button:  headerElements.includes('followButton'),
            show_likes_count:  postElements.includes('likesCount'),
            show_comments_count:  postElements.includes('commentsCount'),
            show_text:  postElements.includes('text'),
        });

        return renderedHTML;
    }

    public async init({
        includeStyles = true,
        maxItemsPerRow = 4,
        rows = 1,
        gap= 10, 
        breakpoints = {},
        ...data
    }: {
        targetId?: string;
        accountId: string;
        maxItemsPerRow?: number;
        rows?: number;
        gap?: number;
        includeStyles?: boolean;
        breakpoints?: { [key: string]: { itemsPerRow: number, spaceBetween: number } };
    } & RenderProps): Promise<void> {

        const targetId = data.targetId || 'feedframer';

        const html = await this.renderer({...data, numberOfPosts: maxItemsPerRow * rows});

        const container = document.getElementById(targetId);

        if(!container) {
            throw new Error(`Element with id ${targetId} not found`);
        } else {
            container.innerHTML = html;
        }

        if(includeStyles) {
            this.generateDynamicCSS(targetId, maxItemsPerRow, gap, breakpoints);
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = `${this.baseUrl}/build/assets/embed.css`;
            document.head.appendChild(link);
        }
    }
    
}
