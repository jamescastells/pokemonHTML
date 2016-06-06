var border;
var size, width, height;
var north_c = "none";
var south_c = "none";
var screen_height;
var screen_width;

function loadDataOfPlayer(){
  var rawFile = new XMLHttpRequest();
    rawFile.open("GET", "saveData/player.txt", false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                var lines = rawFile.responseText.split('\n');
                for(var line = 0; line < lines.length; line++){
                  line_txt = lines[line];
                  prop_val = line_txt.split(":");
                  property = prop_val[0];
                  value = prop_val[1];
                  if (property == 'position'){
                    pos = value.split(",");
                    x = parseInt(pos[0]);
                    y = parseInt(pos[1]);
                    screen_height = parseInt($("#screen").css("height"));
                    screen_width = parseInt($("#screen").css("width"));
                    $("#location").css("left", (screen_width/2) - x*32);
                    $("#location").css("top",  (screen_height/2) - y*32 + 16);
                    location_top = parseInt($("#location").css("top"));
                    location_left = parseInt($("#location").css("left"));
                    location_width = parseInt($("#location").css("width"));
                    location_height = parseInt($("#location").css("height"));
                    $("#player").css("top", screen_height/2 - location_top - 24);
                    $("#player").css("left", screen_width/2 - location_left - 30);
                    $("#borderTop").css("top", -y*32);
                    $("#borderTop").css("left", -x*32 + 32);
                    $("#borderTop").css("width",location_width + screen_width - 32);
                    $("#borderLeft").css("left", -x*32 + 32);
                    $("#borderLeft").css("top", -y*32);
                    $("#borderLeft").css("height", location_height + screen_height/2 - 16);
                    $("#borderRight").css("left", location_width - 32*x + 32);
                    $("#borderRight").css("height", location_height + screen_height/2 - 16);
                    $("#borderRight").css("top", -y*32);
                    $("#borderDown").css("left", 160 - x*32);
                    $("#borderDown").css("top", -y*32 - 128);
                    $("#borderDown").css("width",location_width + screen_width - 32);
                  }
                }
              }
          }
    }
    rawFile.send(null);
}

function loadLocation(name, start){

  emptyLocation();

  var rawFile = new XMLHttpRequest();
    rawFile.open("GET", name, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                var lines = rawFile.responseText.split('\n');
                for(var line = 0; line < lines.length; line++){
                  line_txt = lines[line];
                  prop_val = line_txt.split(":");
                  property = prop_val[0];
                  value = prop_val[1];
                  if (property == "border"){
                    border = value;
                  }
                  if (property == "size"){
                    size = value;
                    w_h = size.split("x");
                    width = parseInt(w_h[0]*32);
                    height = parseInt(w_h[1]*32);
                  }
                  if (property == "up"){
                    info_connect = value.split(",");
                    north_c = info_connect[0];
                    north_adj = info_connect[1];
                  }
                  if (property == "down"){
                    info_connect = value.split(",");
                    south_c = info_connect[0];
                    south_adj = info_connect[1];
                  }
                  if (property.indexOf("png")>-1){
                    elemento = document.createElement("div");
                    elemento.style.width = '32px';
                    elemento.style.height = '32px';
                    pos = value.split(",");
                    pos_x = pos[0];
                    pos_y = pos[1];
                    elemento.style.backgroundImage = "url('tiles/"+property+"')";
                    $("#location").append(elemento);
                    elemento.style.position = 'absolute';
                    elemento.style.left = pos_x*32 - 32;
                    elemento.style.top = pos_y*32 - 32;
                    if (property.indexOf("ground")>-1)
                      $(elemento).addClass("ground");
                    else if (property.indexOf("water")>-1)
                      $(elemento).addClass("water");
                    else if (property.indexOf("grass")>-1)
                      $(elemento).addClass("grass");
                    else {
                      $(elemento).addClass("barrier");
                    }
                  }
                }
                $("#location").css("width",width);
                $("#location").css("height",height);
                border_s = 'tiles/'+border;
                $("#borderTop").css("background-image","url("+border_s+")");
                $("#borderLeft").css("background-image","url("+border_s+")");
                $("#borderRight").css("background-image","url("+border_s+")");
                $("#borderDown").css("background-image","url("+border_s+")");

            }
        }
    }
    rawFile.send(null);
    if (start == true){
      loadDataOfPlayer();
      refreshPlayerPositionData();
    }
    emptyConnectors();
    if (north_c!="none"){
      loadConnector("locations/"+north_c,"#up",north_adj);
    }
}

function loadConnector(name,where,adjustement){

  var width_l, height_l;

  var rawFile = new XMLHttpRequest();
    rawFile.open("GET", name, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                var lines = rawFile.responseText.split('\n');
                for(var line = 0; line < lines.length; line++){
                  line_txt = lines[line];
                  prop_val = line_txt.split(":");
                  property = prop_val[0];
                  value = prop_val[1];
                  if (property == "border"){
                    border = value;
                  }
                  if (property == "size"){
                    size = value;
                    w_h = size.split("x");
                    width_l = parseInt(w_h[0]*32);
                    height_l = parseInt(w_h[1]*32);
                  }
                  if (property.indexOf("png")>-1){
                    elemento = document.createElement("div");
                    elemento.style.width = '32px';
                    elemento.style.height = '32px';
                    pos = value.split(",");
                    pos_x = pos[0];
                    pos_y = pos[1];
                    elemento.style.backgroundImage = "url('tiles/"+property+"')";
                    $(where).append(elemento);
                    elemento.style.position = 'absolute';
                    elemento.style.left = pos_x*32 - 32;
                    elemento.style.top = pos_y*32 - 32;
                    if (property.indexOf("ground")>-1)
                      $(elemento).addClass("ground");
                    else if (property.indexOf("water")>-1)
                      $(elemento).addClass("water");
                    else if (property.indexOf("grass")>-1)
                      $(elemento).addClass("grass");
                    else {
                      $(elemento).addClass("barrier");
                    }
                  }
                }
                $(where).css("width",width_l);
                $(where).css("height",height_l);
                actualLeft = parseInt($("#location").css("left"));
                if (where == "#up"){
                  [pl_x,pl_y] = obtainPlayerPosition();
                  $(where).css("top",-height_l - height - 32*(pl_y+8));
                  $(where).css("left",actualLeft + adjustement*32);
                }
            }
        }
    }
    rawFile.send(null);
}

function checkIfLocationChanged(){

  [pl_x,pl_y] = obtainPlayerPosition();
  if (pl_y == 0 && north_c != "none"){ // has gone to the north connector
    emptyConnectors();
    loadLocation("locations/"+north_c, false);
    $("#location").css("top",-height + (screen_height/2)+16);
    $("#player").css("top",height-32 -8);
    $("#borderTop").css("top",-height);
    $("#borderRight").css("left",width-(pl_x*32)-32);
    $("#borderRight").css("height",height + screen_height/2 - 16);
    $("#borderRight").css("top",-height);
    $("#borderDown").css("top",-height - screen_height/2 + 16);
    $("#borderLeft").css("left",-width+(pl_x*32)-32);
    $("#borderLeft").css("top",-height);
    $("#borderLeft").css("height",height + screen_height/2 - 16);
  }
}

function emptyLocation(){
  loc = document.getElementById("location");
  children = loc.children;
  for (var i = 0; i<children.length;i++){
    if (children[i].id!='player'){
      loc.removeChild(children[i]);
      i = i-1;
    }
  }
}

function emptyConnectors(){
  $("#up").empty();
  $("#up").css("width",0);
  $("#up").css("height",0);
}
