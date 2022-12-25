var data = {
    save: (key, value) => {
        return localStorage.setItem(key, value)
    },
    get: (key) => {
        if (localStorage.getItem(key) == "null" || !localStorage.getItem(key)) {
            return null
        }
        return localStorage.getItem(key) || null
    }
}

/*
1 - push
2 - pull
3 - shoulders
4 - core
5 - legs
6 - other
*/


var list = [
    "1Push up",
    "5Squat",
    "2Pull up",
    "2Chin up",
    "1Tricep dip",
    "1Bench",
    "3Lateral raise",
    "3Shoulder press",
    "2Any back exercise",
    "1Any tricep exercise",
    "4Any core exercise",
    "2Any forearm exercise",
    "5Any leg exercise",
    "2Any bicep exercise",
]

function addOne() {
    let exerc = document.getElementById("setname").value
    let intensity = parseInt(document.getElementById("intenzita").value || "3")
    let sets = parseInt(document.getElementById("sets").value || 1)
    if(!exerc || exerc == "null" || isNaN(intensity)) return
    data.save("exercise-"+exerc,  (intensity * sets)+parseInt(data.get("exercise-"+exerc) || 0))
    window.location.replace("./main.html")
}

function loadMain() {
    let ctx = document.getElementById("sets")
    let all = []
    for (var key in localStorage) {
        all.push([key,localStorage[key]])
    }
    all = all.filter(a => a[0].startsWith("exercise-"))

    list.forEach(e => {
        let value = Math.floor(parseInt(localStorage.getItem(
            "exercise-"+e.toLowerCase().split(" ").join("").substring(1)
        ) || 0) / 3)
        

        ctx.innerHTML+=`
        <div class="set ${(value) < 0.1 ? "nocolor" : ""} ${
            isNaN(e[0]) ? "color-def" : `color-${e[0]}`
        }">
        <div class="value ${(value) < 0.1 ? "no" : ""}">${value}</div>
        <div class="name ${(value) < 0.1 ? "no" : ""}">${e.substring(1)}</div>
        </div>
        `
    })
}

function loadAdd() {
    let setname = document.getElementById("setname")
    list.forEach(e => {
        setname.innerHTML+= `
        <option value="${e.toLowerCase().split(" ").join("").substring(1)}">${e.substring(1)}</option>
        `
    })
}
 
function reset() {
    if(window.confirm("Toto smaže celý tvůj progress! Jseš si jistý že chceš pokračovat?")) {
        for (var key in localStorage) {
            if(key.startsWith("exercise-")) {
                localStorage.removeItem(key)
            }
        }
        window.location.reload()
    }
}