import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mc-signup-form',
  templateUrl: './mc-signup-form.component.html',
  styleUrls: ['./mc-signup-form.component.css']
})
export class MCSignupFormComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    console.log("call")
  }


  modal = document.querySelector('.modal');
  openModal = document.querySelector('.open-signup-btn');
  closeModal = document.querySelector('.close-signup-btn');

}
