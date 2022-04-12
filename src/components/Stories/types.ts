export interface StoryMedia {
    type?: 'image' | 'video'; // default 'image',
    url: string;
}

export interface Story {
    title?: string; // заголовок
    description?: string; // основной текст
    url?: string; // ссылка "Подробнее"
    // медиаконтент
    media?: StoryMedia;
}
