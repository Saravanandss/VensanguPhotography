import { Component, OnInit } from '@angular/core';
import { ImageService } from '../services/image.service';
import { Image } from '../models/Image';

@Component({
  selector: 'app-configure',
  templateUrl: './configure.component.html',
  styleUrls: ['./configure.component.less'],
  providers: [ImageService]
})

export class ConfigureComponent implements OnInit {

  constructor(private imageService: ImageService) {
    this.loadImageFiles();
  }

  public images: Image[];

  ngOnInit(): void {
  }

  loadImageFiles = async () => {
    await this.imageService.getImages('')
      .then(images => {
        this.images = [...images.portraits.map(im => new Image(im, Image.Orientation.portrait)),
        ...images.landscapes.map(im => new Image(im, Image.Orientation.landscape))].sort();
      })
      .catch(error => console.log(error));
  }
}
