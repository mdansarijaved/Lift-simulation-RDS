let Floor = document.getElementById("Floor-input");
let Lift = document.getElementById("Lift-Input");
let submit = document.getElementById("btn-generate");
let floorsContainer = document.querySelector("#adding-floors");
let liftPositions = [];
let currentPositions = [];
let liftStates = [];
const clickQueue = [];

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

  liftPositions = [];
});

// Rest of the code remains the same

const MoveLift = () => {
  let buttonsall = Array.from(document.querySelectorAll(".buttons"));
  let index = 0;

  buttonsall.forEach((buttonsal) => {
    buttonsal.addEventListener("click", (e) => {
      let lifts = Array.from(document.querySelectorAll(".lift"));
      let time = Math.abs((liftStates[index].currentFloor - e.target.id) * 2);
      let liftDoor = document.querySelectorAll(".liftdoor");
      let Lift = lifts[index];
      let Time = time;
      let Index = index;
      let Stateid = e.target.id;
      if (!liftStates[index].active) {
        actualMove({
          lifts: Lift,
          time: Time,
          index: Index,
          stateid: Stateid,
          liftDoor: liftDoor,
        });
      } else {
        clickQueue.push({
          lifts: Lift,
          time: Time,
          index: Index,
          stateid: Stateid,
          liftDoor: liftDoor,
        });
        console.log(`clickqueue is pushed and its length is ${clickQueue.length}`);
      }

      const intervalId = setInterval(() => {
    
        console.log("this is click",clickQueue);

        if (clickQueue.length > 0) {
          actualMove(clickQueue[0]);
          clickQueue.shift();
        }

        console.log("click queue after",clickQueue);
        console.log(clickQueue.length);
        if (clickQueue.length === 0) {
          clearInterval(intervalId);
        }
      }, time * 1000);

      if (index === lifts.length - 1) {
        index = 0;
      } else {
        index++;
      }
    });
  });
};

const actualMove = ({ lifts, time, index, stateid, liftDoor }) => {

  let id = 0;

  if (!liftStates[index].active) {
    liftStates[index].active = true; // now lift is moving
    lifts.style.transform = `translateY(-${(stateid - 1) * 120}px)`;
    lifts.style.transition = `all ${time}s linear`;
    console.log(`The lift no ${index} is ${liftStates[index].active}`);
    console.log("the lift is moving");
  }

  setTimeout(() => {
    console.log("now lift has stopped");
    liftStates[index].active = false;
    liftStates[index].currentFloor = stateid;
    id = stateid;
    console.log(`this is id ${id}`);
  }, time * 1000);

  if (liftStates.currentFloor === id) {
    liftDoor[index].style.animation = `slide-open 2s forwards`;
    setTimeout(() => {
      liftDoor[index].style.animation = `slide-close 2s forwards`;
    }, 2 * 1000);

    console.log(`The lift no ${index} is ${liftStates[index].active}`);
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
  MoveLift();
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
  liftPositions.push(0);
  liftStates.push({
    active: false, // lift is stationary
    currentFloor: 0,
  });
};
Createfloor(5, 2);
