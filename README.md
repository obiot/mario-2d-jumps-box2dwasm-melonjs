# Mario 2D Jumps (melonJS/Box2Dwasm edition)
--------------------------------------
a port of the [Mario 2D @box2d/core Demo](https://github.com/obiot/mario-2d-jumps-box2dcore-melonjs) using the WebAssembly version of Box2d, that showcase integration of [melonJS](http://melonjs.org) with [box2d-wasm](https://github.com/Birch-san/box2d-wasm).

![mario-2d-demos-box2dwasm-melonjs](https://github.com/obiot/mario-2d-jumps-box2dwasm-melonjs/assets/4033090/18cd8255-172f-4340-99c6-78e430a0ac37)

Description
-------------------------------------------------------------------------------
a tiny mario 2d platformer game built with [melonJS](http://melonjs.org) and the [box2d-wasm](https://github.com/Birch-san/box2d-wasm) physics engine that showcase key features of melonJS :
* WebGL rendering
* integration with Box2D (WebAssembly version) physics engine (as part of this demo)
* Tilemap integration
* Texture packing
* Bitmap Font

>Note: this is a proof of concept, not a accurate implementation of a super mario game physic & logic

Building the demo
-------------------------------------------------------------------------------

If you wish to build the demo and expand on the current features, you will need to install :

- The [Node.js](http://nodejs.org/) JavaScript runtime and the [NPM](https://npmjs.org/) package manager

then 
- `npm run dev` to start the dev server on watch mode at `localhost:9000`
- `npm run build` to generate a minified, production-ready build, in the docs folder

> Note: building the project under the `docs` folder will trigger the workflow for the GitHub Pages deployment.

To Do List
-------------------------------------------------------------------------------
- improve player movement and jumping logic to mimic super mario "real physic"
- add enemies and collectables with proper contact/collision handling
- add parallax background and other details to the mini level

Credits
-------------------------------------------------------------------------------
- [8observer8](https://8observer8.github.io) for the original demo
- [8observer8](https://github.com/8Observer8/falling-box-contact-listener-user-data-box2dwasm-melonjs-js) for the Debug Drawer, Contact Listener and User Data demos with melonJS.
- [melonJS](http://melonjs.org) for the game engine
- [box2d-wasm](https://www.npmjs.com/package/box2d-wasm) Box2D compiled to WebAssembly
- [Tiled](https://www.mapeditor.org/) for the map editor
- [FreeTexturePacker](http://free-tex-packer.com) for the free texture packer
- [SnowB](https://snowb.org) for the BitmapFont editor
