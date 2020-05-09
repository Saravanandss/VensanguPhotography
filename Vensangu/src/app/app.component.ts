import { Component, OnInit } from '@angular/core';
import { ImageRenderer } from './image-renderer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})

export class AppComponent implements OnInit {
  images = [
    'assets/Images/ADH_2048@0-3x.jpg',
    'assets/Images/ADH_2053@0-3x.jpg',
    'assets/Images/ADH_2059@0-3x.jpg',
    'assets/Images/ADH_2075@0-3x.jpg',
    'assets/Images/ADH_2097@0-3x.jpg',
    'assets/Images/ADH_2143@0-3x.jpg',
    'assets/Images/ADH_2182@0-3x.jpg',
    'assets/Images/ADH_2189@0-3x.jpg',
  ];

  constructor() {

  }

  ngOnInit(): void {
    const mainContainer = <HTMLCanvasElement>document.getElementById('main-container');
    var renderer = new ImageRenderer();
    renderer.bootstrapScene(mainContainer);
    renderer.renderCenterImage("portfolio", this.images[0]);
    renderer.renderImageCluster("portfolio", this.images.slice(1, this.images.length));
  }
}
