import {Component, Input, OnInit} from '@angular/core';
import {PreviewService} from "../../shared/dataservices/preview.service";
import {PreviewData} from "../data/linkpreview";

@Component({
    selector: 'app-link-preview',
    templateUrl: './link-preview.component.html',
    styleUrls: ['./link-preview.component.css']
})
export class LinkPreviewComponent implements OnInit {

    @Input() url!: string;
    previewData!: PreviewData;

    constructor(private linkPreviewService: PreviewService) {
    }

    ngOnInit(): void {
        this.previewData = new PreviewData();
        this.onPreview();
    }

    onPreview() {
        this.linkPreviewService.getLinkPreview(this.url).subscribe(
            {
                next: (data: PreviewData) => {
                    this.previewData = data;

                    if (!this.previewData.title) {
                        this.previewData.title = this.url;
                    }
                },
                error: (err: any) => {
                    this.previewData.url = this.url;
                    this.previewData.title = this.url;
                }
            });
    }
}
