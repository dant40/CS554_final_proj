import React from 'react';
import './App.css';
import Phaser from 'phaser'

var config = {
  type: Phaser.CANVAS,
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
        gravity: { y: 300 },
        debug: false
    }
},
  scene: {
      preload: preload,
      create: create,
      update: update
  }
};

var scoreText;
var score =0;
var cursors;
var game = new Phaser.Game(config);

function preload ()
{
  this.load.image('sky', 'assets/sky.png');
  this.load.image('ground', 'assets/platform.png');
  this.load.image('tree', 'assets/tree.png');
  this.load.image('apple', 'assets/apple.jpg');
}

function create ()
{
  //  A simple background for our game
  this.add.image(400, 300, 'sky');
  //this.add.image(400, 400, 'tree');
  this.add.image(400, 300, 'tree');
  var sprite = this.add.sprite(400, 200, 'apple').setInteractive();

  //  The score
  scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#000' });
  sprite.on('pointerdown', function(pointer){
    score++;
    scoreText.setText('Score: '+score);
  });
}

function update (){

}


function App() {
  return (
    <div className="App">
    </div>
  );
}

export default App;
