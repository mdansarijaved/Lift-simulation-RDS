let Floor = document.getElementById("Floor-input");
let Lift = document.getElementById("Lift-Input");
let submit = document.getElementById("btn-generate");
let floorsContainer = document.querySelector("#adding-floors");
let liftPositions = [];

submit.addEventListener("click", () => {
  const inputFloor = +Floor.value;
  const inputLift = +Lift.value;
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
  liftPositions = [];

  for (let i = inputFloor; i > 0 ; i--) {
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
    buttonDown.classList.add("buttons",  "buttondown");

    if (i === inputFloor) {
      buttonDiv.appendChild(buttonDown);
    } else if (i === 1) {
      for (let j = 0; j < inputLift; j++) {
        let lift = document.createElement("div");
        lift.classList.add("lift", "lift" + 1);
        liftDiv.appendChild(lift);
        liftPositions.push(0);
      }
      buttonDiv.appendChild(buttonUp);
    } else {
      buttonDiv.appendChild(buttonUp);
      buttonDiv.appendChild(buttonDown);
    }
    mainDiv.appendChild(buttonDiv);
    mainDiv.appendChild(liftDiv);
    floorsContainer.appendChild(mainDiv);

    // buttonsall.forEach((buttonsall) => {
    // buttonsall.addEventListener("click", (e) => {
    //   console.log(buttonsall)
    //   const lifts = Array.from(document.querySelectorAll('.lift'));
    //   const translationDistance = (inputFloor - i -1) * 120;
    //   const currentPosition = liftPositions[activeLiftIndex];
    //   const newPosition = currentPosition + translationDistance;
    //   lifts[activeLiftIndex].style.transform = `translateY(-${newPosition}px)`;
    //   lifts[activeLiftIndex].style.transition = "transform 1500ms ease-in-out 0s";
    //   liftPositions[activeLiftIndex] = newPosition;
    //   activeLiftIndex = (activeLiftIndex + 1) % lifts.length;
    //   console.log(liftPositions)
    // });
    // });
  }
  let activeLiftIndex = 0;
  let buttonsall = Array.from(document.querySelectorAll(".buttons"));
  buttonsall.forEach((buttonsall) => {
    buttonsall.addEventListener("click", (e) => {
      const floorvalue = parseInt(buttonsall.id); 
      console.log(floorvalue)
      const lifts = Array.from(document.querySelectorAll('.lift'));
      const translatioindistance = (floorvalue-1) * 120; 
      lifts[activeLiftIndex].style.transform = `translateY(-${translatioindistance}px)`;
      lifts[activeLiftIndex].style.transition = "transform 1500ms ease-in-out 0s";
      activeLiftIndex = (activeLiftIndex + 1) % lifts.length; 
    });
  });


});

const regenerate = document.querySelector('#btn-regenerate')

regenerate.addEventListener('click',()=>{
  while (floorsContainer.firstChild) {
    floorsContainer.firstChild.remove();
  }
})
