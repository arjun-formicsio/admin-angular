import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-board-user',
  templateUrl: './board-user.component.html',
  styleUrls: ['./board-user.component.css']
})
export class BoardUserComponent implements OnInit {
  content?: string;
  users = null;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getUser()
  }
  getUser() {
    this.userService.getUserAll().subscribe(
      data => {
        this.users = data;
      },
      err => {
        this.content = JSON.parse(err.error).message;
      }
    );
  }

  deleteUser(id: string) {
    this.userService.deleteUser(id).subscribe(data => {
      this.getUser()
    })
  }
}
