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
    const yardage = document.getElementById("yardage")
    const handicap = document.getElementById("handicap")
    const par = document.getElementById("par")
    const data = await getCourseData("https://exquisite-pastelito-9d4dd1.netlify.app/golfapi/course11819.json")
    console.log(data)
    for (let i in data.holes) {
        const yardageElement = document.createElement("td")
        const handicapElement = document.createElement("td")
        const parElement = document.createElement("td")
        yardageElement.textContent = data.holes[i].teeBoxes[0].yards
        handicapElement.textContent = data.holes[i].teeBoxes[0].hcp
        parElement.textContent = data.holes[i].teeBoxes[0].par
        par.appendChild(parElement)
        yardage.appendChild(yardageElement)
        handicap.appendChild(handicapElement)
    }
}
document.addEventListener("DOMContentLoaded", ()=> {
    uploadData()
})