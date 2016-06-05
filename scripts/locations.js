var border;
var size, width, height;

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

function loadLocation(name){

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
    loadDataOfPlayer();
}
