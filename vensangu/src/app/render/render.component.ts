import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-render',
  templateUrl: './render.component.html',
  styleUrls: ['./render.component.less']
})
export class RenderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Input() imagePath: string;
}