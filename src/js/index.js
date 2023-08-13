let Floor = document.getElementById("Floor-input");
let Lift = document.getElementById("Lift-Input");
let submit = document.getElementById("btn-generate");
let floorsContainer = document.querySelector("#adding-floors");
let liftPositions = [];
let currentPositions = [];
let liftStates = []; 

submit.addEventListener("click", () => {
  const inputFloor = +Floor.value;
  const inputLift = +Lift.value;
 
  if (inputFloor < inputLift) {
    alert("floor cannot be less than lift");
    return;
  }
  if (inputFloor < 0 || inputLift < 0 || inputLift > 7) {
    alert("Entries cannot be negative");
  }
  if (inputFloor <= 0 || inputLift <= 0 || inputLift > 7) {
    alert("Entries cannot be negative or zero");
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
  
  Createfloor(inputFloor, inputLift);
  liftPositions = [];
  let buttonsall = Array.from(document.querySelectorAll(".buttons"));
  let activeLiftIndex = 0;
 
  MoveLift(buttonsall);
});

// Rest of the code remains the same

const MoveLift = ({buttonsall}) =>{
  buttonsall.forEach((buttonsal) => {
    buttonsal.addEventListener("click", (e) => {
    let lift = document.querySelectorAll(".lift");
      console.log(liftStates)
      
    });
  });
}


const regenerate = document.querySelector("#btn-regenerate");

regenerate.addEventListener("click", () => {
  while (floorsContainer.firstChild) {
    floorsContainer.firstChild.remove();
  }
});




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
  lift.dataset.position = 0; 
  let door = document.createElement("div");
  door.classList.add("door");
  lift.appendChild(liftDoor)
  liftDiv.appendChild(lift);
  liftPositions.push(0);
  liftStates.push({
    active : false, 
    currentFloor: 0, 
  })
}
