import global from "../global.js";
import { input, Renderable } from "melonjs";
import { box2d, createCircleShape, createDynamicBody, setUserData, setContactListener, pixelsPerMeter } from "../box2d.js";
import ContactListener from "../contact-listener.js";

const directions = { left: -1, right: 1 };
const playerStates = { idle: "idle", run: "run", jump: "jump" };

const jumpVelocity = -7 * pixelsPerMeter;
const walkVelocity = 3 * pixelsPerMeter;

class PlayerEntity extends Renderable {
    /**
     * constructor
     */
    constructor(x, y) {
        // call the parent constructor
        super(x, y , 16, 16);

        // match tiled origin point (0,0);
        this.anchorPoint.set(0, 0);

        // create a sprite
        this.sprite = global.texture.createAnimationFromName([
            "mario_idle.png", 
            "mario_run_0.png", "mario_run_1.png", "mario_run_2.png", 
            "mario_jump.png", "simple_level.png"
        ]);

        this.sprite.addAnimation("idle", [{ name: "mario_idle.png" }]);
        this.sprite.addAnimation("run",  [{ name: "mario_run_0.png", delay: 125 }, { name: "mario_run_1.png", delay: 125 }, { name: "mario_run_2.png", delay: 125 }]);
        this.sprite.addAnimation("jump",  [{ name: "mario_jump.png" }]);
        this.sprite.setCurrentAnimation("idle");

        // match sprite position with the parent renderable
        this.sprite.anchorPoint.set(0, 0);

        // status flags
        this.currentDir = directions.right;
        this.currentPlayerState = playerStates.idle;
        this.touchLeft = false;
        this.touchRight = false;
        this.touchBottom = false;
        
        // create the physic body
        this.playerBody = createDynamicBody(this.pos.x + this.sprite.width / 2, this.pos.y + this.sprite.height / 2);
        //this.playerBody.SetLinearDamping(1);
        this.playerBody.SetFixedRotation(true);

        // create the physic body shape based on the renderable size
        this.playerFixture = this.playerBody.CreateFixture(createCircleShape(7), 1);
        //this.playerFixture.SetFriction(3);

        // set "player" as metadata
        this.metaData = setUserData(this.playerFixture, "player");

        // setup the collision/contact listeners
        this.contactListener = new ContactListener(this.beginContact.bind(this), this.endContact.bind(this));
        setContactListener(this.contactListener.instance);
    }

    /**
     * update the entity
     */
    update(dt) {
        
        if (input.isKeyPressed("left") && !this.touchLeft) {            
            let vel = this.playerBody.GetLinearVelocity();
            vel.x = -walkVelocity;
            this.playerBody.SetLinearVelocity(vel);
            this.currentDir = directions.left;
            this.currentPlayerState = playerStates.run;
        } else if (input.isKeyPressed("right") && !this.touchRight) {
            let vel = this.playerBody.GetLinearVelocity();
            vel.x = walkVelocity;
            this.playerBody.SetLinearVelocity(vel);
            this.currentDir = directions.right;
            this.currentPlayerState = playerStates.run;
        }
        
        if (input.isKeyPressed("jump")) {
            let vel = this.playerBody.GetLinearVelocity();
            vel.y = jumpVelocity;
            this.playerBody.SetLinearVelocity(vel);
            this.currentPlayerState = playerStates.jump;
        }

        let vel = this.playerBody.GetLinearVelocity();

        if (vel.x === 0 && vel.y === 0) {
            this.currentPlayerState = playerStates.idle;
        };

        this.sprite.setCurrentAnimation(this.currentPlayerState);

        // return true if sprite change or applied vel is not 0
        return this.sprite.update(dt) || vel.x !== 0 || vel.y !== 0;
    }

   /**
     * colision handler
     * (called when colliding with other objects)
     */
    draw(renderer) {
        const {x, y} = this.playerBody.GetPosition();
        // adjust position based on the physic body
        this.pos.set(
            x - this.sprite.width / 2,
            y - this.sprite.height / 2
        );

        renderer.save();
        // translate the rendering context to the parent renderable position
        renderer.translate(this.pos.x, this.pos.y);
        // TODO: fix default anchor point in the texture atlas
        this.sprite.anchorPoint.set(0, 0);
        this.sprite.preDraw(renderer);
        this.sprite.flipX(this.currentDir === directions.left);
        this.sprite.draw(renderer);
        this.sprite.postDraw(renderer);
        renderer.restore();
    }


    /**
     * callback when the player begin to touch another object
     * @param {b2Contact} contact 
     */
    beginContact(contact) {
        const {
            b2Contact,
            getPointer,
            wrapPointer
        } = box2d;
        
        contact = wrapPointer(contact, b2Contact);
        const fixtureA = contact.GetFixtureA();
        const fixtureB = contact.GetFixtureB();
        const nameA = this.metaData[getPointer(fixtureA)].name;
        const nameB = this.metaData[getPointer(fixtureB)].name;
        console.log(`"${nameA}" <-> "${nameB}"`);

        // cancel horizontal velocity if touching a wall/pipe
        if (nameA !== "ground") {
            const vel = this.playerBody.GetLinearVelocity();
            if (vel.x < 0) {
                this.touchLeft = true;
                //vel.x = 0;
            } else if (vel.x > 0) {
                this.touchRight = true;
                //vel.x = 0;
            }
            this.playerBody.SetLinearVelocity(vel);
        }
    }

    /**
     * callback when the player end touching another object
     * @param {b2Contact} contact 
     */
    endContact = (contact) => {
        const {
            b2Contact,
            getPointer,
            wrapPointer
        } = box2d;
        contact = wrapPointer(contact, b2Contact);
        const fixtureA = contact.GetFixtureA();
        const fixtureB = contact.GetFixtureB();
        const nameA = this.metaData[getPointer(fixtureA)].name;
        const nameB = this.metaData[getPointer(fixtureB)].name;

        // reset horizontal touching flags
        if (nameA !== "ground") {
            this.touchLeft = false;
            this.touchRight = false;
        }
    }
};

export default PlayerEntity;
