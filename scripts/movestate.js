const UP = Symbol("up");
const DOWN = Symbol ("down");
const IMMOBILE = Symbol("immobile");

export default class MoveState{
    static get UP(){ return UP; }
    static get DOWN(){ return DOWN; }
    static get IMMOBILE(){ return IMMOBILE; }
}