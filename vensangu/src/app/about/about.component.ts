import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.less']
})
export class AboutComponent implements OnInit {

  constructor() { }
  public mailId = "mailto:saravanandss@gmail.com?Subject=Appointment Inquiry";
  public phone = "tel:1-860-920-2363";

  ngOnInit() {
  }

}