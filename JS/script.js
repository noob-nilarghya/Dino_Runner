//alert("Please play on large display devices, Thanking you :)");

// Targetting all the required elements
const playGround= document.querySelector(".playground")
const startBtn = document.querySelector("#start");
const automate= document.querySelector("#automate");
const reset= document.querySelector("#reset");
const dino = document.querySelector(".dino");
const cactus = document.querySelector(".cactus")
const track = document.querySelector(".track");
const cloud = document.querySelector(".cloud");
const gameOverImg = document.querySelector(".gameOver");
const instruction= document.querySelector(".instruction");
const Score= document.querySelector(".score");


let flag_strt=false;
let flag_auto=true;
let flag_auto_main=false;
let score=0;

// Function to initiate jump animation for dino
function dinoJump() {
    if (dino.classList.length == 1) {
        dino.classList.add("jump");
        var audioFileJump= new Audio("assets/audio/jump.mp3");
        audioFileJump.play();
        setTimeout(function () {
            dino.classList.remove("jump");
        }, 300);
        flag_auto=false;
    }
}

// Random number generator for cactus 1,2,3
function randomNum() {
    let a = Math.random();
    a *= 3;
    a += 1;
    a = Math.floor(a);
    return a;
}

// function to call dinoJump on keypress
document.addEventListener("keydown", function (event) {
    dinoJump();
    if(flag_strt===true && flag_auto_main===false){
        score+=5;
        Score.textContent="Score: "+score;
        if(score%50==0){
            var audioFileMilestone= new Audio("assets/audio/milestone.mp3");
            audioFileMilestone.play();
        }
    }
    if(flag_auto_main===true){
        flag_auto_main=false;
        automate.style.backgroundColor="red"
    }
});


automate.addEventListener("mouseover", function () {
    flag_auto_main=true;
        
    automate.style.backgroundColor="green";
});
automate.addEventListener("mouseout", function () {
    flag_auto_main=false;
        
    automate.style.backgroundColor="red";
});

reset.addEventListener("click", function(){
    location.reload();
});


startBtn.addEventListener("click", function () {

    instruction.classList.add("isVisible");
    flag_strt=true;
    startBtn.style.backgroundColor="green";
    // first move the reuired element back in their default positions
    cactus.style.left = "1150px";
    cloud.style.left = "1110px";
    dino.classList.add("jump");
    setTimeout(function () {
        dino.classList.remove("jump");
    }, 300);
    
    track.classList.add("trackMove");
    cloud.classList.add("cloudMove");
    cactus.classList.add("cactusMove");


    let collisionCondition; // isCollision indicator [true denotes collision]
    let autoCollissionHandle;
    let count=0; // updating count to randomly call other cactus after every ~ 1.8 sec

    setInterval(function () { //check collision after every 50ms, & update random cactus cls

        count++;

        let dinoRun= 'assets/image/DinoRun'+count%2+'.png';
        dino.style.backgroundImage = "url('"+dinoRun+"')";

        // targetting & getting y-co-ordinate of dino & -x co-ordinate of current cactus
        let dinoTop = parseInt(window.getComputedStyle(dino).getPropertyValue("top"));
        let cactusLeft = parseInt(window.getComputedStyle(cactus).getPropertyValue("left"));

        if(cactusLeft>=100 && cactusLeft<=150){
    
            autoCollissionHandle=true;
            if(flag_auto===true && autoCollissionHandle===true && flag_auto_main===true){
                dinoJump();
                flag_auto=false;
            }
        }
        
        collisionCondition = (cactusLeft >= 0 && cactusLeft <= 40) && (dinoTop > 250);
        if (collisionCondition === true) { //collision==true
            
            dino.style.animationPlayState = "paused";
            cactus.style.animationPlayState = "paused";
            track.style.animationPlayState = "paused";
            cloud.style.animationPlayState = "paused";
            playGround.classList.add("gameEnd");
            dino.style.backgroundImage = "url('assets/image/DinoDead.png')";
            gameOverImg.classList.remove("isVisible");
            reset.classList.remove("isVisible");
            flag_strt=false;
            return count;
            
        }
        
        if(count%36==0){ // after every ~1.8 sec update the cactus cls
            if (cactus.classList.length === 3) {
                cactus.classList.remove(cactus.classList[1]); //remove existing cactus class
                cactus.classList.remove(cactus.classList[1]); //remove existing cactusMove class
                cactus.classList.add("cactus" + randomNum());
                cactus.classList.add("cactusMove");
                flag_auto=true;
            }
        }

    }, 50);
    
});

