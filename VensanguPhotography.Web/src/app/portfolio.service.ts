import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Images } from './Images';
import 'rxjs/add/operator/toPromise';
@Injectable()
export class PortfolioService{
    constructor(private http: Http){        
    }
    //TODO: Move this to configuration.
    private imageApiUrl: string = "https://vensanguphotographyimageapi.azurewebsites.net";
    
    public getAllImages = (type: string) : Promise<Images> => {
        console.log(type);
        console.log(this.imageApiUrl + '/' + type);
        return this.http.get(this.imageApiUrl + '/' + type)
            .toPromise()
            .then((response): Images => response.json() as Images)
            .catch(this.handleError);
    }
    
    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
      }
}