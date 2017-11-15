import { Component, HostListener, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';

import { PortfolioService } from './portfolio.service';
import { Size } from './size';
import { Images } from './Images';
@Component({
    templateUrl: 'portfolio.components.html',
    styleUrls:['portfolio.component.css'],
    providers: [PortfolioService]
})

export class PortfolioComponent implements OnInit {
    constructor(private route: ActivatedRoute, private portfolioService: PortfolioService){
        this.loadImageFiles();
    }

    public portraitImageFiles: string[];
    public landscapeImageFiles: string[];

    public portraitSize: Size;
    public rowLandscapeSize: Size;
    public colLandscapeSize: Size;
    private allowedSize: Size;

    portraitIndex: number;
     landscapeIndex: number;

    ngOnInit(): void {
        this.calculateSizes();
        this.initializeIndices()
    }
    
    @HostListener('window:resize', ['$event'])
    onResize(event){
        this.calculateSizes();
        this.initializeIndices()
    }

    private initializeIndices = () => {
        this.portraitIndex = 0;
        this.landscapeIndex = 0;
    }

    private calculateSizes = () => {
        this.allowedSize = new Size(innerWidth * 0.95, innerHeight)// 95% of available width;
        
        // Assuming 3:4 aspect ratio for the image.
        let rowPortraitWidth = this.allowedSize.width / 3;
        this.portraitSize = new Size(rowPortraitWidth, rowPortraitWidth / 3*4);
        
        let rowLandscapeWidth = this.allowedSize.width / 2;
        this.rowLandscapeSize = new Size(rowLandscapeWidth, rowLandscapeWidth / 4*3);

        let colLandscapeWidth = this.allowedSize.width / 3;
        this.colLandscapeSize = new Size(colLandscapeWidth, colLandscapeWidth / 4*3);
    }

    public getPortraitBackground = () => {        
        return {            
            'background-image' : 'url(' + this.portraitImageFiles[this.portraitIndex++] + ')'
        };
    }

    public getLandscapeBackground = () => {
        return {
            'background-image' : 'url(' + this.landscapeImageFiles[this.landscapeIndex++] + ')'
        };
    }

    //Following conditions were used in *ngIf in the template in the div.block. But kept giving error saying the expression has changed after being checked.
    //Halting the idea till we figure out a solution.
    public canRenderPortraitRow = ():boolean => {
        return this.portraitImageFiles.length > (this.portraitIndex + 3);
    }

    public canRenderColumns = (): boolean => {
        return this.portraitImageFiles.length > (this.portraitIndex + 3) && 
            this.landscapeImageFiles.length > (this.landscapeIndex + 6);
    }

    public canRenderLandscapeRow = (): boolean => {
        return this.landscapeImageFiles.length > (this.landscapeIndex + 2);
    }

    private  loadImageFiles = async () => {
        await this.portfolioService.getAllImages(this.route.data['value'].type)
            .then(images => {
                console.log('images', images);
                this.portraitImageFiles = images.portraits;
                this.landscapeImageFiles = images.landscapes;
            })
            .catch(error => console.log(error));

        //await this.loadFromConstants(this.route.data['value'].type);
    }

    private loadFromConstants = (type:string) : void => {
        switch (type) {
            case 'portfolio':
                this.portraitImageFiles = PORTRAIT_PORTFOLIO;
                this.landscapeImageFiles = LANDSCAPE_PORTFOLIO;
                break;
            case 'portrait':
                this.portraitImageFiles = PORTRAIT_PORTRAIT;
                this.landscapeImageFiles = LANDSCAPE_PORTRAIT;
                break;
            case 'family':
                this.portraitImageFiles = PORTRAIT_FAMILY;
                this.landscapeImageFiles = LANDSCAPE_FAMILY;
                break;
            case 'party':
                this.portraitImageFiles = PORTRAIT_PARTY;
                this.landscapeImageFiles = LANDSCAPE_PARTY;
                break;            
        }
    }
}

const PORTRAIT_PORTFOLIO: string[] = [
    "assets/Portfolio/portrait/5.jpg",
    "assets/Portfolio/portrait/6.jpg",
    "assets/Portfolio/portrait/8.jpg",
    "assets/Portfolio/portrait/9.jpg",
    "assets/Portfolio/portrait/11.jpg",
    "assets/Portfolio/portrait/13.jpg",
    "assets/Portfolio/portrait/14.jpg",
    "assets/Portfolio/portrait/27.jpg",
    "assets/Portfolio/portrait/28.jpg",
    "assets/Portfolio/portrait/29.jpg",
    "assets/Portfolio/portrait/30.jpg",
    "assets/Portfolio/portrait/31.jpg",
    "assets/Portfolio/portrait/32.jpg",
    "assets/Portfolio/portrait/33.jpg",
    "assets/Portfolio/portrait/34.jpg",
    "assets/Portfolio/portrait/35.jpg",
]

const LANDSCAPE_PORTFOLIO: string[] = [
    "assets/Portfolio/landscape/7.jpg",
    "assets/Portfolio/landscape/10.jpg",
    "assets/Portfolio/landscape/12.jpg",
    "assets/Portfolio/landscape/15.jpg",
    "assets/Portfolio/landscape/16.jpg",
    "assets/Portfolio/landscape/17.jpg",
    "assets/Portfolio/landscape/18.jpg",
    "assets/Portfolio/landscape/19.jpg",
    "assets/Portfolio/landscape/20.jpg",
    "assets/Portfolio/landscape/21.jpg",
    "assets/Portfolio/landscape/22.jpg",
    "assets/Portfolio/landscape/23.jpg",
    "assets/Portfolio/landscape/24.jpg",
    "assets/Portfolio/landscape/25.jpg",
	//"assets/Portfolio/landscape/26.jpg"
]

const PORTRAIT_PORTRAIT: string[] = [
    "assets/Portrait/portrait/5.jpg",
    "assets/Portrait/portrait/6.jpg",
    "assets/Portrait/portrait/8.jpg",
    "assets/Portrait/portrait/9.jpg",
    "assets/Portrait/portrait/11.jpg",
    "assets/Portrait/portrait/13.jpg",
    "assets/Portrait/portrait/14.jpg",
    "assets/Portrait/portrait/28.jpg",
    "assets/Portrait/portrait/30.jpg",
    "assets/Portrait/portrait/31.jpg",
    "assets/Portrait/portrait/33.jpg",
    "assets/Portrait/portrait/35.jpg",
]

const LANDSCAPE_PORTRAIT: string[] = [
    "assets/Portrait/landscape/1.jpg",
    "assets/Portrait/landscape/16.jpg",
    "assets/Portrait/landscape/18.jpg",
    "assets/Portrait/landscape/20.jpg",
]

const PORTRAIT_PARTY: string[] = [
    "assets/Party/portrait/6.jpg",
    "assets/Party/portrait/27.jpg",
    "assets/Party/portrait/28.jpg",
    "assets/Party/portrait/29.jpg",
    "assets/Party/portrait/30.jpg",
    "assets/Party/portrait/31.jpg",
    "assets/Party/portrait/32.jpg",
    "assets/Party/portrait/35.jpg",
]

const LANDSCAPE_PARTY: string[] = [
    "assets/Party/landscape/1.jpg",
    "assets/Party/landscape/7.jpg",
    "assets/Party/landscape/20.jpg",
]

const PORTRAIT_FAMILY: string[] = [
    "assets/Family/portrait/8.jpg",
    "assets/Family/portrait/9.jpg",
    "assets/Family/portrait/11.jpg",
    "assets/Family/portrait/14.jpg",
    "assets/Family/portrait/27.jpg",
    "assets/Family/portrait/29.jpg",
    "assets/Family/portrait/30.jpg",
    "assets/Family/portrait/31.jpg",
    "assets/Family/portrait/32.jpg",
    "assets/Family/portrait/33.jpg",
    "assets/Family/portrait/34.jpg",
    "assets/Family/portrait/35.jpg",
]

const LANDSCAPE_FAMILY: string[] = [
    "assets/Family/landscape/1.jpg",
    "assets/Family/landscape/16.jpg",
    "assets/Family/landscape/18.jpg",
]
                    

// const PORTRAITIMAGES: string[] = [
//     //"assets/5.jpg",
//     "assets/6.jpg",
//     "assets/8.jpg",
//     "assets/9.jpg",
//     "assets/11.jpg",
//     "assets/13.jpg",
//     "assets/14.jpg",
//     "assets/27.jpg",
//     "assets/28.jpg",
//     "assets/29.jpg",
//     "assets/30.jpg",
//     "assets/31.jpg",
//     "assets/32.jpg",
//     "assets/33.jpg",
//     "assets/34.jpg",
//     "assets/35.jpg",
// ]

// const LANDSCAPEIMAGES: string[] = [
//     // "assets/1.jpg",
//     // "assets/2.jpg",
//     // "assets/3.jpg",
//     // "assets/4.jpg",
//     "assets/7.jpg",
//     "assets/10.jpg",
//     "assets/12.jpg",
//     "assets/15.jpg",
//     "assets/16.jpg",
//     "assets/17.jpg",
//     "assets/18.jpg",
//     "assets/19.jpg",
//     "assets/20.jpg",
//     "assets/21.jpg",
//     "assets/22.jpg",
//     "assets/23.jpg",
//     "assets/24.jpg",
//     "assets/25.jpg",
// 	"assets/26.jpg"
// ]