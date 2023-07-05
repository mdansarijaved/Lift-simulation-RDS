# Lift-simulation-RDS

## stash
```js
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
    console.log('this is ', liftsState)
  }
  console.log("this is another", liftsState)
  return res;
}
```
```js
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
    console.log('this is ', liftsState)
  }
  console.log("this is another", liftsState)
  return res;
}
```
