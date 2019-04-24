import { Component, OnInit } from '@angular/core';
import {MessageService} from 'primeng/api';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  color = 'primary';
  mode = 'determinate';
  // value = 400;
  bufferValue = 75;

  value = 0;

  constructor( private router: Router) { }


  ngOnInit() {
    const interval = setInterval(() => {
    this.value = this.value + Math.floor(Math.random() * 10) + 1;
    if (this.value >= 100) {
        this.value = 100;

        clearInterval(interval);
    }
}, 2000);
  }

  onSelect(): void {
   this.router.navigateByUrl('https://tikit.azurewebsites.net');
  }

}
