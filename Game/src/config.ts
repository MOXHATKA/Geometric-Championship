import Phaser from 'phaser';
import { WebSocketPlagin } from './plagins/websocket';
import Boot from './scenes/Boot';
import MainGame from './scenes/MainGame';
import MainMenu from './scenes/MainMenu';
import Preloader from './scenes/Preloader';
import UIScene from './scenes/UIScene';

var config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    backgroundColor: '#000000',
    parent: 'phaser-example',
    scene: [Boot, Preloader, MainMenu, MainGame, UIScene],
    plugins: {
        global: [
            { key: 'WebSocketPlagin', plugin: WebSocketPlagin, start:true }
        ]
    },
    physics: {
        default: 'arcade',
        arcade: { debug: false },
    },
    pixelArt: true
}

export default config;