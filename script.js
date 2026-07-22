/* =====================================================
   MYSTERY BOX WEBSITE
   SCRIPT.JS PART 5A

   CORE SYSTEM + MYSTERY BOX
===================================================== */


/* ================================
   GLOBAL CONFIG
================================ */


const PROMO_CODE = "BONUS2026";


const CLAIM_URL = 
"https://kilauyes.com/";



let boxAlreadyOpened = false;






/* ================================
   DOM HELPER
================================ */


const get = (id)=>{

    return document.getElementById(id);

};






/* ================================
   PAGE DETECTOR
================================ */


document.addEventListener(
"DOMContentLoaded",
()=>{


    initMysteryBox();


    initActivity();



});









/* =====================================================
   MYSTERY BOX SYSTEM
===================================================== */





function initMysteryBox(){



const promoInput =
get("promoInput");



const submitPromo =
get("submitPromo");



const openButton =
get("openBoxBtn");



const promoBox =
get("promoBox");




if(openButton){


openButton.onclick = ()=>{


if(promoBox){


promoBox.classList.add(
"active"
);


}



};



}






if(submitPromo){


submitPromo.onclick = ()=>{


checkPromo();



};



}







}








/* ================================
   CHECK PROMO
================================ */



function checkPromo(){



const input =
get("promoInput");



if(!input)
return;



let code =
input.value
.trim()
.toUpperCase();





if(code === PROMO_CODE){



showToast(
"Kode berhasil! Mystery Box dibuka 🎁"
);



let promoBox =
get("promoBox");



if(promoBox){


promoBox.style.display =
"none";


}





startBoxAnimation();





}

else{


showToast(
"Kode promo salah!"
);



}



}









/* ================================
   BOX ANIMATION
================================ */



function startBoxAnimation(){



if(boxAlreadyOpened)
return;



boxAlreadyOpened=true;





const box =
get("mysteryBox");



const countdown =
get("countdown");





if(!box)
return;





box.classList.add(
"opening"
);





let count = 3;




if(countdown){



countdown.style.display =
"block";



countdown.innerHTML =
count;



}






let timer = setInterval(()=>{


count--;



if(countdown){


countdown.innerHTML =
count;


}




if(count <=0){


clearInterval(timer);



if(countdown){


countdown.style.display =
"none";


}



openBoxReward();



}



},1000);



}








/* ================================
   OPEN BOX
================================ */



function openBoxReward(){



const box =
get("mysteryBox");



if(box){



box.classList.add(
"opened"
);



}





setTimeout(()=>{


showReward();



createConfetti();



},900);





}








/* ================================
   END PART 5A
=====================================================
/* =====================================================
   MYSTERY BOX WEBSITE
   SCRIPT.JS PART 5B

   REWARD SYSTEM + CLAIM + CONFETTI
===================================================== */





/* ================================
   REWARD DATABASE

   TOTAL = 100%

   Rp25.000       35%
   Rp50.000       25%
   Rp100.000      30%
   Rp200.000       5%
   Rp500.000       4%
   Rp2.000.000     1%

================================ */



const rewardList = [


    {
        name:"Common",
        amount:25000,
        rate:35
    },


    {
        name:"Common",
        amount:50000,
        rate:25
    },


    {
        name:"Common",
        amount:100000,
        rate:30
    },


    {
        name:"Epic",
        amount:200000,
        rate:5
    },


    {
        name:"Legendary",
        amount:500000,
        rate:4
    },


    {
        name:"Jackpot",
        amount:2000000,
        rate:1
    }


];








/* ================================
   RANDOM GENERATOR
================================ */


function generateReward(){



let random =
Math.random()*100;



let total = 0;




for(let reward of rewardList){



    total += reward.rate;



    if(random <= total){


        return reward;



    }


}




return rewardList[0];



}








/* ================================
   SHOW REWARD
================================ */


function showReward(){



const resultBox =
get("resultBox");


const rewardNumber =
get("rewardNumber");


const rewardMessage =
get("rewardMessage");


const claimBtn =
get("claimBtn");





if(!resultBox)
return;






let reward =
generateReward();






resultBox.classList.add(
"show"
);






animateMoney(
rewardNumber,
reward.amount
);






if(rewardMessage){



rewardMessage.innerHTML = `

🎉 Selamat! Anda berhasil mendapatkan hadiah Mystery Box.

<br><br>

Kategori:
<strong>
${reward.name}
</strong>


<br>

Klik tombol Claim Hadiah untuk melanjutkan proses klaim.

`;



}





if(claimBtn){


claimBtn.style.display =
"inline-flex";



claimBtn.onclick = ()=>{


claimReward();



};



}




}








/* ================================
   MONEY COUNT ANIMATION
================================ */


function animateMoney(
element,
target
){



if(!element)
return;



let start = 0;



let duration = 1500;



let stepTime =
20;



let increment =
target /
(duration / stepTime);





let counter =
setInterval(()=>{


start += increment;



if(start >= target){



start = target;



clearInterval(counter);



}




element.innerHTML =
formatRupiah(
Math.floor(start)
);





},stepTime);




}









