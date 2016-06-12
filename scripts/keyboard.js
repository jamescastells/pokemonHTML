var walkUp='right';
var walkDown='right';
var walking=false;
var speed=200;
var facing='down';
var goDown=false;

function thereIsBarrier(pos_x, pos_y, where){
  var thereIs = false;
  $("#"+where).find(".barrier").each(function(index){
    barrier_l = parseInt($(this).css("left"))/32 + 1;
    barrier_t = parseInt($(this).css("top"))/32 + 1;
    if (barrier_l == pos_x && barrier_t == pos_y){
      thereIs = true;
    }

  });
  return thereIs;
}

function thereIsLedge(pos_x, pos_y, where){
  var thereIs = false;
  $("#"+where).find(".ledge").each(function(index){
    ledge_l = parseInt($(this).css("left"))/32 + 1;
    ledge_t = parseInt($(this).css("top"))/32 + 1;
    if (ledge_l == pos_x && ledge_t == pos_y){
      thereIs = true;
    }

  });
  return thereIs;
}

function checkUp(pos_x,pos_y){
    if (pos_y == 0){
      if (north_c!='none'){
        if (thereIsBarrier(pos_x,(height_north)/32, "up")){
          return false;
        }
        else {
          return true;
        }
      }
      else{
        return false;
      }
    }
    return true;
}

function checkDown(pos_x,pos_y){
    if (pos_y > (height)/32){
      if (south_c!='none'){
        if (thereIsBarrier(pos_x,1, "down")){
          return false;
        }
        else {
          return true;
        }
      }
      else{
        return false;
      }
    }
    return true;
}

var walking_down = false;
var walking_up = false;
var walking_left = false;
var walking_right = false;

function movePlayer(){
    //walking = true;
    [pos_x,pos_y] = obtainPlayerPosition();
    if (walking_up && walking==false){ //up
      walking = true;
      facing = 'up';
      if (checkUp(pos_x,pos_y-1)==false){
        $("#player").css("background-image","url(sprites/up.png)");
        walking_up=false;
        walking=false;
        return;
      }
      if (thereIsBarrier(pos_x, pos_y-1,"location")){
        $("#player").css("background-image","url(sprites/up.png)");
        walking_up=false;
        walking=false;
        return;
      }
      if (thereIsLedge(pos_x,pos_y-1,"location")){
        $("#player").css("background-image","url(sprites/up.png)");
        walking_up=false;
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
          checkIfLocationChanged();
          refreshPlayerPositionData();
          checkIfInWarp();
          movePlayer();      // move Player until the gamer stops pressing
      });
    }
    else if (walking_down && walking==false){ //down
      walking = true;
      facing = 'down';
      if (checkDown(pos_x,pos_y+1)==false){
        $("#player").css("background-image","url(sprites/down.png)");
        walking_down=false;
        walking=false;
        checkIfInRugWarp();
        return;
      }
      if (thereIsBarrier(pos_x,pos_y+1,"location")){
        $("#player").css("background-image","url(sprites/down.png)");
        walking_down=false;
        walking=false;
        checkIfInRugWarp();
        return;
      }
      if (thereIsLedge(pos_x,pos_y+1,"location")){
        $("#player").css("background-image","url(sprites/down.png)");
        jumpDown();
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
          checkIfLocationChanged();
          refreshPlayerPositionData();
          checkIfInWarp();
          movePlayer();
      });
    }
    else if (walking_left && walking==false){ //left
      walking=true;
      facing = 'left';
      if (parseInt($("#location").css("left")) == 128){
        $("#player").css("background-image","url(sprites/left.png)");
        walking_left=false;
        walking=false;
        return;
      }
      if (thereIsBarrier(pos_x-1,pos_y,"location")){
        $("#player").css("background-image","url(sprites/left.png)");
        walking_left=false;
        walking=false;
        return;
      }
      if (thereIsLedge(pos_x-1,pos_y,"location")){
        $("#player").css("background-image","url(sprites/left.png)");
        walking_left=false;
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
          checkIfLocationChanged();
          refreshPlayerPositionData();
          checkIfInWarp();
          movePlayer();
      });
    }
    else if (walking_right && walking==false){ //right
      walking=true;
      facing='right';
      if (parseInt($("#location").css("left")) == -(parseInt($("#location").css("width")) - 160)){
        $("#player").css("background-image","url(sprites/right.png)");
        walking_right=false;
        walking=false;
        return;
      }
      if (thereIsBarrier(pos_x+1,pos_y,"location")){
        $("#player").css("background-image","url(sprites/right.png)");
        walking_right=false;
        walking=false;
        return;
      }
      if (thereIsLedge(pos_x+1,pos_y,"location")){
        $("#player").css("background-image","url(sprites/right.png)");
        walking_right=false;
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
          checkIfLocationChanged();
          refreshPlayerPositionData();
          checkIfInWarp();
          movePlayer();
      });
    }
}

$(window).keydown(function(e){
  if (e.which >=37 && e.which <=40){
      if (walking_down || walking_up || walking_left || walking_right || walking) // if already walking, ignore any input
        return;
      if (e.which==37)
        walking_left = true;
      else if (e.which==38)
        walking_up = true;
      else if (e.which==39)
        walking_right = true;
      else if (e.which == 40)
        walking_down = true;
      movePlayer();
  }
  if (e.which == 88){
    if (walking)
      return;
    if (facing == 'up'){
      [pos_x, pos_y] = obtainPlayerPosition();
      id_sign = thereIsSign(pos_x,pos_y-1);
      if (id_sign>-1){
        message = obtainMessage(id_sign);
        alert(message);
      }
    }
    if (facing == 'down'){
      [pos_x, pos_y] = obtainPlayerPosition();
      id_sign = thereIsSign(pos_x,pos_y+1);
      if (id_sign>-1){
        message = obtainMessage(id_sign);
        alert(message);
      }
    }
    if (facing == 'left'){
      [pos_x, pos_y] = obtainPlayerPosition();
      id_sign = thereIsSign(pos_x-1,pos_y);
      if (id_sign>-1){
        message = obtainMessage(id_sign);
        alert(message);
      }
    }
    if (facing == 'right'){
      [pos_x, pos_y] = obtainPlayerPosition();
      id_sign = thereIsSign(pos_x+1,pos_y);
      if (id_sign>-1){
        message = obtainMessage(id_sign);
        alert(message);
      }
    }
  }
});

