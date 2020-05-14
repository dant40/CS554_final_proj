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

var fruit;
var storeText;
var save;
var storeBox;
var appleText, orangeText, peachText, moneyText, saveText, storeText;
var score = 0;//temp
var appleNum = 0
var orangeNum=0
var peachNum=0
var moneyNum = 0;
var game = new Phaser.Game(config);

function preload ()
{
  this.load.image('sky', 'assets/sky.png');
  this.load.image('ground', 'assets/platform.png');
  this.load.image('tree', 'assets/tree.png');
  this.load.image('apple', 'assets/apple.jpg');
  this.load.image('orange', 'assets/orange.png');
  this.load.image('peach', 'assets/peach.png');
  this.load.image('brown', 'assets/brown.png');
  this.load.image('save', 'assets/save.png');
  this.load.image('store', 'assets/store.png');
  this.load.image('bench', 'assets/bench.png');
}

function create ()
{
  //  A simple background for our game
  this.add.image(400, 300, 'sky');
  //this.add.image(400, 400, 'tree');
  this.add.image(400, 300, 'tree');
  save = this.add.image(50, 568, 'save').setInteractive();//Click to save
  //  The scores
  appleText = this.add.text(10, 16, 'Apples: '+appleNum, { fontSize: '32px', fill: '#000' });
  orangeText = this.add.text(10, 48, 'Oranges: '+orangeNum, { fontSize: '32px', fill: '#000' });
  peachText = this.add.text(10, 80, 'Peaches: '+peachNum, { fontSize: '32px', fill: '#000' });
  moneyText = this.add.text(10, 112, '$'+moneyNum, { fontSize: '32px', fill: '#000' });
  
  storeText = this.add.text(610, 400, 'Shop', { fontSize: '32px', fill: '#000' });
  this.add.image(650, 520, 'bench');
  //Shop for fertilizer or pickers(add display)
}

function update (){
  //Apple, orange, or peach
  if(score<10){//score only for testing, should remove eventually
    fruit = this.add.image(400, 200, 'apple').setInteractive();
    fruit.on('pointerdown', function(pointer){//Increment apples with every touch
      appleNum++;
      score++;//temp
      appleText.setText('Apples: '+appleNum);
    });
    //fruit.setActive(false).setVisible(false);
  }else if(score>=10 && score<20){
    //fruit.setActive(false).setVisible(false);
    fruit = this.add.image(400, 200, 'orange').setInteractive();
    fruit.on('pointerdown', function(pointer){//Increment oranges with every touch
      orangeNum++;
      score++;//temp
      orangeText.setText('Oranges: '+orangeNum);
    });
  }else if(score>=20){
    fruit = this.add.image(400, 200, 'peach').setInteractive();
    fruit.on('pointerdown', function(pointer){//Increment peaches with every touch
      peachNum++;
      score++;//temp
      peachText.setText('Peaches: '+peachNum);
    });
  }

  save.on('pointerdown', function(pointer){
    //Save, store stuff in db
  })
}

function App() {
  return (
    <div className="App">
    </div>
  );
}

export default App;
