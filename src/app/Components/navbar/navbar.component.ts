import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { CommentService } from 'src/app/services/comment-services.service';
import { AddUserDialogComponent } from '../Dialogs/add-user-dialog/add-user-dialog.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  filterControl: FormControl = new FormControl('');
  filteredList: any = new BehaviorSubject<any>(null);

  badgevisible: boolean = false;
  isUserAdmin: boolean = false;
  filterInput: boolean = false;
  filterSearch: boolean = true;

  userInfo: any;
  searchValue: string = '';
  userName: string= '';

  constructor(private router: Router, private commentService: CommentService, private dialog: MatDialog){ }

  ngOnInit(): void {
    this.userInfo = JSON.parse(sessionStorage.getItem('userInfo') || '');
    this.userName = this.userInfo?.userName;
    this.isUserAdmin = this.userInfo.isAdmin;
    this.filterList();
  }

  public logOut(){
    sessionStorage.clear();
    this.router.navigate(['login'])
  }

  displayFilter(){
    this.filterInput = !this.filterInput;
    this.filterSearch = !this.filterSearch;
    this.searchValue = '';
  }

  badgevisibility() {
    this.badgevisible = true;
  }

  openAddUserDialog(){
    if (this.isUserAdmin) {
    this.dialog.open(AddUserDialogComponent,{
        width: '400px',
        height: '300px',
        data: {id: this.userInfo.id}
      })
    }else{
      alert('User is not Admin')
    }
    // const dialogRef = this.dialog.open()
  }

  private filterList(){
    this.filterControl.valueChanges.subscribe(filter => {
      const filterValue = filter.toLowerCase();
      this.commentService.userAndComments.subscribe(userAndcomments => {
        this.commentService.filteredComments.next(userAndcomments.filter((u:any) => u.commentValue.toLowerCase().includes(filterValue)));
      })
    }) 
  }

}
