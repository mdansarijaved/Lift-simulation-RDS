const myButton = document.querySelector(".btn-generate");
myButton.Onclick = () => {
  createDivs();
};

function createDivs() {
  var numDivs = parseInt(document.getElementById("Lift-Input").value);

  var container = document.getElementById("lifts");
  container.innerHTML = "";

  for (var i = 0; i < numDivs; i++) {
    var div = document.createElement("div");
    div.className = "lift";
    container.appendChild(div);
  }
}
