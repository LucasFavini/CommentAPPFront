import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, filter, map } from 'rxjs';
import { CommentService } from 'src/app/services/comment-services.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  badgevisible: boolean = false;
  filterControl: FormControl = new FormControl('');
  filteredList: any = new BehaviorSubject<any>(null);
  filterInput: boolean = false;
  filterSearch: boolean = true;
  searchValue: string = '';
  userName: string= '';

  constructor(private router: Router, private commentService: CommentService){ }

  ngOnInit(): void {
    const userInfo = JSON.parse(sessionStorage.getItem('userInfo') || '');
    this.userName = userInfo?.userName;
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

  private filterList(){
    this.filterControl.valueChanges.subscribe(filter => {
      const filterValue = filter.toLowerCase();
      this.commentService.userAndComments.subscribe(userAndcomments => {
        this.commentService.filteredComments.next(userAndcomments.filter((u:any) => u.commentValue.toLowerCase().includes(filterValue)));
      })
    }) 
  }

}
