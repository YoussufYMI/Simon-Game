var userClcikPattern=[];
var gamePattern=[];
var level = 0;
var buttonColours=["green","red","yellow","blue"];
let keypressEnabled=true;

$("body").on("keypress",function(){
    
    if (keypressEnabled){
        console.log("Keypress detected. Function executed.");
        keypressEnabled=false;
        
        nextSequence ();

        const targetElement = $("#message")[0];

        const rstart = new MutationObserver (()=>{
            if($("#message").text() === "Game Over, Press Any Key to Restart"){
                console.log("DOM change detected. Re-enabling keypress.");
                keypressEnabled=true;
                rstart.disconnect(); 
            }

        });
        
        rstart.observe(targetElement, { characterData: true, childList: true, subtree: true });
        
    }
    else {
        console.log("Keypress ignored. Waiting for DOM change.");
    }
});
    
$("button").on("click",function(){
    var userchosencolour = $(this).attr("class");
    var numclick = $(this).data("number");
    userClcikPattern.push(userchosencolour);
    playSound(userchosencolour);
    animatedPress(numclick);

    if(userClcikPattern.length===gamePattern.length && userClcikPattern[userClcikPattern.length-1]  ===  gamePattern[gamePattern.length-1]){
        setTimeout(() => {
            userClcikPattern=[];
            nextSequence ()
        }, 1000);
    }
    else if (userClcikPattern.length>gamePattern.length || gamePattern.length===0){
        gameover(numclick);
    }
    for (let i=0 ; i<userClcikPattern.length && i<gamePattern.length ; i++){
        if(userClcikPattern[i]!==gamePattern[i]){
            gameover(numclick);
        }
    }
});

function nextSequence (){
    var index = Math.floor(Math.random()*4) ;
    var randomChosenColour = buttonColours[index]; //---> green  
    gamePattern.push(randomChosenColour);
    level++;
    $("h1").text("Level " + level);
    $("button").eq(index).hide();
    setTimeout(() => { 
        $("button").eq(index).show(); 
    }, 200);

    playSound(randomChosenColour)
}

function playSound(colourname){
    var sound = new Audio ("Music/"+ colourname +".mp3");
    sound.play();
}


function animatedPress(stringnum){
    $("button").eq(stringnum).addClass("bb");
    setTimeout(() => {
        $("button").eq(stringnum).removeClass("bb");
    }, 100);
}


function gameover(nn){
    $("h1").text("Game Over, Press Any Key to Restart");
    $("body").addClass("all");
    setTimeout(() =>$("body").removeClass("all"), 200);
    $("button").eq(nn).addClass("bb");
    setTimeout(() =>$("button").eq(nn).removeClass("bb"), 100);
    var sound4 = new Audio ("Music/gameover.mp3");
    sound4.play();
    restart();
}

function restart(){
    userClcikPattern=[];
    gamePattern=[];
    level=0;
}  
    
