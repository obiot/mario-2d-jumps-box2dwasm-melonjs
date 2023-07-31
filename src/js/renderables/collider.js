import { Renderable } from 'melonjs';
import { createStaticBody, createBoxShape, setUserData } from '../box2d.js';

class b2Collider extends Renderable {
    /**
     * constructor
     */
    constructor(x, y, settings) {
        const w = settings.width;
        const h = settings.height;
        
        // call the parent constructor
        super(x, y , w, h);

        // match Tiled origin point (0,0);
        this.anchorPoint.set(0, 0);

        // collider body
        this.colliderBody = createStaticBody(this.pos.x + w / 2, this.pos.y + h / 2);
        
        // collider fixture
        this.fixture = this.colliderBody.CreateFixture(createBoxShape(w, h), 0.0);
        this.fixture.SetFriction(1);
        this.fixture.SetRestitution(0);

        // set the collider name as metadata
        this.metaData = setUserData(this.fixture, settings.name);
    }

};

export default b2Collider;
