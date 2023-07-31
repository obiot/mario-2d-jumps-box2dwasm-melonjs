import { Stage, game, level, event, BitmapText } from "melonjs";
import DebugDrawer from "../debug-drawer";
import { GetWorld } from "../box2d";


class PlayScreen extends Stage {
    /**
     *  action to perform on state change
     */
    onResetEvent() {
        // load a level
        level.load("simple-level");

        if (process.env.NODE_ENV === 'development') {
            // check the checkbox to show/hide colliders
            this.colliderCheckBox = document.getElementById("colliderCheckBox");
            this.showColliders = false;
            if (this.colliderCheckBox !== null) {
                this.showColliders = this.colliderCheckBox.checked;
                this.colliderCheckBox.onchange = () => {
                    this.showColliders = this.colliderCheckBox.checked;
                    // force repaint
                    game.repaint();
                };
            }
            // instantiate a debugDrawer
            this.debugDrawer = new DebugDrawer(game.renderer);
            GetWorld().SetDebugDraw(this.debugDrawer.instance);
            event.on(event.GAME_AFTER_DRAW, () => {
                if (this.showColliders === true) {
                    GetWorld().DebugDraw();
                }
            });
        }

        // create a font
        this.title = new BitmapText(160, 32, {
            font : "SuperPlumberBrothers",
            size : 1.0,
            textAlign : "center",
            textBaseline : "top",
            text: ["Mario 2D Demo", "Box2Dwasm & melonJS edition", "visit us at melonjs.org"],
            fillStyle: "#D3D3D3" // #954B0C"
        });

        game.world.addChild(this.title);
    }

    onDestroyEvent() {

    }
};

export default PlayScreen;
