import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-comment-dialog',
  templateUrl: './comment-dialog.component.html',
  styleUrls: ['./comment-dialog.component.scss']
})
export class CommentDialogComponent implements OnInit {
  answerForm: FormGroup = new FormGroup({});
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<CommentDialogComponent>,   
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.answerForm = this.formBuilder.group({
      userName: this.data.userName,
      commentId: this.data.commentId,
      commentValue:['', Validators.required],
      commentDateTime: new Date()
    })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
