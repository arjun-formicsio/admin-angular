import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  user = 0

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUserAll().subscribe(
      data => {
        console.log(data)
        this.user = data.length;
      }
    );
  }
}
