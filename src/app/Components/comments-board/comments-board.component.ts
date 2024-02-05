import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, switchMap } from 'rxjs';
import { CommentService } from 'src/app/services/comment-services.service';


@Component({
  selector: 'app-comments-board',
  templateUrl: './comments-board.component.html',
  styleUrls: ['./comments-board.component.scss']
})
export class CommentsBoardComponent implements OnInit {

  commentForm: FormGroup = new FormGroup({});
  private userInfo = this.commentService.getUserInfo() || '';

  constructor(
    private commentService: CommentService,
    private formBuilder: FormBuilder,
    private router: Router, 
    ) { }
  
  ngOnInit(): void {
    this.commentForm = this.formBuilder.group({
      userId: this.userInfo.id,
      commentValue:['', Validators.required],
      commentDateTime: new Date()
    })
  }

  public sendComment(){
    this.commentService.addComment(this.commentForm.value)
    .pipe(
      switchMap(() => this.commentService.getUsersAndComments()))
      .subscribe(x => {
        this.commentService.userAndComments.next(x.reverse());
      });
      catchError(error => {
        if (error.status === 401) {
          sessionStorage.clear();
          this.router.navigate(['login']);
        }
        throw error;
      });
      this.clearForm();
  }

  private clearForm(): void{
    this.commentForm.reset();
    this.commentForm.controls['userId'].patchValue(this.userInfo.id);
    this.commentForm.controls['commentDateTime'].patchValue(new Date());
  }
}
