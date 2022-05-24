import Phaser from 'phaser';
import Boot from './scenes/Boot';
import MainGame from './scenes/MainGame';
import MainMenu from './scenes/MainMenu';
import Preloader from './scenes/Preloader';
import UIScene from './scenes/UIScene';

export default {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    backgroundColor: '#000000',
    parent: 'phaser-example',
    scene: [Boot, Preloader, MainMenu, MainGame, UIScene],
    physics: {
        default: 'arcade',
        arcade: { debug: false },
    },
    pixelArt: true
}