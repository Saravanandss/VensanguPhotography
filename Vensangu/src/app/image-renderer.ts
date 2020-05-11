import { Scene, PerspectiveCamera, WebGLRenderer, TextureLoader, PlaneGeometry, Plane } from 'three';
import { MeshLambertMaterial, Mesh, DirectionalLight, Vector3 } from 'three';

export class ImageRenderer {
    private scene = new Scene();
    private camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 5);
    private renderer = new WebGLRenderer();
    private light = new DirectionalLight();
    private nextyPosition = 0;
    private centerPlane: Mesh;
    private planeClusters: Mesh[] = [];
    private container: HTMLCanvasElement;
    public scrollSpeed = 0.01;

    constructor(mainContainer: HTMLCanvasElement) {
        this.container = mainContainer;
        this.bootstrapScene();
    }

    public renderImages = async (category: string, images: string[]) => {
        await this.renderCenterImage(category, images[0]);
        await this.renderImageCluster(category, images.slice(1, images.length), 3);

        this.hidePlaneClusters();
    }

    private bootstrapScene = async () => {
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.container.appendChild(this.renderer.domElement);
        this.container.addEventListener('wheel', this.wheelHandler);
        const addLight = () => {
            this.light.position.set(0, 0, 2);
            this.scene.add(this.light);
        }
        addLight();
        this.camera.position.set(0, 0, 1.3);

        window.addEventListener('resize', this.onWindowResize, false);
        this.animate();
    }

    private animate = () => {
        requestAnimationFrame(this.animate);
        this.renderer.render(this.scene, this.camera);
    };

    private addPlane = async (imagePath: string, xPosition: number, yPosition: number, geometry: PlaneGeometry): Promise<Mesh> => {
        const planeGeometry = geometry;
        const texture = new TextureLoader().load(imagePath);
        const material = new MeshLambertMaterial({ map: texture });
        const plane = new Mesh(planeGeometry, material);
        plane.position.set(xPosition, yPosition, 0);
        this.scene.add(plane);

        return plane;
    }

    private renderCenterImage = async (category: string, imagePath: string) => {
        this.centerPlane = await this.addPlane(imagePath, 0, this.nextyPosition, new PlaneGeometry(3, 2, 1, 1));
        this.nextyPosition -= 1.01;
    }

    private renderImageCluster = async (category: string, imagePaths: string[], imagesPerRow: number) => {
        const imageWidth = (3 / imagesPerRow) - 0.01;
        const imageHeight = 2 / imagesPerRow;
        var nextxPosition = -imageWidth - 0.01;
        this.nextyPosition -= imageHeight / 2;
        var rowImageCount = 0;
        imagePaths.forEach(path => {
            this.addPlane(path, nextxPosition, this.nextyPosition, new PlaneGeometry(imageWidth, imageHeight, 1, 1))
                .then(plane => this.planeClusters.push(plane));

            nextxPosition += imageWidth + 0.01;
            rowImageCount++;
            if (rowImageCount === imagesPerRow) {
                rowImageCount = 0;
                nextxPosition = -imageWidth - 0.01;
                this.nextyPosition -= imageHeight + 0.01;
            }
        });
    }

    private showPlaneClusters = () => {
        if (!this.planeClusters) return;
        this.planeClusters.forEach((plane: Mesh) => plane.visible = true);
    }

    private hidePlaneClusters = () => {
        if (!this.planeClusters) return;
        this.planeClusters.forEach((plane: Mesh) => plane.visible = false);
    }

    private wheelHandler = ($event: WheelEvent) => {
        this.scroll($event.deltaY);
        $event.stopPropagation();
    }

    private scroll = (deltaY: number) => {
        this.camera.position.y -= deltaY * this.scrollSpeed;
        this.centerPlane.position.z -= deltaY * this.scrollSpeed;

        if (this.centerPlane.position.z >= 0) {
            this.centerPlane.position.z = 0;
        } else if(this.centerPlane.position.z <= -0.3)
        {
            this.centerPlane.position.z = -0.3;
        }
        if (this.camera.position.y >= 0) {
            this.camera.position.y = 0;
            this.hidePlaneClusters();
        }
        this.centerPlane.position.y = this.camera.position.y;
        this.showPlaneClusters();
    }

    private onWindowResize = () => {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();

        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }
}