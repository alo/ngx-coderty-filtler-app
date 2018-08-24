import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app de alo';
  test = 'alo';
  users = [{ name: 'Álvaro', surname: 'Quirós' }, { name: 'Antonio', surname: 'Genaro' }];
  
}
