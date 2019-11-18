import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Images } from '../Images';

@Injectable()
export class PortfolioService{
    constructor(private http: HttpClient){        
    }
    //TODO: Move this to configuration.
    private imageApiUrl: string = "https://vensanguphotographyimageapi.azurewebsites.net";
    
    public getAllImages = (type: string) : Promise<Images> => {
        console.log(type);
        console.log(this.imageApiUrl + '/' + type);
        return this.http.get(this.imageApiUrl + '/' + type)
            .toPromise()
            .then((response): Images => response as Images)
            .catch(this.handleError);
    }
    
    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
      }
}