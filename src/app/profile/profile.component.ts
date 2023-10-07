import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  constructor(private _AuthService: AuthService) { }

  userName: string =''
  ngOnInit(): void {
    this._AuthService.userToken.subscribe({
      next: (res) => {
        this.userName = res.name
        console.log(this.userName);

      }
    })
  }


}