/* ================================
   FORMAT RUPIAH
================================ */


function formatRupiah(number){



return new Intl.NumberFormat(

"id-ID",

{

style:"currency",

currency:"IDR",

maximumFractionDigits:0

}

)

.format(number);



}










/* ================================
   CLAIM SYSTEM
================================ */



function claimReward(){



showToast(

"Menuju halaman klaim hadiah..."

);



setTimeout(()=>{



window.location.href =
CLAIM_URL;



},1200);



}










/* ================================
   CONFETTI SYSTEM
================================ */



function createConfetti(){



for(
let i=0;
i<120;
i++
){



let confetti =
document.createElement(
"div"
);



confetti.className =
"confetti";




confetti.style.left =

Math.random()*100
+
"vw";





confetti.style.animationDuration =

(
Math.random()*3+2
)
+
"s";





confetti.style.background =

randomConfettiColor();





document.body.appendChild(
confetti
);






setTimeout(()=>{


confetti.remove();



},
5000);




}



}










/* ================================
   CONFETTI COLOR
================================ */



function randomConfettiColor(){


const colors=[

"#ffd700",

"#ffffff",

"#00ff88",

"#ff4d4d",

"#4da6ff"

];



return colors[

Math.floor(
Math.random()*colors.length
)

];


}









/* ================================
   TOAST MESSAGE
================================ */



function showToast(message){



let toast =
document.createElement(
"div"
);



toast.className =
"toast";



toast.innerHTML =
message;




document.body.appendChild(
toast
);





setTimeout(()=>{


toast.classList.add(
"show"
);



},100);





setTimeout(()=>{


toast.remove();



},3000);





}








/* =====================================================
   END SCRIPT.JS PART 5B
===================================================== */
/* =====================================================
   MYSTERY BOX WEBSITE
   SCRIPT.JS PART 5C

   ACTIVITY SYSTEM + FINISHING
===================================================== */





/* ================================
   ACTIVITY USER DATABASE
================================ */



const fakeUsers = [

"as***23",

"ri***81",

"de***45",

"fa***17",

"an***62",

"iq***09",

"ha***54",

"ar***37",

"za***88",

"mi***21",

"ra***76",

"ke***14",

"lu***55",

"jo***92"

];









/* ================================
   INIT ACTIVITY PAGE
================================ */



function initActivity(){



const activityList =
get("activityList");



if(!activityList)
return;





loadActivities();





startActivityUpdate();



}










/* ================================
   LOAD INITIAL DATA
================================ */


function loadActivities(){



const activityList =
get("activityList");



if(!activityList)
return;




activityList.innerHTML="";






for(
let i=0;
i<10;
i++
){



activityList.appendChild(

createActivityItem()

);



}





}









/* ================================
   CREATE ACTIVITY ITEM
================================ */


function createActivityItem(){



let user =

fakeUsers[

Math.floor(

Math.random()
*
fakeUsers.length

)

];





let reward =

generateReward();







let item =

document.createElement(
"div"
);





item.className =

"activity-item";





item.innerHTML = `


<div class="activity-user">


<div class="activity-icon">

✓

</div>



<div class="activity-name">

${user}

</div>


</div>



<div class="activity-reward">

Berhasil claim

<br>

${formatRupiah(reward.amount)}

</div>



`;






return item;



}









/* ================================
   AUTO UPDATE ACTIVITY
================================ */


function startActivityUpdate(){



const activityList =
get("activityList");



if(!activityList)
return;






let randomTime =

Math.floor(

Math.random()*15000

)

+

15000;






setInterval(()=>{





let newActivity =

createActivityItem();





newActivity.style.opacity="0";





activityList.prepend(
newActivity
);






setTimeout(()=>{


newActivity.style.opacity="1";



},100);








if(
activityList.children.length
>
10

){


activityList.lastElementChild.remove();



}





},

randomTime);





}









/* ================================
   BUTTON RIPPLE EFFECT
================================ */


document.addEventListener(

"click",

function(e){



let button =

e.target.closest(
".btn"
);



if(!button)
return;





let ripple =

document.createElement(
"span"
);




ripple.className =
"ripple";




button.appendChild(
ripple
);





setTimeout(()=>{


ripple.remove();



},600);




}

);










/* ================================
   PAGE LOAD EFFECT
================================ */


window.addEventListener(

"load",

()=>{



document.body.classList.add(
"loaded"
);



}

);









/* ================================
   PROTECT DOUBLE CLAIM
================================ */



window.addEventListener(

"beforeunload",

()=>{


boxAlreadyOpened=false;


}

);









/* =====================================================
   SCRIPT.JS COMPLETE

   PART 5A
   PART 5B
   PART 5C

   MYSTERY BOX WEBSITE READY
===================================================== */
