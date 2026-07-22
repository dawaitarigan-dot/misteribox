// =====================================
// MYSTERY BOX SYSTEM
// SCRIPT.JS
// =====================================


// ==============================
// CONFIGURATION
// ==============================

const PROMO_CODE = "BONUS2026";

const CLAIM_URL = "https://kilauyes.com/";


// ==============================
// REWARD SYSTEM
// TOTAL DROP RATE = 100%
// ==============================


const rewards = [
    {
        name: "Common",
        amount: 25000,
        chance: 35
    },

    {
        name: "Common",
        amount: 50000,
        chance: 25
    },

    {
        name: "Rare",
        amount: 100000,
        chance: 20
    },

    {
        name: "Epic",
        amount: 200000,
        chance: 10
    },

    {
        name: "Legendary",
        amount: 500000,
        chance: 5
    },

    {
        name: "Mythic",
        amount: 2000000,
        chance: 5
    }
];


// ==============================
// DOM ELEMENT
// ==============================


const openBtn = document.querySelector("#openPromo");


const promoModal = document.querySelector("#promoModal");


const promoInput = document.querySelector("#promoCode");


const submitPromo = document.querySelector("#submitPromo");


const promoMessage = document.querySelector("#promoMessage");


const mysteryBox = document.querySelector("#mysteryBox");


const countdown = document.querySelector("#countdown");


const rewardSection = document.querySelector("#rewardSection");


const rewardAmount = document.querySelector("#rewardAmount");


const rewardTier = document.querySelector("#rewardTier");


const claimBtn = document.querySelector("#claimReward");


const activityFeed = document.querySelector("#activityFeed");


const closeModal = document.querySelector(".closeModal");


const openSound = document.querySelector("#openSound");


const winSound = document.querySelector("#winSound");



// ==============================
// OPEN PROMO POPUP
// ==============================


openBtn.addEventListener("click",()=>{

    promoModal.classList.add("active");

});



// ==============================
// CHECK PROMO CODE
// ==============================


submitPromo.addEventListener("click",()=>{


    let code = promoInput.value.trim();


    if(code === PROMO_CODE){


        promoModal.classList.remove("active");


        startOpening();


    }

    else{


        promoInput.classList.add("error");


        setTimeout(()=>{

            promoInput.classList.remove("error");

        },500);


    }


});



// ==============================
// OPEN MYSTERY BOX
// ==============================


function startOpening(){


    mysteryBox.classList.add("shake");


    countdown.style.display="block";


    let time = 3;


    countdown.innerHTML=time;



    let timer=setInterval(()=>{


        time--;


        countdown.innerHTML=time;



        if(time<=0){


            clearInterval(timer);


            countdown.style.display="none";


            openMysteryBox();


        }



    },1000);



}




// ==============================
// RANDOM REWARD
// ==============================


function generateReward(){


    let random = Math.random()*100;


    let total = 0;



    for(let reward of rewards){


        total += reward.chance;



        if(random <= total){


            return reward;


        }


    }



}




// ==============================
// BOX OPEN ANIMATION
// ==============================


function openMysteryBox(){



    mysteryBox.classList.remove("shake");


    mysteryBox.classList.add("open");



    setTimeout(()=>{


        let result = generateReward();



        showReward(result);



    },2000);



}




// ==============================
// SHOW RESULT
// ==============================


function showReward(result){



    rewardSection.style.display="block";



    rewardTier.innerHTML = result.name;



    rewardAmount.innerHTML =
    formatRupiah(result.amount);



    createConfetti();



    if(result.name==="Mythic"){


        rewardBox.classList.add("jackpot");


        rewardType.innerHTML =
        "👑 JACKPOT MYTHIC";


    }



}




// ==============================
// FORMAT RUPIAH
// ==============================


function formatRupiah(number){


    return new Intl.NumberFormat(
        "id-ID",
        {
            style:"currency",
            currency:"IDR",
            maximumFractionDigits:0
        }

    ).format(number);


}



// ==============================
// CLAIM BUTTON
// ==============================


claimBtn.addEventListener("click",()=>{


    window.location.href = CLAIM_URL;


});





// ==============================
// CONFETTI SYSTEM
// ==============================


function createConfetti(){


    for(let i=0;i<120;i++){


        let confetti =
        document.createElement("span");


        confetti.className="confetti";


        confetti.style.left =
        Math.random()*100+"vw";


        confetti.style.animationDelay =
        Math.random()*2+"s";


        confetti.style.transform =
        `rotate(${Math.random()*360}deg)`;


        document.body.appendChild(confetti);



        setTimeout(()=>{


            confetti.remove();


        },4000);



    }


}






// ==============================
// CLAIM ACTIVITY SIMULATION
// ==============================



const users=[

"as",
"ri",
"de",
"fa",
"an",
"iq",
"ha",
"ar",
"jo",
"mi",
"ke",
"lu"

];



const amounts=[

25000,
50000,
100000,
200000,
500000,
2000000

];




function randomUser(){


    let name =
    users[
        Math.floor(
            Math.random()*users.length
        )
    ];


    let number =
    Math.floor(
        Math.random()*99
    )
    .toString()
    .padStart(2,"0");



    return name+"***"+number;


}





function createActivity(){


    let user=randomUser();


    let money =
    amounts[
        Math.floor(
            Math.random()*amounts.length
        )
    ];



    let item =
    document.createElement("div");


    item.className="activity-item";


    item.innerHTML=`

    <div class="check">
        ✓
    </div>

    <div>
        <strong>${user}</strong>
        <p>
        Berhasil claim ${formatRupiah(money)}
        </p>
    </div>

    `;



    return item;


}





function loadActivity(){


    activityFeed.innerHTML="";


    for(let i=0;i<10;i++){


        activityFeed.appendChild(
            createActivity()
        );


    }


}




// update satu data random
function updateActivity(){



    let newItem =
    createActivity();



    newItem.classList.add(
        "slide"
    );


    activityFeed.prepend(
        newItem
    );



    if(activityFeed.children.length>10){


        activityFeed.lastChild.remove();


    }



}



// jalankan pertama

loadActivity();



// update 15-30 detik

setInterval(()=>{


    updateActivity();


},
Math.floor(
    Math.random()*15000
)+15000
);




// =====================================
// END SCRIPT
// =====================================
