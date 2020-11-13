export class Image {
    constructor(path: string, orientation: number) {
        this.path = path;
        this.orientation = orientation;
        // For 3:2 image, if height of landscape is 2, height of portrait: 1.5 * 3 = 4.5
        this.height = orientation === Image.Orientation.landscape ? 2 : 4.5;
    }
    public path: string;
    public orientation: number;
    public height: number;

    public static Orientation = { "landscape": 0, "portrait": 1 };
}

export class Images{
    constructor(portraits: string[], landscapes: string[]){
        this.portraits = portraits;
        this.landscapes = portraits;
    }
    public portraits: string[];
    public landscapes: string[];
}