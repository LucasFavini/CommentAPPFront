import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser'
import { RouterModule, Routes } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from './guards/auth.guard';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { LoginGuard } from './guards/login.guard';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './Material/material-module';
//Components
import { AppComponent } from './app.component';
import { CommentsBoardComponent } from './Components/comments-board/comments-board.component';
import { LoginScreenComponent } from './Components/login-screen/login-screen.component';
import { CommentsComponent } from './Components/comments/comments.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { CommentDialogComponent } from './Components/comment-dialog/comment-dialog.component';

const routes: Routes = [
  { path : 'login', component: LoginScreenComponent, canActivate: [LoginGuard]},
  { path : 'commentsboard', component: NavbarComponent, canActivate: [AuthGuard]},
  { path : '**', redirectTo: 'commentsboard'}
]

@NgModule({
  declarations: [
    AppComponent,
    CommentsBoardComponent,
    LoginScreenComponent,
    CommentsComponent,
    NavbarComponent,
    CommentDialogComponent,
  ],
  imports: [
    RouterModule.forRoot(routes),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
