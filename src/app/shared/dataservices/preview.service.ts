import {Injectable} from '@angular/core';
import {PreviewData} from "../../core/data/linkpreview";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class PreviewService {

    previewData!: PreviewData;

    constructor(private httpClient: HttpClient) {
    }

    getLinkPreview(url: string): Observable<any> {
        const api = 'https://api.linkpreview.net/?key=ee6d32b0cdadb5ff40321300ef7c391c&q=' + url;
        return this.httpClient.get(api);
    }
}
