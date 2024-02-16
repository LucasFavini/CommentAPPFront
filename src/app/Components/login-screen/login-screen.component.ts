import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { noWhitespaceValidator } from 'src/app/common/noWhiteSpacesValidator';
import { AuthService } from 'src/app/services/auth.service';
import { CommentService } from 'src/app/services/comment-services.service';

@Component({
  selector: 'app-login-screen',
  templateUrl: './login-screen.component.html',
  styleUrls: ['./login-screen.component.scss']
})
export class LoginScreenComponent implements OnInit {

  loginForm: FormGroup = new FormGroup({});
  user:any;

  constructor(
    private commentService: CommentService,
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
    ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      userName:['', [Validators.required], [noWhitespaceValidator]],
      password:['', [Validators.required]],
    })
  }

  sendUser(){
    this.commentService.loginMethod(this.loginForm.value).subscribe(response => {
      if (response.token) {
        this.authService.storeToken(response.token);
        this.commentService.storageUserInfo({userName: response.userName, id: response.id, isAdmin: response.isAdmin});
        this.router.navigate(['commentsboard'])
      }
      else{
        alert("User or password INCORRECT")
      }
    }, (() => alert("User or password INCORRECT")));
  }

}
