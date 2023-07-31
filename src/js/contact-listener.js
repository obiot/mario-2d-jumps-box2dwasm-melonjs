import { box2d } from "./box2d.js";

export default class ContactListener {
    constructor(BeginContact = () => {}, EndContact = () => {} , PreSolve = () => {}, PostSolve = () => {}) {
        const {
            JSContactListener,
        } = box2d;
        this.instance = Object.assign(new JSContactListener(), { BeginContact, EndContact, PreSolve, PostSolve });
    }
}