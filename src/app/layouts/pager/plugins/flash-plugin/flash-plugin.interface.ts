


export interface FlashData {
    title: string;
    pictures?: Array<{
        id: string;
        uri: Promise<string>;
        caption: string;
    }>;
    headline: string;
    body: string;
    date: Date | null | undefined;
    id: string;
}