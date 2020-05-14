import React from 'react';
import './App.css';
import Phaser from 'phaser'

var config = {
  type: Phaser.CANVAS,
  width: 800,
  height: 600,
  scene: {
      preload: preload,
      create: create,
      update: update
  }
};

var scoreText;
var score =0;
var fruit;
var game = new Phaser.Game(config);

function preload ()
{
  this.load.image('sky', 'assets/sky.png');
  this.load.image('ground', 'assets/platform.png');
  this.load.image('tree', 'assets/tree.png');
  this.load.image('apple', 'assets/apple.jpg');
  this.load.image('orange', 'assets/orange.png');
}

function create ()
{
  //  A simple background for our game
  this.add.image(400, 300, 'sky');
  //this.add.image(400, 400, 'tree');
  this.add.image(400, 300, 'tree');

  //  The score
  scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#000' });
}

function update (){
  if(score<10){
    fruit = this.add.sprite(400, 200, 'apple').setInteractive();
    //fruit.setActive(false).setVisible(false);
  }else if(score>=10){
    //fruit.setActive(false).setVisible(false);
    fruit = this.add.sprite(400, 200, 'orange').setInteractive();
  }
  fruit.on('pointerdown', function(pointer){
    score++;
    scoreText.setText('Score: '+score);
  });
}


function App() {
  return (
    <div className="App">
    </div>
  );
}

export default App;
