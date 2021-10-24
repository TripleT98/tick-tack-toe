var button = document.getElementById("starter");
button.onclick = function(){
  var modes = document.getElementsByClassName("mode");
  button.style.display = "none";
  modes[0].style.display = "block";
  modes[0].onclick = function(eventObj){var mode = eventObj.target;mode = mode.getAttribute("class");game.startGame(mode)}
  //game.startGame(500);
}
var restart = document.getElementsByClassName("restart")[1];
restart.onclick = function(){
  game.endgame();
  game.activePiece.getBlock();game.activePiece.x = 3;game.activePiece.y = 0
  setTimeout(function(){game.startGame(500)},500);
}

var game  = {
  playField: [
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0]
  ],

  setEvent(eventObj){
    if(eventObj.code == "ArrowDown"){game.mpd()}else if(eventObj.code == "ArrowUp"){game.rP()}else if(eventObj.code == "ArrowLeft"){game.mpl()}else if(eventObj.code == "ArrowRight"){game.mpr()}
  },
  //Запустить игру
    startGame(mode){
    var self = this;
    document.addEventListener("keydown",game.setEvent);
    var controller = document.getElementsByClassName("controller")[0];
    controller.style.display = "none";
    this.activePiece.getBlock();
    new Promise(function(a,b){a(setInterval(function(){self.mpd()},mode))}).then(function(num){self.time = num;})
  },
  //Параметры фигур
  activePiece:{
    x:3,
    y:0,
    blocks:[],
    blockName: "T",
    getBlock(){this.blockName = ["I","J","O","S","Z","T"][Math.floor(Math.random()*6)];this.blocks = this.tetraminos[this.blockName];return this.blocks},
    tetraminos:{ 'I': [ [0,0,0,0], ['I','I','I','I'], [0,0,0,0], [0,0,0,0] ], 'J': [ ['J',0,0], ['J','J','J'], [0,0,0], ], 'L': [ [0,0,'L'], ['L','L','L'], [0,0,0], ], 'O': [ ['O','O'], ['O','O'], ], 'S': [ [0,'S','S'], ['S','S',0], [0,0,0], ], 'Z': [ ['Z','Z',0], [0,'Z','Z'], [0,0,0], ], 'T': [ [0,'T',0], ['T','T','T'], [0,0,0], ] },
    colors:{'I': 'cyan', 'O': 'yellow', 'T': 'purple', 'S': 'green', 'Z': 'red', 'J': 'blue', 'L': 'orange' }
  },
  //Передвинуть вправо
  mpr(){
    var ap = this.activePiece.blocks;
    this.unPrint()
    this.activePiece.x += 1;
    if(this.checkPos()){}else{this.activePiece.x -= 1};
    this.print()
  },
  //Передвинуть влево
  mpl(){
    var ap = this.activePiece.blocks;
    this.unPrint()
    this.activePiece.x -= 1;
    if(this.checkPos()){}else{this.activePiece.x += 1};
    this.print()
  },
  //Передвинуть вниз
  mpd(){
    var ap = this.activePiece.blocks;
    this.unPrint()
    this.activePiece.y += 1;
    if(this.checkPos()){}else{this.activePiece.y -= 1;this.lp()};
    this.print()
  },
  //Развернуть фигуру
  rP(){
    var y = this.activePiece.y;
    var x = this.activePiece.x;
    var pf = this.playField;
    var ap = this.activePiece.blocks;
    this.unPrint();
    var rotated = ap.map(function(elem){return elem = elem.map((e)=>0)})
    for(var i = 0; i<ap.length;i++){
      var k = ap.length - 1 - i;
      for(var j = 0; j<ap[i].length; j++){
        rotated[j][k] = ap[i][j];
      }
    };this.activePiece.blocks = rotated;if(this.checkPos()){
    for(var i = 0; i < this.activePiece.blocks.length; i++){
        for(j = 0; j < this.activePiece.blocks[i].length; j++){
          if(rotated[i][j] !== 0){
          tr = document.getElementById([this.activePiece.y+i] +""+ [this.activePiece.x+j]);
          tr.style.backgroundColor = this.activePiece.colors[this.activePiece.blockName];
          }
       }
    }return this.activePiece.block}else{for(var i = 0; i < ap.length; i++){
        for(j = 0; j < ap[i].length; j++){
          if(ap[i][j] !== 0){
          tr = document.getElementById([this.activePiece.y+i] +""+ [this.activePiece.x+j]);
          tr.style.backgroundColor = this.activePiece.colors[this.activePiece.blockName];
          }
       }
    }return this.activePiece.blocks = ap};
  },
  //Проверить позицию
  checkPos(){
    var y = this.activePiece.y;
    var x = this.activePiece.x;
    var pf = this.playField;
    var ap = this.activePiece.blocks;
      for(var i = 0; i < ap.length;i++){
        for(var j = 0; j < ap[i].length; j++){
          if(((pf[y+i] == undefined || pf[y+i][x+j] == undefined) && ap[i][j] != 0) || (pf[y+i] != undefined && pf[y+i][x+j] != 0 && ap[i][j] != 0)){return false}
        }
     }return true
  },
  //Зафиксировать позию фигуры
  lp(){
    var y = this.activePiece.y;
    var x = this.activePiece.x;
    pf = this.playField;
    ap = this.activePiece.blocks;
    for(var i = 0; i < ap.length; i++){
      for(var j = 0; j < ap[i].length; j++){
        if(ap[i][j] == 0){continue}
        pf[y+i][x+j] = ap[i][j];
        tr = document.getElementById([this.activePiece.y+i] +""+ [this.activePiece.x+j]);
        tr.style.backgroundColor = this.activePiece.colors[this.activePiece.blockName];
      }
    };this.activePiece.getBlock();this.activePiece.x = 3;this.activePiece.y = 0;this.rowToZero();if(this.playField.every(function(elem){return elem.some(function(e){return e!=0?true:false})})){this.endgame()};
  },
  rowToZero(){
    var counter = 0;
    for(var i = 0; i < this.playField.length;i++){
      if(this.playField[i].every(function(elem){if(elem !== 0){return true}else{return false}})){
            this.playField.splice(i,1);
            this.playField.unshift(Array(10).fill(0));
            counter ++;
            this.setScores();
      }
    }if(counter > 0){
    for(var i = 0; i < this.playField.length;i++){
      for(var j = 0; j < this.playField[i].length;j++){
        if(this.playField[i][j] != 0){
          var tr = document.getElementById(i + "" + j);
          tr.style.backgroundColor = this.activePiece.colors[this.playField[i][j]];
        }else if(this.playField[i][j] == 0){var tr = document.getElementById(i + "" + j);tr.style.backgroundColor = "Transparent"}
        }
      }
    }
  },
  print(){
    for(var i = 0; i < this.activePiece.blocks.length; i++){
        for(j = 0; j < this.activePiece.blocks[i].length; j++){
          if(this.activePiece.blocks[i][j] !== 0){
          tr = document.getElementById([this.activePiece.y+i] +""+ [this.activePiece.x+j]);
          tr.style.backgroundColor = this.activePiece.colors[this.activePiece.blockName];
          }
       }
    }
  },
  unPrint(){
    for(var i = 0; i < this.activePiece.blocks.length; i++){
        for(j = 0; j < this.activePiece.blocks[i].length; j++){
          if(this.activePiece.blocks[i][j] !== 0){
          tr = document.getElementById([this.activePiece.y+i] +""+ [this.activePiece.x+j]);
          tr.style.backgroundColor = "Transparent";
          }
       }
    }
  },
  setScores(){
    var scores = document.getElementById("scores");
    scores.innerHTML = String(Number(scores.innerHTML) + 100);
  },
  endgame(){
     clearInterval(this.time);
     document.removeEventListener("keydown",game.setEvent);
     this.playField = [
       [0,0,0,0,0,0,0,0,0,0],
       [0,0,0,0,0,0,0,0,0,0],
       [0,0,0,0,0,0,0,0,0,0],
       [0,0,0,0,0,0,0,0,0,0],
       [0,0,0,0,0,0,0,0,0,0],
       [0,0,0,0,0,0,0,0,0,0],
       [0,0,0,0,0,0,0,0,0,0],
       [0,0,0,0,0,0,0,0,0,0],
       [0,0,0,0,0,0,0,0,0,0],
       [0,0,0,0,0,0,0,0,0,0],
       [0,0,0,0,0,0,0,0,0,0],
       [0,0,0,0,0,0,0,0,0,0],
       [0,0,0,0,0,0,0,0,0,0],
       [0,0,0,0,0,0,0,0,0,0],
       [0,0,0,0,0,0,0,0,0,0],
       [0,0,0,0,0,0,0,0,0,0],
       [0,0,0,0,0,0,0,0,0,0],
       [0,0,0,0,0,0,0,0,0,0],
       [0,0,0,0,0,0,0,0,0,0],
       [0,0,0,0,0,0,0,0,0,0]
     ];
     this.activePiece.blocks = [];
     for(var i = 0;i< this.playField.length;i++){
       for(var j =0;j<this.playField[i].length;j++){
         var tr = document.getElementById(i + "" + j);
         tr.style.backgroundColor = "Transparent";
       }
     }
     var scores = document.getElementById("scores");
     scores.innerHTML = String(0);
     var button = document.getElementById("starter");
     button.style.display = "block";
     var controller = document.getElementsByClassName("controller")[0];
     controller.style.display = "block";
     alert("Game over");
  }
}




window.game = game;
