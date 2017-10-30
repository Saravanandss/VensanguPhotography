import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import { Images } from './Images';
import 'rxjs/add/operator/toPromise';
@Injectable()
export class PortfolioService{
    constructor(private http: Http){}
    public imageApiUrl: string = "http://localhost:55767/api/images";

    public getPortfolioImages = ():Promise<Images> => {
         //return Promise.resolve(new Images(PORTRAITIMAGES, LANDSCAPEIMAGES));    
         return this.http.get(this.imageApiUrl + '/portfolio')
            .toPromise() 
            .then(response => response.json().data as Images)
            .catch(this.handleError);
    }
    public getPortraitImages() { }
    public getPartyImages() { }
    public getFamilyImages() { }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
      }
}

const PORTRAITIMAGES: string[] = [
    //"./assets/5.jpg",
    "./assets/6.jpg",
    "./assets/8.jpg",
    "./assets/9.jpg",
    "./assets/11.jpg",
    "./assets/13.jpg",
    "./assets/14.jpg",
    "./assets/27.jpg",
    "./assets/28.jpg",
    "./assets/29.jpg",
    "./assets/30.jpg",
    "./assets/31.jpg",
    "./assets/32.jpg",
    "./assets/33.jpg",
    "./assets/34.jpg",
    "./assets/35.jpg",
]

const LANDSCAPEIMAGES: string[] = [
    // "./assets/1.jpg",
    // "./assets/2.jpg",
    // "./assets/3.jpg",
    // "./assets/4.jpg",
    "./assets/7.jpg",
    "./assets/10.jpg",
    "./assets/12.jpg",
    "./assets/15.jpg",
    "./assets/16.jpg",
    "./assets/17.jpg",
    "./assets/18.jpg",
    "./assets/19.jpg",
    "./assets/20.jpg",
    "./assets/21.jpg",
    "./assets/22.jpg",
    "./assets/23.jpg",
    "./assets/24.jpg",
    "./assets/25.jpg",
	"./assets/26.jpg"
]