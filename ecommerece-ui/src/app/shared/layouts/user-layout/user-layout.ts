import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-user-layout',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './user-layout.html',
  styleUrls: ['./user-layout.css']
})
export class UserLayout {
  loading: boolean = false;
  
  logout(){
    localStorage.removeItem("token");
    
  }
}