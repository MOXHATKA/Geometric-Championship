import Phaser from 'phaser';
import { WebSocketPlagin } from './plagins/websocket';
import Boot from './scenes/Boot';
import Game from './scenes/Game';
import UIScene from './scenes/UIScene';

var config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: 800,//window.innerWidth,
    height: 600,//window.innerHeight,
    backgroundColor: '#000000',
    parent: 'phaser-example',
    scene: [Boot, Game, UIScene], // [Boot, Preloader, MainMenu, MainGame, UIScene],
    // plugins: {
    //     global: [
    //         { key: 'WebSocketPlagin', plugin: WebSocketPlagin, start:true }
    //     ]
    // },
    physics: {
        default: 'matter',
        matter: { debug: true },
    },
    scale: {
        mode: Phaser.Scale.RESIZE,
        parent: 'phaser-example',
        width: '100%',
        height: '100%'
    },
    pixelArt: true
}

export default config;