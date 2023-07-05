let Floor = document.getElementById("Floor-input");
let Lift = document.getElementById("Lift-Input");
let submit = document.getElementById("btn-generate");
let floorsContainer = document.querySelector("#adding-floors");
let liftPositions = [];
let currentPositions = [];
let liftsState = [];

submit.addEventListener("click", () => {
  const inputFloor = +Floor.value;
  const inputLift = +Lift.value;
  Checking(inputFloor, inputLift);
  createState(inputLift);
  Createfloor(inputFloor, inputLift);
  liftPositions = [];
  currentPositions = Array.from({ length: inputLift }, () => 0);
  let buttonsall = Array.from(document.querySelectorAll(".buttons"));
  let activeLiftIndex = 0;
  buttonsall.forEach((buttonsall, index) => {
    buttonsall.addEventListener("click", (e) => {
      const floorvalue = parseInt(buttonsall.id);
      let y = getIdleLift(index);
      const lifts = Array.from(document.querySelectorAll(".lift"));
      const translatioindistance = (floorvalue - 1) * 120;
      if (activeLiftIndex >= 0 && activeLiftIndex < lifts.length) {
        lifts[activeLiftIndex].style.transform = `translateY(-${translatioindistance}px)`;
        console.log("Current position:", currentPositions[activeLiftIndex]);
        console.log('floor value ', floorvalue)
        let distance = Math.abs(floorvalue - currentPositions[activeLiftIndex]) * 2;
        console.log(distance);
        lifts[activeLiftIndex].style.transition = `transform ${distance}s linear 0s`;
        // Set the position value to the floor value
        setTimeout(function() {
          let liftdoor = document.querySelectorAll('.liftdoor');
          liftdoor[activeLiftIndex].style.animation = "slide-open 2s forwards";
          setTimeout(function() {
            let liftdoor = document.querySelectorAll('.liftdoor');
            liftdoor[activeLiftIndex].style.animation = "slide-close 2s forwards";
            activeLiftIndex = (activeLiftIndex + 1) % lifts.length;
            currentPositions[activeLiftIndex] = floorvalue;
            console.log("current position after:", currentPositions[activeLiftIndex]);
          }, 2000);
        }, (distance * 1000 ));
      }
    });
  });
  
});

// Rest of the code remains the same


const regenerate = document.querySelector("#btn-regenerate");

regenerate.addEventListener("click", () => {
  while (floorsContainer.firstChild) {
    floorsContainer.firstChild.remove();
  }
});

function getIdleLift(destination) {
  console.log(`Checking for idle lift to reach floor ${destination}`);
  let minDis = Infinity;
  let res = -1;

  for (let i = 0; i < liftsState.length; i++) {
    if (liftsState[i].idle) {
      let currDiff = Math.abs(destination - liftsState[i].currentFloor);
      console.log("Checking lift", i, "with difference", currDiff);
      if (currDiff < minDis) {
        minDis = currDiff;
        res = i;    
      }
    }
  }

  if (res !== -1) {
    liftsState[res].idle = false;
    liftsState[res].currentFloor = destination;
    console.log('this is ',liftsState)
  }
  console.log("this is another",liftsState)
  return res;
}


function createState(lifts) {
  console.log("Creating state for lifts");
  liftsState = [];
  for (let i = 0; i < lifts; i++) {
    liftsState.push({ idle: true, currentFloor: 0 });
  }
  console.log(liftsState);
}

const Checking = (inputFloor,inputLift) => {
  console.log(inputFloor,inputLift)
  if (inputFloor < inputLift) {
    alert("floor cannot be less than lift");
    return;
  }
  if (inputFloor < 0 || inputLift < 0) {
    alert("Entries cannot be negative");
    return;
  }
  const screenWidth = window.innerWidth;
  if (screenWidth < 600 && inputLift > 3) {
    alert("On mobile, input lift cannot be more than 3");
    return;
  }
 
  while (floorsContainer.firstChild) {
    floorsContainer.firstChild.remove();
  }
}

const Createfloor = (inputFloor,inputLift) =>{
  for (let i = inputFloor; i > 0; i--) {
    let mainDiv = document.createElement("div");
    let buttonDiv = document.createElement("div");
    let buttonUp = document.createElement("button");
    let buttonDown = document.createElement("button");
    let liftDiv = document.createElement("div");
    liftDiv.classList.add("lifts");
    mainDiv.classList.add("floor");
    mainDiv.id = "floor" + i;
    buttonDiv.classList.add("btn-div");
    buttonUp.id = i;
    buttonDown.id = i;
    buttonUp.classList.add("buttons", "buttonup");
    buttonUp.textContent = "UP";
    buttonDown.textContent = "DN";
    buttonDown.classList.add("buttons", "buttondown");

    if (i === inputFloor) {
      buttonDiv.appendChild(buttonDown);
    } else if (i === 1) {
      for (let j = 0; j < inputLift; j++) {
        CreateLift(liftDiv)
      }
      buttonDiv.appendChild(buttonUp);
    } else {
      buttonDiv.appendChild(buttonUp);
      buttonDiv.appendChild(buttonDown);
    }
    mainDiv.appendChild(buttonDiv);
    mainDiv.appendChild(liftDiv);
    floorsContainer.appendChild(mainDiv);
  }
}

const CreateLift = (liftDiv) => {
  let lift = document.createElement("div");
  let liftDoor = document.createElement('div')
  liftDoor.classList.add('liftdoor')
  lift.classList.add("lift", "lift" + 1);
  lift.dataset.position = 0; // Set the initial position value as 0 for each lift
  let door = document.createElement("div");
  door.classList.add("door");
  lift.appendChild(liftDoor)
  liftDiv.appendChild(lift);
  liftPositions.push(0);
  currentPositions.push(0); // Add 0 as the initial current position for the lift
}

