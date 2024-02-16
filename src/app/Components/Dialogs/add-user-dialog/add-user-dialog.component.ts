import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { noWhitespaceValidator } from 'src/app/common/noWhiteSpacesValidator';
import { CommentService } from 'src/app/services/comment-services.service';

@Component({
  selector: 'app-add-user-dialog',
  templateUrl: './add-user-dialog.component.html',
  styleUrls: ['./add-user-dialog.component.scss']
})
export class AddUserDialogComponent implements OnInit {
  
  answerForm: FormGroup = new FormGroup({});

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any, 
    private dialogRef: MatDialogRef<AddUserDialogComponent>,
    private formBuilder: FormBuilder,
    private commentService: CommentService,) { 
    }

  ngOnInit(): void {
    this.answerForm = this.formBuilder.group({
      userName:['', [Validators.required], [noWhitespaceValidator]],
      password:['', [Validators.required]],
      isAdminUser:[false, [Validators.required]],
      userCreation: new Date(),
    })
  }

  createNewUser(){
    console.log(this.answerForm.value)
    this.commentService.addUser(this.data.id, this.answerForm.value).subscribe(() =>{
      alert("User added");
      this.dialogRef.close();
    },
    error=>{
      console.log(error)
    });
  }
}
