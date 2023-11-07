import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {PreviewData} from "../../data/linkpreview";
import {PreviewService} from "../../../shared/dataservices/preview.service";

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit{
  header: any;
  title: any;
  preview: PreviewData = new PreviewData();
  link: string = '';
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private dialogRef: MatDialogRef<ModalComponent>,
              private linkPreviewService: PreviewService) {
    this.link = data.link;
  }

  ngOnInit() {
      this.linkPreviewService.getLinkPreview(this.link).subscribe(
          {
                next: (data: PreviewData) => {
                    this.preview = data;
                    console.log(data);
                },
                error: (err: any) => {
                  this.preview.url = this.link;
                  this.preview.title = this.link;
                  this.preview.description = this.link;
                }
  });
  }

  closeLinkPreview() {
    this.link = '';
    this.dialogRef.close();
  }
}
