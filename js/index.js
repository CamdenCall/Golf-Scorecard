async function getAvalibleCourses() {
    const url = "https://exquisite-pastelito-9d4dd1.netlify.app/golfapi/courses.json"
    const response = await fetch(url)
    const data = await response.json()
}

async function getCourseData(url) {
    const response = await fetch(url)
    const data = await response.json()
    return data
}

async function uploadData() {
    const yardage = document.getElementById("yardage");
    const handicap = document.getElementById("handicap");
    const par = document.getElementById("par");

    const player = document.querySelectorAll(".player");
    const data = await getCourseData("https://exquisite-pastelito-9d4dd1.netlify.app/golfapi/course11819.json");
    const tee = document.getElementById("tee").value;
    document.querySelectorAll('.score').forEach(element => element.remove());
    document.querySelectorAll('.data').forEach(element => element.remove());

    // Loop through each hole and create elements
    for (let i in data.holes) {
        const yardageElement = document.createElement("div");
        yardageElement.classList.add("col");
        yardageElement.classList.add("data");
        const handicapElement = document.createElement("div");
        handicapElement.classList.add("col");
        handicapElement.classList.add("data");
        const parElement = document.createElement("div");
        parElement.classList.add("col");
        parElement.classList.add("data");

        // Update yardage, handicap, and par based on tee selection
        const teeIndex = tee === "mens" ? 2 : tee === "womens" ? 3 : tee === "pro" ? 0 : 1;
        yardageElement.textContent = data.holes[i].teeBoxes[teeIndex].yards;
        handicapElement.textContent = data.holes[i].teeBoxes[teeIndex].hcp;
        parElement.textContent = data.holes[i].teeBoxes[teeIndex].par;

        par.appendChild(parElement);
        yardage.appendChild(yardageElement);
        handicap.appendChild(handicapElement);

        // Create inputs for each player for the current hole
        player.forEach((element) => {
            const playerData = document.createElement("div");
            playerData.classList.add("col");
            playerData.classList.add("score");

            const playerInput = document.createElement("input");
            playerInput.type = "text";
            playerInput.classList.add("score-input");
            playerInput.placeholder = "0";

            playerData.appendChild(playerInput);
            element.appendChild(playerData);
        });
    }
    calculateScore()
}

function getAllInputs(parent) {
    const inputs = parent.querySelectorAll(".score-input")
    let totalScore = 0
    let inScore = 0
    let outScore = 0
    inputs.forEach((element) => {
        if (element.value !== "") {
            totalScore += Number(element.value)
        }
    })
    Array.from(inputs).slice(0, 8).forEach((element) => {
        if (element.value !== "") {
            inScore += Number(element.value)
        }
    })
    Array.from(inputs).slice(9, 17).forEach((element) => {
        if (element.value !== "") {
            outScore += Number(element.value)
        }
    })
    return [totalScore, inScore, outScore]
}
function calculateScore() {
    const inputs = document.querySelectorAll(".score-input")
    inputs.forEach((element)=> {
        element.addEventListener("input", () => {
            const player = element.parentElement.parentNode.querySelector(".player-name").id
            if (player == "playerOne") {
                let scores = getAllInputs(element.parentElement.parentElement)
                document.getElementById("oneTotal").innerHTML = scores[0]
                document.getElementById("oneIn").innerHTML = scores[1]
                document.getElementById("oneOut").innerHTML = scores[2]
            } else if (player == "playerTwo") {
                let scores = getAllInputs(element.parentElement.parentElement)
                document.getElementById("twoTotal").innerHTML = scores[0]
                document.getElementById("twoIn").innerHTML = scores[1]
                document.getElementById("twoOut").innerHTML = scores[2]
            } else if (player == "playerThree") {
                let scores = getAllInputs(element.parentElement.parentElement)
                document.getElementById("threeTotal").innerHTML = scores[0]
                document.getElementById("threeIn").innerHTML = scores[1]
                document.getElementById("threeOut").innerHTML = scores[2]
            } else if (player == "playerFour") {
                let scores = getAllInputs(element.parentElement.parentElement)
                document.getElementById("fourTotal").innerHTML = scores[0]
                document.getElementById("fourIn").innerHTML = scores[1]
                document.getElementById("fourOut").innerHTML = scores[2]
            }
        })
    })
}
function updateTee() {
    const tee = document.getElementById("tee")
    tee.addEventListener("input", () => {
        uploadData()
    })
}
document.addEventListener("DOMContentLoaded", async function() {
    await uploadData()
    calculateScore()
    updateTee()
})