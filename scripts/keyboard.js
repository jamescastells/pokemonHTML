var walkUp='right';
var walkDown='right';
var walking=false;

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
      if (walkUp=='right'){
        $("#player").css("background-image","url(sprites/walkingUpRight.png)");
        walkUp='left';
      }
      else if (walkUp=='left'){
        $("#player").css("background-image","url(sprites/walkingUpLeft.png)");
        walkUp='right';
      }
      actualTop = parseInt($("#location").css("top"));
      newTop = actualTop+32;
      $("#location").animate({
        'top':newTop
      },300);
      actualTop = parseInt($("#player").css("top"));
      newTop = actualTop-32;
      $("#player").animate({
          'top':newTop
      },300,function(){
          $("#player").css("background-image","url(sprites/up.png)");
            walking=false;
      });
    }
    else if (key_code==40){ //down
      if (parseInt($("#location").css("top")) == parseInt($("#location").css("height"))/-2){
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
      actualTop = parseInt($("#location").css("top"));
      newTop = actualTop-32;
      $("#location").animate({
        'top':newTop
      },300);
      actualTop = parseInt($("#player").css("top"));
      newTop = actualTop+32;
      $("#player").animate({
          'top':newTop
      },300,function(){
          $("#player").css("background-image","url(sprites/down.png)");
            walking=false;
      });
    }
    else if (key_code==37){ //left
      if (parseInt($("#location").css("left")) == 128){
        $("#player").css("background-image","url(sprites/left.png)");
        walking=false;
        return;
      }
      $("#player").css("background-image","url(sprites/walkingLeft.png)");
      actualLeft = parseInt($("#location").css("left"));
      newLeft = actualLeft+32;
      $("#location").animate({
        'left':newLeft
      },300);
      actualLeft = parseInt($("#player").css("left"));
      newLeft = actualLeft-32;
      $("#player").animate({
          'left':newLeft
      },300,function(){
          $("#player").css("background-image","url(sprites/left.png)");
            walking=false;
      });
    }
    else if (key_code==39){ //right
      if (parseInt($("#location").css("left")) == parseInt($("#location").css("width"))/-2){
        $("#player").css("background-image","url(sprites/right.png)");
        walking=false;
        return;
      }
      $("#player").css("background-image","url(sprites/walkingRight.png)");
      actualLeft = parseInt($("#location").css("left"));
      newLeft = actualLeft-32;
      $("#location").animate({
        'left':newLeft
      },300);
      actualLeft = parseInt($("#player").css("left"));
      newLeft = actualLeft+32;
      $("#player").animate({
          'left':newLeft
      },300,function(){
          $("#player").css("background-image","url(sprites/right.png)");
            walking=false;
      });
    }
}
