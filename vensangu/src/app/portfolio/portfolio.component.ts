import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ImageService } from '../services/image.service';
import { Image } from '../models/Image';

@Component({
    templateUrl: './portfolio.component.html',
    styleUrls: ['./portfolio.component.less'],
    providers: [ImageService]
})

export class PortfolioComponent implements OnInit {
    constructor(private route: ActivatedRoute, private imageService: ImageService) {
        this.decideNumberOfColumns();
        this.loadImageFiles();
    }

    public allImages: Image[];
    public imageChunks: Image[][];
    public columns: number;
    public totalHeight: number;

    ngOnInit(): void {
    }

    @HostListener('window:resize', ['$event'])
    onResize() {
        this.decideNumberOfColumns();
        this.breakImagesToColumns()
    }

    decideNumberOfColumns = () => {
        //Change number of columns based on the screen width
        if (window.innerWidth < 768)
            this.columns = 1;
        else if (window.innerWidth < 992)
            this.columns = 2;
        else if (window.innerWidth < 1200)
            this.columns = 3;
        else
            this.columns = 4;
    }

    loadImageFiles = async () => {
        await this.imageService.getImages(this.route.data['value'].type)
            .then(images => {
                this.allImages = [...images.portraits.map(im => new Image(im, Image.Orientation.portrait)),
                ...images.landscapes.map(im => new Image(im, Image.Orientation.landscape))].sort();

                //Take the weighted total
                this.totalHeight = images.landscapes.length * 2 + images.portraits.length * 4.5;
                this.breakImagesToColumns();
            })
            .catch(error => console.log(error));
    }

    breakImagesToColumns = () => {
        const averageHeight = Math.ceil(this.totalHeight / this.columns);
        let columnHeight = 0;
        let index = 0;
        this.imageChunks = [];

        for (let imageIndex = 0; imageIndex < this.allImages.length; imageIndex++) {
            let image = this.allImages[imageIndex];
            if (columnHeight + image.height > averageHeight &&
                image.orientation == Image.Orientation.portrait) {
                this.swapWithNextLandscape(imageIndex);
                image = this.allImages[imageIndex];
            }

            if (columnHeight + image.height > averageHeight) {
                index++;
                columnHeight = image.height;
            }
            else
                columnHeight += image.height;

            if (this.imageChunks.length <= index)
                this.imageChunks.push([]);

            this.imageChunks[index].push(image);
        }
    }

    swapWithNextLandscape = (imageIndex: number) => {
        let tempImage = this.allImages[imageIndex];
        let landscapeIndex = this.allImages.slice(imageIndex, this.allImages.length - 1)
            .findIndex(im => im.orientation === Image.Orientation.landscape);
        if (landscapeIndex >= 0) {
            landscapeIndex += imageIndex; //compensating the slice we did before.
            this.allImages[imageIndex] = this.allImages[landscapeIndex];
            this.allImages[landscapeIndex] = tempImage;
        }
    }
}