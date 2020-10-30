// category HTML-element

const angripLandKnapp = document.getElementById("angripLandKnapp");
const angripPersonKnapp = document.getElementById("angripPersonKnapp");
const utsagnOverskrift = document.getElementById("utsagnOverskrift")


// category variablar

const personArr = ["Hillary", "Obama"];
const personGrunnArr = ["(s)he wears glasses.", "(s)he uses light mode."];

const landArr = ["Mexico", "China", "Russia"];
const landGrunnArr = ["they are poorer than us.", "they aren't American."];

// Påstandane kan brukast på både personar og land
const paastandArr = ["is stupid!", "makes me sick!"];


// category funksjonar

function velgTilfeldigFraArr(arr) {
    
    const max = arr.length;
    const TilfeldigIndex = Math.floor(Math.random() * max);

    return arr[TilfeldigIndex];
}

function angrip(e) {

    const maal = e.target.name;
    const utsagnArr = []

    utsagnArr[1] = velgTilfeldigFraArr(paastandArr);

    switch (maal) {
        case "person":
            utsagnArr[0] = velgTilfeldigFraArr(personArr);
            utsagnArr[2] = velgTilfeldigFraArr(personGrunnArr);
            break;
        case "land":
            utsagnArr[0] = velgTilfeldigFraArr(landArr);
            utsagnArr[2] = velgTilfeldigFraArr(landGrunnArr);
            break;
        default:
            throw Error("What's this?? I can't insult this target!");
    }

    
    const utsagnStr = utsagnArr.join(" ");

    utsagnOverskrift.innerHTML = utsagnStr;

    return;
}


// category event listeners

angripLandKnapp.addEventListener("click", angrip)
angripPersonKnapp.addEventListener("click", angrip)