$(window).keyup(function(e){
    if (e.which >=37 || e.which <=40){
      walking_down=false;
      walking_up=false;
      walking_left=false;
      walking_right=false;
    }
});

function isInRug(pos_x,pos_y){
  var found=false;
  $("#location").find(".rug").each(function(index){
    rug_l = parseInt($(this).css("left"))/32 + 1;
    rug_t = parseInt($(this).css("top"))/32 + 1;
    if (rug_l == pos_x && rug_t == pos_y){
      found=true;
    }
  });
  return found;
}

function jumpDown(){
  moveEverythingUp(-32);
  shadow = document.createElement("div");
  $(shadow).addClass("shadow");
  topOfShadow = parseInt($("#player").css("top"))+28;
  leftOfShadow = parseInt($("#player").css("left"));
  $(shadow).css("top",topOfShadow);
  $(shadow).css("left",leftOfShadow);
  document.getElementById("location").appendChild(shadow);
  actualTop = parseInt($("#player").css("top"));
  newTop = actualTop+16;
  $(shadow).animate({
    'top':topOfShadow+64
  },speed*2);
  $("#player").animate({
      'top':newTop
  },speed,function(){
    moveEverythingUp(-32);
    actualTop = parseInt($("#player").css("top"));
    newTop = actualTop+48;
    $("#player").animate({
        'top':newTop
    },speed,function(){
        walking_down=false;
        walking=false;
        document.getElementById("location").removeChild(shadow);
        refreshPlayerPositionData();
      });
  });
}

function simulateWalkDown(){
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
      checkIfLocationChanged();
      refreshPlayerPositionData();
      walking=false;
  });
}

function checkIfInRugWarp(){
  [pos_x,pos_y] = obtainPlayerPosition();
  var idWarp = -1;
  $("#location").find(".warp").each(function(index){
    warp_l = parseInt($(this).css("left"))/32 + 1;
    warp_t = parseInt($(this).css("top"))/32 + 1;
    if (warp_l == pos_x && warp_t == pos_y){
      idWarp = $(this).prop("id").split("-")[1];
    }
  });
  if (idWarp>-1){
    if (isInRug(pos_x,pos_y)==true){
      walking=true;
      [new_x,new_y,nameOfMap] = obtainWhereToWarp(idWarp);
      goDown=true;
      fadeToBlackAndWarp(new_x,new_y,nameOfMap);
    }
  }
}

function checkIfInWarp(){
    [pos_x,pos_y] = obtainPlayerPosition();
    var idWarp = -1;
    $("#location").find(".warp").each(function(index){
      warp_l = parseInt($(this).css("left"))/32 + 1;
      warp_t = parseInt($(this).css("top"))/32 + 1;
      if (warp_l == pos_x && warp_t == pos_y){
        idWarp = $(this).prop("id").split("-")[1];
      }
    });
    if (idWarp>-1){
      if (isInRug(pos_x,pos_y)==false){
        [new_x,new_y,nameOfMap] = obtainWhereToWarp(idWarp);
        fadeToBlackAndWarp(new_x,new_y,nameOfMap);
      }
      else{
        walking=false;
      }
    }
    else {
      walking=false;
    }
}

function fadeToBlackAndWarp(new_x,new_y,nameOfMap){
  $('#blackScreen').css("width",screen_width);
  $('#blackScreen').css("height",screen_height);
  $('#blackScreen').animate({
       opacity: 1,
     }, 300, function() {
         emptyConnectors();
         loadLocation("locations/"+nameOfMap,false);
         positionPlayer(new_x,new_y);
         loadConnectors();
         refreshPlayerPositionData();
         $('#blackScreen').css("width",0);
         $('#blackScreen').css("height",0);
         $('#blackScreen').css("opacity",0);
         if (goDown){
            simulateWalkDown();
            goDown=false;
         }
         else{
           walking=false;
         }
     });
}

function thereIsSign(pos_x,pos_y){
  var id_sign = -1;
  $("#location").find(".sign").each(function(index){
    sign_l = parseInt($(this).css("left"))/32 + 1;
    sign_t = parseInt($(this).css("top"))/32 + 1;
    if (sign_l == pos_x && sign_t == pos_y){
        id_v = $(this).prop("id").split("-");
        id_sign = id_v[1];
    }

  });
  return id_sign;
}

function obtainPlayerPosition(){
  l= (parseInt($("#player").css("left"))-2 + 32)/32;
  t= (parseInt($("#player").css("top"))+8 + 32)/32;
  return [l,t]
}

function refreshPlayerPositionData(){
  [l,t] = obtainPlayerPosition();
  $("#positionOfPlayer").text(l+ ", " + t);
  $("#locationOfPlayer").text(location_name);
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
    actualLeft = parseInt($("#down").css("left"));
    newLeft = actualLeft+value;
    $("#down").animate({
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
    actualLeft = parseInt($("#down").css("top"));
    newLeft = actualLeft+value;
    $("#down").animate({
      'top':newLeft
    },speed);
}
