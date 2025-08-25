export type Anime = {
    title: string
    genres: string[]
    images: {
        jpg: {
            image_url: string
            large_image_url: string
        }
    }
    rating: number
    score: number
    trailer: {
        embed_url: string
    }
    imageURL: string
    synopsis: string
    mal_id: string
};

