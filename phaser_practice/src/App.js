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
var saveText;
var storeBox;
var appleText, orangeText, peachText, moneyText, saveText, storeText;
var appleSell, orangeSell, peachSell;
var plusApple, plusOrange, plusPeach, minusApple, minusOrange, minusPeach;
var appleSellNum=0;
var peachSellNum=0;
var orangeSellNum = 0;
var moneyEarned = 0;
var moneyEarnedText;
var score = 0;//temp
var appleNum = 0
var orangeNum=0
var peachNum=0
var moneyNum = 0;
var upgradeText;
var sell;
var currCost = 1;
var nextFruit;
var upgradeMessage;
var game = new Phaser.Game(config);

function preload ()
{
  this.load.image('sky', 'assets/sky.png');
  this.load.image('ground', 'assets/platform.png');
  this.load.image('tree', 'assets/tree.png');
  this.load.image('apple', 'assets/apple.jpg');
  this.load.image('orange', 'assets/orange.png');
  this.load.image('peach', 'assets/peach.png');
  this.load.image('plus', 'assets/plus.png');
  this.load.image('minus', 'assets/minus.png');
  this.load.image('save', 'assets/save.png');
  this.load.image('store', 'assets/store.png');
  this.load.image('bench', 'assets/bench.png');
  this.load.image('upgrade', 'assets/upgrade.png');
  this.load.image('sell', 'assets/sell.png');
}

