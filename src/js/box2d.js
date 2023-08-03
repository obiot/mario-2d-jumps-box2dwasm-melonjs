import Box2DFactory from "box2d-wasm";
import { event } from "melonjs";


// a global variable to store the box2D world
let world = null;


export const velocityIterations = 3;
export const positionIterations = 2;
export const pixelsPerMeter = 30;

// a reference to the box2d library
export let box2d = null;

// hold all the metadata
const metaData = {};

export function initBox2D(localhost = true) {
    return new Promise(resolve => {
        Box2DFactory().then((Box2D) => {
            // assign a global reference to the box2d lib
            box2d = Box2D;

            const { b2World, b2Vec2 } = box2d;
            const gravity = new b2Vec2(0, 9.8);
            
            // create the b2World
            world = new b2World();
            world.SetGravity(gravity);
            
            // update the box2D world every frame
            event.on(event.GAME_AFTER_UPDATE, (dt) => {
                if (world.GetBodyCount() > 0) {
                    //console.log("update box2d world :" + dt / 1000 + "ms");
                    world.Step(dt / 1000, velocityIterations, positionIterations);
                }
            });
            resolve();
        });
    });
}

export function GetWorld() {
    return world;
}

// create a static body at the given position
export function createStaticBody(x, y) {
    const {
        b2BodyDef,
        b2_staticBody,
        b2Vec2
    } = box2d;

    const bodyDef = new b2BodyDef();
    bodyDef.position = new b2Vec2(x, y);
    bodyDef.type = b2_staticBody;

    const body = world.CreateBody(bodyDef);
    
    return body;
};

// create a static body at the given position
export function createDynamicBody(x, y) {
    const {
        b2BodyDef,
        b2_dynamicBody,
        b2Vec2
    } = box2d;

    const bodyDef = new b2BodyDef();
    bodyDef.position = new b2Vec2(x, y);
    bodyDef.type = b2_dynamicBody;

    const body = world.CreateBody(bodyDef);

    return body;
};

// create and return a polygon box shape of the given dimension
export function createBoxShape(w, h) {
    const {
        b2PolygonShape
    } = box2d;
    const shape = new b2PolygonShape();
    shape.SetAsBox(w / 2, h / 2);
    return shape;
};

// create and return a polygon box shape of the given dimension
export function createCircleShape(radius) {
    const {
        b2CircleShape
    } = box2d;
    const shape = new b2CircleShape();
    shape.m_radius = radius;
    return shape;
};

export function setUserData(fixture, name) {
    const {
        getPointer
    } = box2d;

    metaData[getPointer(fixture)] = {
        name: name
    };

    return metaData;
}

export function setContactListener(listener) {
    world.SetContactListener(listener);
}