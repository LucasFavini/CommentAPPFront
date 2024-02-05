import { animate, state, style, transition, trigger } from '@angular/animations';
import { AfterContentInit, Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, catchError, switchMap } from 'rxjs';
import { CommentService } from 'src/app/services/comment-services.service';
import { CommentDialogComponent } from '../comment-dialog/comment-dialog.component';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
  animations: [
    trigger('bodyExpansion', [
      state('collapsed, void', style({ height: '0px', visibility: 'hidden', overflow: 'hidden' })),
      state('expanded', style({ height: '*', visibility: 'visible', overflow: '*' })),
      transition(
        'expanded <=> collapsed, void => collapsed, void => expanded',
        animate('1000ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
    trigger('fadeInOut', [
      state('void', style({ opacity: 0 })),
      transition('void <=> *', animate('0.3s')),
    ]),
  ],
})
export class CommentsComponent implements OnInit, AfterContentInit {

  usersAndComments = new BehaviorSubject<any[]>([]);
  userInfo:any;
  state: string = 'collapsed';

  showSpinner: boolean = true;
  panelOpenState: boolean = false;
  displaySubCommentsId: number = 0;

  get userAndComments$(): Observable<any> {
    return this.usersAndComments = this.commentService.userAndComments;
  }

  get filteredComments$(): Observable<any> {
    console.log(this.commentService.filteredComments);
    return this.usersAndComments = this.commentService.filteredComments;
  }

  constructor(private commentService: CommentService, private router: Router, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.userInfo = this.commentService.getUserInfo();
    this.commentService.getUsersAndComments().subscribe(comments =>{ 
        this.usersAndComments.next(comments.reverse())
        this.showSpinner = false;
      }, err => { if (err.status === 401) {
        sessionStorage.clear();
        this.router.navigate(['login']);
    }});
  }

  ngAfterContentInit(): void {
    this.state = 'expanded';
  }

  collapse(commentId: number){
    if(this.displaySubCommentsId === commentId){
      return this.displaySubCommentsId = 0;
    }
    else{
      return this.displaySubCommentsId = commentId;
    }
  }

  deleteComment(commentId: number){
    this.commentService.deleteComment(this.userInfo.id, commentId)
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
  }

  deleteSubComment(commentId: number){
    this.commentService.deleteSubComment(commentId, this.userInfo.userName)
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
  }

  //Ver
openDialog(commentId: number) {
    const userInfo = this.commentService.getUserInfo();
    const dialogReF =  this.dialog.open(CommentDialogComponent, {
      width: '1000px',
      data:  {commentId: commentId, userName: userInfo.userName}
    });
  dialogReF.afterClosed().subscribe(result => {
    if (result) {
      this.displaySubCommentsId = commentId;
      this.commentService.addSubComment(result)
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
      }
    })
  } 
}