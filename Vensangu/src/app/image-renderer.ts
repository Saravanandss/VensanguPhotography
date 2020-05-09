import { Scene, PerspectiveCamera, WebGLRenderer, TextureLoader, PlaneGeometry, OrthographicCamera } from 'three';
import { MeshLambertMaterial, Mesh, DirectionalLight, Vector3 } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export class ImageRenderer {

    private scene = new Scene();
    private camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 500);
    private renderer = new WebGLRenderer();
    private control = new OrbitControls(this.camera, this.renderer.domElement);
    private light = new DirectionalLight();
    private container: HTMLCanvasElement;

    private categoryPosition: [] = [];
    public zoomSpeed = 0.1;
    private zoomY = false;

    constructor() {

    }

    public bootstrapScene = (mainContainer: HTMLCanvasElement) => {
        this.container = mainContainer;
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        mainContainer.appendChild(this.renderer.domElement);
        //We want to only zoom in and out. We don't want any rotation.
        this.control.enableRotate = false;

        this.control.domElement.addEventListener('wheel', this.wheelHandler);

        const addLight = () => {
            this.light.position.set(0, 0, 2);
            this.scene.add(this.light);
        }
        addLight();
        this.camera.position.set(0, 0, 2);

        window.addEventListener( 'resize', this.onWindowResize, false );

        this.control.update();
        this.animate();
    }

    private animate = () => {
        requestAnimationFrame(this.animate);
        this.control.update();
        this.renderer.render(this.scene, this.camera);
    };

    private addPlane = async (imagePath: string, position: Vector3) => {
        const planeGeometry = new PlaneGeometry(3, 2, 40, 30);
        const texture = new TextureLoader().load(imagePath);
        const material = new MeshLambertMaterial({ map: texture });
        const plane = new Mesh(planeGeometry, material);
        plane.position.set(position.x, position.y, position.z);
        this.scene.add(plane);
    }

    public renderCenterImage = (category: string, imagePath: string) => {
        if (this.categoryPosition.length === 0) {
            this.categoryPosition[category] = { startPosition: new Vector3(0, 0, 0) }
        }
        this.addPlane(imagePath, this.categoryPosition[category].startPosition);
    }

    public renderImageCluster = (category: string, imagePaths: string[]) => {
        if (!this.categoryPosition[category]) return;

        const imageCountPerRow = 4;
        const imageStartPosition: Vector3 = this.categoryPosition[category].startPosition;
        imageStartPosition.z += 5;

        let yPosition = imageStartPosition.y - 5;
        let zPosition = imageStartPosition.z;

        let xOffset = -1;
        let imageIndex = 0;
        const padding = 0.5;
        imagePaths.forEach((imagePath: string) => {
            //Image aspect ratio is assumed to be 3x2
            //Padding between images is 0.5
            //Left margin is 1.5
            const xPosition = xOffset * 3 + xOffset * padding;
            this.addPlane(imagePath, new Vector3(xPosition, yPosition, zPosition));
            if (imageIndex == imageCountPerRow - 1) {
                yPosition += 2 + padding;
                xOffset = -1;
                imageIndex = 0;
            }
            else {
                xOffset++;
                imageIndex++;
            }

            this.categoryPosition[category].endPosition = new Vector3(xPosition, yPosition, zPosition);
        });
    }

    private wheelHandler = ($event: WheelEvent) => {
        // this.zoom($event.deltaY);
        // $event.stopPropagation();
    }

    private zoom = (deltaY: number) => {
        var delta = deltaY * this.zoomSpeed;

        //Camera and light move to gether
        var zFreeze: number;

        if (this.camera.position.z % 5 === 0) {
            this.zoomY = !this.zoomY;
            zFreeze = this.light.position.z;
        }

        if (this.zoomY) {
            this.camera.position.y += -delta;
            this.light.position.y += -delta;
            if (this.camera.position.y > 2) {
                this.camera.position.y = 2;
                this.light.position.y = 2;
            }

            this.camera.position.z = zFreeze;
            this.light.position.z = zFreeze;
        }
        else {
            this.camera.position.z += delta;
            this.light.position.z += delta;
            if (this.camera.position.z < 2) {
                this.camera.position.z = 2;
                this.light.position.z = 2;
            }
        }
    }
    
    private onWindowResize = () => {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();

        this.renderer.setSize( window.innerWidth, window.innerHeight );
    }
}