function create ()
{
  //  A simple background for our game
  this.add.image(400, 300, 'sky');
  //this.add.image(400, 400, 'tree');
  this.add.image(400, 300, 'tree');
  saveText = this.add.image(750, 20, 'save').setInteractive();//Click to save

  //upgrade farm
  upgradeText = this.add.image(50, 568, 'upgrade').setInteractive();
  if(currCost==1){
    nextFruit = 'oranges.\nPrice: $100';
  }else{
    nextFruit = 'peaches.\nPrice: $200';
  }
  upgradeMessage = this.add.text(110, 552, 'Upgrade to '+nextFruit, { fontSize: '20px', fill: '#000' });
  upgradeText.on('pointerdown', function(pointer){
    if(moneyNum>=100*currCost && currCost<3){
      currCost++;
      moneyNum -= 100*currCost;
      moneyText.setText('$'+moneyNum);
      upgradeMessage.setText('Upgrade to '+nextFruit);
    }
  });
  
  //  The scores
  appleText = this.add.text(10, 16, 'Apples: '+appleNum, { fontSize: '32px', fill: '#000' });
  orangeText = this.add.text(10, 48, 'Oranges: '+orangeNum, { fontSize: '32px', fill: '#000' });
  peachText = this.add.text(10, 80, 'Peaches: '+peachNum, { fontSize: '32px', fill: '#000' });
  moneyText = this.add.text(10, 112, '$'+moneyNum, { fontSize: '32px', fill: '#000' });
  
  //Selling fruits for money
  this.add.text(10, 374, 'Fruit to Sell', {fontSize: '32px', fill: '#000' });
  //apples
  appleSell = this.add.text(10, 400, 'Apples($1): ' + appleSellNum, {fontSize: '24px', fill: '#000' });
  minusApple = this.add.image(290,408, 'minus').setInteractive();
  plusApple = this.add.image(320, 408, 'plus').setInteractive();
  minusApple.on('pointerdown', function(pointer){
    if(appleSellNum>0){
      appleSellNum--;
      moneyEarned--;
      appleSell.setText('Apples($1): '+appleSellNum);
      moneyEarnedText.setText('Money Earned: '+moneyEarned);
    }
  });
  plusApple.on('pointerdown', function(pointer){
    if(appleSellNum<appleNum){
      appleSellNum++;
      moneyEarned++;
      appleSell.setText('Apples($1): '+appleSellNum);
      moneyEarnedText.setText('Money Earned: '+moneyEarned);
    }
  });
//Oranges
  orangeSell = this.add.text(10, 424, 'Oranges($2): ' + orangeSellNum, {fontSize: '24px', fill: '#000' });
  minusOrange = this.add.image(290,434, 'minus').setInteractive();
  plusOrange = this.add.image(320, 434, 'plus').setInteractive();
  minusOrange.on('pointerdown', function(pointer){
    if(orangeSellNum>0){
      orangeSellNum--;
      moneyEarned-=2;
      orangeSell.setText('Oranges($2): '+orangeSellNum);
      moneyEarnedText.setText('Money Earned: '+moneyEarned);
    }
  });
  plusOrange.on('pointerdown', function(pointer){
    if(orangeSellNum<orangeNum){
      orangeSellNum++;
      moneyEarned+=2;
      orangeSell.setText('Oranges($2): '+orangeSellNum);
      moneyEarnedText.setText('Money Earned: '+moneyEarned);
    }
  });
  //Peaches
  peachSell = this.add.text(10, 448, 'Peaches($5): ' + peachSellNum, {fontSize: '24px', fill: '#000' });
  minusPeach = this.add.image(290,460, 'minus').setInteractive();
  plusPeach = this.add.image(320, 460, 'plus').setInteractive();
  minusPeach.on('pointerdown', function(pointer){
    if(peachSellNum>0){
      peachSellNum--;
      moneyEarned-=5;
      peachSell.setText('Peaches($5): '+peachSellNum);
      moneyEarnedText.setText('Money Earned: '+moneyEarned);
    }
  });
  plusPeach.on('pointerdown', function(pointer){
    if(peachSellNum<peachNum){
      peachSellNum++;
      moneyEarned+=5;
      peachSell.setText('Peaches($5): '+peachSellNum);
      moneyEarnedText.setText('Money Earned: '+moneyEarned);
    }
  });
  moneyEarnedText = this.add.text(10, 472, 'Money Earned: ' + moneyEarned, {fontSize: '24px', fill: '#000' });

  //sell fruit button
  sell = this.add.image(50,520, 'sell').setInteractive();
  sell.on('pointerdown', function(pointer){
    appleNum-=appleSellNum;
    orangeNum-=orangeSellNum;
    peachNum-=peachSellNum;
    moneyNum+=moneyEarned;
    appleSellNum=0;
    orangeSellNum=0;
    peachSellNum=0;
    moneyEarned = 0;
    appleSell.setText('Apples($1): '+appleSellNum);
    orangeSell.setText('Oranges($2): '+orangeSellNum);
    peachSell.setText('Peaches($5): '+peachSellNum);
    moneyEarnedText.setText('Money Earned: '+moneyEarned);
    appleText.setText('Apples: '+appleNum);
    orangeText.setText('Oranges: '+orangeNum);
    peachText.setText('Peaches: '+peachNum);
    moneyText.setText('$'+moneyNum);
  });

  //Shop for fertilizer or pickers(add display)
  storeText = this.add.text(610, 400, 'Shop', { fontSize: '32px', fill: '#000' });
  this.add.image(650, 520, 'bench');
}

function update (){
  //Apple, orange, or peach
  if(currCost == 1){//score only for testing, should remove eventually
    fruit = this.add.image(400, 200, 'apple').setInteractive();
    fruit.on('pointerdown', function(pointer){//Increment apples with every touch
      appleNum++;
      appleText.setText('Apples: '+appleNum);
    });
    //fruit.setActive(false).setVisible(false);
  }else if(currCost ==2){
    //fruit.setActive(false).setVisible(false);
    fruit = this.add.image(400, 200, 'orange').setInteractive();
    fruit.on('pointerdown', function(pointer){//Increment oranges with every touch
      orangeNum++;
      orangeText.setText('Oranges: '+orangeNum);
    });
  }else if(currCost == 3){
    fruit = this.add.image(400, 200, 'peach').setInteractive();
    fruit.on('pointerdown', function(pointer){//Increment peaches with every touch
      peachNum++;
      peachText.setText('Peaches: '+peachNum);
    });
  }


  saveText.on('pointerdown', function(pointer){
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
