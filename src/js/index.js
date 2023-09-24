let Floor = document.getElementById("Floor-input");
let Lift = document.getElementById("Lift-Input");
let submit = document.getElementById("btn-generate");
let floorsContainer = document.querySelector("#adding-floors");
let liftStates = [];

const buttonsElements = document.querySelectorAll(".buttons");
console.log(buttonsElements)

submit.addEventListener("click", () => {
  let inputFloor = Floor.value;
  let inputLift = Lift.value;
  // conditions to check if inputs are correct
  if (inputFloor < 2 || inputFloor > 10) {
    alert("Please enter a valid number of floors");
    return;
  }
  if (inputLift < 2 || inputLift > 5) {
    alert("Please enter a valid number of lifts");
    return;
  }

  // conditions for mobile  view
  if (window.innerWidth < 768) {
    if (inputFloor < 2 || inputFloor > 5) {
      alert("Please enter a valid number of floors");
      return;
    }
    if (inputLift < 2 || inputLift > 3) {
      alert("Please enter a valid number of lifts");
      return;
    }
  }

  // conditions for tablet view
  if (window.innerWidth < 1024 && window.innerWidth > 768) {
    if (inputFloor < 2 || inputFloor > 10) {
      alert("Please enter a valid number of floors");
      return;
    }
    if (inputLift < 2 || inputLift > 4) {
      alert("Please enter a valid number of lifts");
      return;
    }
  }
  
  Createfloor(inputFloor, inputLift);
});


// function to handle cliking of buttons from buttons array

// const handleButtons = (e) => {
//   buttons.forEach((button) => {
//     button.addEventListener("click", () => {
//       console.log('clicked');
//     });
//   });
// };

// handleButtons();


// fuction to check if the lift is idle or not
const checkLift = (lift) => {
  if (liftStates[lift].active === false) {
    return true;
  } else {
    return false;
  }
};



const regenerate = document.querySelector("#btn-regenerate");

regenerate.addEventListener("click", () => {
  while (floorsContainer.firstChild) {
    floorsContainer.firstChild.remove();
  }
});

const Createfloor = (inputFloor, inputLift) => {
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
        CreateLift(liftDiv);
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
 
};


const CreateLift = (liftDiv) => {
  let lift = document.createElement("div");
  let liftDoor = document.createElement("div");
  liftDoor.classList.add("liftdoor");
  lift.classList.add("lift", "lift" + 1);
  lift.dataset.position = 0;
  let door = document.createElement("div");
  door.classList.add("door");
  lift.appendChild(liftDoor);
  liftDiv.appendChild(lift);
  liftStates.push({
    active: false, // false means it not moving
    currentFloor: 0,
  });
};
Createfloor(5,2);
