// category HTML-element

const smittetallInput = document.getElementById("smittetall");
const registrerSmitteKnapp = document.getElementById("registrerSmitteKnapp");
const smitteListe = document.getElementById("smitteListe");
const smitteStatusOverskrift = document.getElementById("smitteStatusOverskrift");
const smitteTotalTekst = document.getElementById("smitteTotal");



// category variablar

const smitteArr = [];



// category funksjonar

function regisrerSmitte(e) {
    /**
    * docstring
    * -> Tek smittetalet som brukaren skriv inn.
    * -> Legg talet til smitteArr
    
    * -> Args:
    * -> 	e (event)
    
    * -> Base variables:
    * -> 	dagensSmitteTall (number): Talet for smitta i dag som brukaren skriv inn.
    
    * -> Returns:
    * -> 	dagensSmitteTall 
    */
    
   
    const dagensSmitteTall = Number(smittetallInput.value); // todo fiks for når value = e osv

    // Tømmer input-feltet
    smittetallInput.value = "";

    // Fokuserer på input-feltet, slik at ein kan skrive igjen med ein gong
    smittetallInput.focus();

    // Legg til nytt smittetal i smitteArr
    smitteArr.push(dagensSmitteTall);
    return dagensSmitteTall;
}

function oppdaterTotal() {
    /**
    * docstring
    * -> Reknar ut det totale smittetalet.
    * -> Viser det totale smittetalet.
    
    * -> Base variables:
    * -> 	name (total): Det totale smittetalet
    
    * -> Returns:
    * -> 	null
    */
    

    // Summerer smitta for alle dagar
    const total = smitteArr.reduce((a, b) => a + b);

    // Viser totalt smitta
    smitteTotalTekst.innerHTML = `Smitta totalt: ${total}`;

    return;
}

function oppdaterSmitteListe(e) {

    // Set dagens smittetal og ordnar med smitteArr
    const dagensSmitteTall = regisrerSmitte();

    // Oppdaterer total
    oppdaterTotal()
    
    // Legg til dagens smitte i lista på nettsida
    smitteListe.innerHTML += `<li>${dagensSmitteTall}</li>`;

    return;
}

function vurderSmitte() {

    // Deklarerer smitteStatus med datatype
    let smitteStatus = "";

    // Returnerer dersom det ikkje er nok data
    if (smitteArr.length < 3) {
        smitteStatus = "utilstrekkelig data";
        return smitteStatus;
    }
    
    // Smitte i aktuelt tidsrom (siste 3)
    // link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice
    const aktuelSmitte = smitteArr.slice(smitteArr.length - 3, smitteArr.length);

    
    // Sorterte arrays i stigande og synkande rekkjefølge
    // link https://stackoverflow.com/questions/9592740/how-can-you-sort-an-array-without-mutating-the-original-array
    // link https://www.javatpoint.com/javascript-array-reverse-method
    const stigandeSmitteArr = [...aktuelSmitte].sort();
    const synkandeSmitteArr = [...aktuelSmitte].sort().reverse(); // Her skjer det noko merkeleg med tosifra tal som eg ikkje klarer å debugge. Type er number. Ser ut til å berre sortere fyrste siffer.
    
    // Dersom den originale smitten er lik den sorterte smitten, er smitten stigande eller synkande
    // link https://stackoverflow.com/questions/7837456/how-to-compare-arrays-in-javascript

    switch (JSON.stringify(aktuelSmitte)) {
        case JSON.stringify(stigandeSmitteArr):
            smitteStatus = "stigende"
            break;
        case JSON.stringify(synkandeSmitteArr):
            smitteStatus = "synkende";
            break;
        default:
            smitteStatus = "ubestemt";
    }

    return smitteStatus;
}

function setStatusStil(e, status = vurderSmitte()) {
    
    // Definerer variablar til å endrast
    let beskjed = "";
    let bakgrunnsFarge = "";
    let tekstFarge = ""
    
    // Set variablar basert på status
    switch (status) {
        case "utilstrekkelig data":
            beskjed = "Ikkje godt nok datagrunnlag. Sei du er ny i jobben.";
            bakgrunnsFarge = "grey";
            tekstFarge = "black"
            break;
        case "stigende":
            beskjed = "Pass på i dag, lokalavisa kjem til å grille deg.";
            bakgrunnsFarge = "red";
            tekstFarge = "white"
            break;
        case "synkende":
            beskjed = "Ta det med ro i dag, skryt av eigen innsats.";
            bakgrunnsFarge = "green";
            tekstFarge = "white"
            break;
        case "ubestemt":
            beskjed = "Ingen mønster å spore i smitte. Opptre irrasjonelt, snakk det bort.";
            bakgrunnsFarge = "yellow";
            tekstFarge = "black"
            break;

    }

    // Endre stil
    smitteStatusOverskrift.innerHTML = beskjed;
    document.body.style.backgroundColor = bakgrunnsFarge;
    document.body.color = tekstFarge;
    
    return;
}



// category event listeners

registrerSmitteKnapp.addEventListener("click", oppdaterSmitteListe);
registrerSmitteKnapp.addEventListener("click", setStatusStil); //! fjern



// category debugging
