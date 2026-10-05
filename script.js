let max=50, secret, tries=0, score=1000, streak=0, hintUsed=false;
const $=id=>document.getElementById(id);

function start(){
  secret=Math.floor(Math.random()*max)+1;
  tries=0; score=1000; hintUsed=false;
  $("guess").value="";
  $("message").textContent="Make your first guess!";
  $("attempts").textContent="0 / 10";
  $("score").textContent=score;
  $("hintText").textContent="The secret is waiting...";
  $("historyList").innerHTML="<span>No guesses yet</span>";
  $("rangeText").textContent=max;
  $("maxNum").textContent=max;
}
start();

document.querySelectorAll(".level").forEach(btn=>{
  btn.onclick=()=>{
    document.querySelector(".level.active").classList.remove("active");
    btn.classList.add("active");
    max=+btn.dataset.max;
    start();
  };
});

$("guessBtn").onclick=guess;
$("guess").addEventListener("keydown",e=>{if(e.key==="Enter")guess()});

function guess(){
  let n=+$("guess").value;
  if(!n || n<1 || n>max){
    $("message").textContent=`Enter a number from 1 to ${max}.`;
    return;
  }

  tries++;
  score=Math.max(50,score-50);
  $("attempts").textContent=`${tries} / 10`;
  $("score").textContent=score;

  if(tries===1)$("historyList").innerHTML="";
  let item=document.createElement("span");
  item.className="guessItem";
  item.textContent=n;
  $("historyList").appendChild(item);

  if(n===secret){
    score+=Math.max(0,(10-tries)*50);
    streak++;
    $("streak").textContent=streak;
    $("score").textContent=score;
    $("answer").textContent=secret;
    $("finalScore").textContent=score;
    $("best").textContent=Math.max(score,+localStorage.best||0);
    localStorage.best=Math.max(score,+localStorage.best||0);
    $("win").classList.add("show");
    return;
  }

  $("message").textContent=n<secret?"🔼 Too Low! Try higher.":"🔽 Too High! Try lower.";

  if(tries>=10){
    streak=0;$("streak").textContent=0;
    $("message").textContent=`Game over! The number was ${secret}.`;
  }
}

$("hintBtn").onclick=()=>{
  if(hintUsed){$("hintText").textContent="You've already used your hint!";return}
  hintUsed=true; score=Math.max(0,score-100);
  $("score").textContent=score;
  $("hintText").textContent=secret%2===0?
    "The secret number is EVEN.":"The secret number is ODD.";
};

$("newGame").onclick=start;
$("playAgain").onclick=()=>{
  $("win").classList.remove("show");
  start();
};

$("best").textContent=localStorage.best||0;

$("theme").onclick=()=>{
  document.body.classList.toggle("light");
  $("theme").textContent=document.body.classList.contains("light")?"🌙":"☀";
};