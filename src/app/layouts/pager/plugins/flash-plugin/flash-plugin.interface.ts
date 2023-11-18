import { SafeHtml } from "@angular/platform-browser";
import { Observable } from "rxjs";

export interface FlashData {
    title: string;
    banner_url: string;
    head_html: string;
    // body_html_path: string;
    body_html$: Observable<SafeHtml>;
    date: Date | null | undefined;
}