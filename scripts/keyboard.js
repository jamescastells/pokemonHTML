var walkUp='right';
var walkDown='right';
var walking=false;
var speed=150;

function thereIsBarrier(pos_x, pos_y){
  locationmap = document.getElementById("location");
  barriers = locationmap.getElementsByClassName("barrier");
  for (var i=0;i<barriers.length;i++){
    barrier = barriers[i];
    if (parseInt($(barrier).css("left")) == pos_x && parseInt($(barrier).css("top")) == pos_y)
      return true;
  }
  return false;
}

document.onkeydown = function(event) {
    if (walking)
      return;
    walking = true;
    var key_press = String.fromCharCode(event.keyCode);
  	var key_code = event.keyCode;
    if (key_code==38){ //up
      if (parseInt($("#location").css("top")) == 128){
        $("#player").css("background-image","url(sprites/up.png)");
        walking=false;
        return;
      }
      if (thereIsBarrier(parseInt($("#player").css("left")) - 2, parseInt($("#player").css("top")) - 32 + 8)){
        $("#player").css("background-image","url(sprites/up.png)");
        walking=false;
        return;
      }
      if (walkUp=='right'){
        $("#player").css("background-image","url(sprites/walkingUpRight.png)");
        walkUp='left';
      }
      else if (walkUp=='left'){
        $("#player").css("background-image","url(sprites/walkingUpLeft.png)");
        walkUp='right';
      }
      moveEverythingUp(32);
      actualTop = parseInt($("#player").css("top"));
      newTop = actualTop-32;
      $("#player").animate({
          'top':newTop
      },speed,function(){
          $("#player").css("background-image","url(sprites/up.png)");
          refreshPlayerPositionData();
          walking=false;
      });
    }
    else if (key_code==40){ //down
      if (parseInt($("#location").css("top")) == -(parseInt($("#location").css("height"))-160)){
        $("#player").css("background-image","url(sprites/down.png)");
        walking=false;
        return;
      }
      if (thereIsBarrier(parseInt($("#player").css("left")) - 2, parseInt($("#player").css("top")) + 32 + 8)){
        $("#player").css("background-image","url(sprites/down.png)");
        walking=false;
        return;
      }
      if (walkDown=='right'){
        $("#player").css("background-image","url(sprites/walkingDownRight.png)");
        walkDown='left';
      }
      else if (walkDown=='left'){
        $("#player").css("background-image","url(sprites/walkingDownLeft.png)");
        walkDown='right';
      }
      moveEverythingUp(-32);
      actualTop = parseInt($("#player").css("top"));
      newTop = actualTop+32;
      $("#player").animate({
          'top':newTop
      },speed,function(){
          $("#player").css("background-image","url(sprites/down.png)");
          refreshPlayerPositionData();
          walking=false;
      });
    }
    else if (key_code==37){ //left
      if (parseInt($("#location").css("left")) == 128){
        $("#player").css("background-image","url(sprites/left.png)");
        walking=false;
        return;
      }
      if (thereIsBarrier(parseInt($("#player").css("left")) - 32 - 2, parseInt($("#player").css("top")) + 8)){
        $("#player").css("background-image","url(sprites/left.png)");
        walking=false;
        return;
      }
      $("#player").css("background-image","url(sprites/walkingLeft.png)");
      moveEverythingLeft(32);
      actualLeft = parseInt($("#player").css("left"));
      newLeft = actualLeft-32;
      $("#player").animate({
          'left':newLeft
      },speed,function(){
          $("#player").css("background-image","url(sprites/left.png)");
          refreshPlayerPositionData();
          walking=false;
      });
    }
    else if (key_code==39){ //right
      if (parseInt($("#location").css("left")) == -(parseInt($("#location").css("width")) - 160)){
        $("#player").css("background-image","url(sprites/right.png)");
        walking=false;
        return;
      }
      if (thereIsBarrier(parseInt($("#player").css("left")) +32 - 2, parseInt($("#player").css("top")) + 8)){
        $("#player").css("background-image","url(sprites/right.png)");
        walking=false;
        return;
      }
      $("#player").css("background-image","url(sprites/walkingRight.png)");
      moveEverythingLeft(-32);
      actualLeft = parseInt($("#player").css("left"));
      newLeft = actualLeft+32;
      $("#player").animate({
          'left':newLeft
      },speed,function(){
          $("#player").css("background-image","url(sprites/right.png)");
          refreshPlayerPositionData();
          walking=false;
      });
    }
    else{
      walking=false;
      return;
    }

}

function obtainPlayerPosition(){
  l= (parseInt($("#player").css("left"))-2 + 32)/32;
  t= (parseInt($("#player").css("top"))+8 + 32)/32;
  return [l,t]
}

function refreshPlayerPositionData(){
  [l,t] = obtainPlayerPosition();
  $("#positionOfPlayer").text(l+ ", " + t);
}

function moveEverythingLeft(value){
    actualLeft = parseInt($("#location").css("left"));
    newLeft = actualLeft+value;
    $("#location").animate({
      'left':newLeft
    },speed);
    actualLeft = parseInt($("#borderTop").css("left"));
    newLeft = actualLeft+value;
    $("#borderTop").animate({
      'left':newLeft
    },speed);
    actualLeft = parseInt($("#borderLeft").css("left"));
    newLeft = actualLeft+value;
    $("#borderLeft").animate({
      'left':newLeft
    },speed);
    actualLeft = parseInt($("#borderRight").css("left"));
    newLeft = actualLeft+value;
    $("#borderRight").animate({
      'left':newLeft
    },speed);
    actualLeft = parseInt($("#borderDown").css("left"));
    newLeft = actualLeft+value;
    $("#borderDown").animate({
      'left':newLeft
    },speed);
    actualLeft = parseInt($("#up").css("left"));
    newLeft = actualLeft+value;
    $("#up").animate({
      'left':newLeft
    },speed);
}

function moveEverythingUp(value){
    actualTop = parseInt($("#location").css("top"));
    newTop = actualTop+value;
    $("#location").animate({
      'top':newTop
    },speed);
    actualTop = parseInt($("#borderTop").css("top"));
    newTop = actualTop+value;
    $("#borderTop").animate({
      'top':newTop
    },speed);
    actualTop = parseInt($("#borderLeft").css("top"));
    newTop = actualTop+value;
    $("#borderLeft").animate({
      'top':newTop
    },speed);
    actualTop = parseInt($("#borderRight").css("top"));
    newTop = actualTop+value;
    $("#borderRight").animate({
      'top':newTop
    },speed);
    actualTop = parseInt($("#borderDown").css("top"));
    newTop = actualTop+value;
    $("#borderDown").animate({
      'top':newTop
    },speed);
    actualTop = parseInt($("#up").css("top"));
    newTop = actualTop+value;
    $("#up").animate({
      'top':newTop
    },speed);
}
