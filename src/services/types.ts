export type UserType = {
    id: number,
    username: string,
    email: string,
    firstName: string,
    lastName: string,
    gender: string,
    image: string,
    accessToken: string,
    refreshToken: string,
};

export type ArticleType = {
    id: number,
    title: string,
    body: string,
    tags: string[],
    reactions: {
        likes: number,
        dislikes: number
    },
    views: number,
    userId: number
}

export type ArticlesFetchType = {
    posts: ArticleType[],
    total: number,
    skip: number,
    limit: number
}