import { SafeHtml } from "@angular/platform-browser";
import { Observable } from "rxjs";

export interface FlashData {
    title: string;
    image: string;
    headline: string;
    // body_html_path: string;
    // body_html$: Observable<SafeHtml>;
    body: string;
    date: Date | null | undefined;
}