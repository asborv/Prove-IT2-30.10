// category HTML-element

const angripLandKnapp = document.getElementById("angripLandKnapp");
const angripPersonKnapp = document.getElementById("angripPersonKnapp");
const utsagnOverskrift = document.getElementById("utsagnOverskrift");



// category variablar

// *.map-metodane ordnar teiknsetjing

// Personar å angripe
const personArr = [
    {navn: "Hillary", kjonn: "f"},
    {navn: "Obama", kjonn: "m"},
    {navn: "Xi Jinping", kjonn: "m"},
    {navn: "Bent Høie", kjonn: "m"},
    {navn: "Elon Musk", kjonn: "m"},
    {navn: "Tim Apple", kjonn: "m"},
    {navn: "Sleepy Joe", kjonn: "m"},
];

// Grunnar til å angripe ein person
const personGrunnArr = [
    "uses light mode",
    "looks like Winnie the Pooh",
    "spreads fake news",
    "makes Thunberg seem nice",
    "shold be deported",
]
.map(tekst => `${tekst}.`);

// Land å angripe
const landArr = [
    "Mexico",
    "China",
    "Russia",
    "Sweden",
    "North Korea",
    "Brazil"
];

// Grunnar til å angripe eit land
const landGrunnArr = [
    "They are poor",
    "They aren't American",
    "Trump Tower ain't there",
    "They are asking to be annexed"
]
.map(tekst => `${tekst}.`);

// Påstandar om Twitter-offer
// *Merk at påstandane brukast mot både personar og land
const paastandArr = [
    "is stupid",
    "makes me sick",
    "deprives me of hope for humanity",
    "is a disgrace",
]
.map(tekst => `${tekst}!`);



// category funksjonar

function velgTilfeldigFraArr(arr) {
    /**
    * docstring
    * -> Tek inn array.
    * -> Returnerer tilfeldig objekt frå array (ved tilfeldig indeks)
    
    * -> Args:
    * -> 	arr (array): Arrayen ein skal velje frå
    
    * -> Base variables:
    * -> 	max (number): Lengden på arrayen, den maksimale indeksen å velje tilfeldig frå.
    * ->                  Merk at arr[max] vil gå utfor gyldig indeks.
    * ->                  Ved bruk av Math.floor() og Math.random() vert tal opp til (eksklusiv) max brukt.
    * ->    tilfeldigIndex (number): Tilfeldig indeks i arr.
    * ->                             Grunna måten max vert laga, er tilfeldigIndex alltid ein gyldig indeks i arr.
    
    * -> Returns:
    * -> 	arr[tilfeldigIndex] (any): Objektet på index tilfeldigIndex.
    */
    
    // Finn maksimal indeks å leite ved
    const max = arr.length;
    const TilfeldigIndex = Math.floor(Math.random() * max);

    // Finn tilfeldig element i arr
    return arr[TilfeldigIndex];
}

function angrip(e) {
    /**
    * docstring
    * -> Konstruerer tilfeldig Twitter-angrep på ein person eller eit land.
    * -> Viser angrepet på nettsida.
    
    * -> Args:
    * -> 	e (event): 
    
    * -> Base variables:
    * -> 	maal (str): Informasjon om kva/kven som skal angripast.
    * ->                Brukast til å velje kvar utsegna skal hentast frå.
    * ->                Default: e.target.name (viktig at knapp har gyldig name-attributt)
    * ->    utsagnArr (array): Inneheld dei ulike delane av utsegnet, i rekkefølgd.
    * ->                       Vert sett saman når dei ulike delane er på plass.
    * ->    utsagnStr (str): Ferdig konstruert utsegn.
    
    * -> Returns:
    * -> 	undefined
    */
    
    // Initielle verdiar
    const maal = e.target.name;
    const utsagnArr = [];

    // Påstanden er lik for land og person
    utsagnArr[1] = velgTilfeldigFraArr(paastandArr);

    // Brukar målet til å slå fast kva namn og årsak som skal leggjast til den komplette påstanden
    switch (maal) {
        case "person":
            // Finn person-objektet å angripe
            const person = velgTilfeldigFraArr(personArr);
            utsagnArr[0] = person.navn;
            utsagnArr[2] = `${person.kjonn === "m" ? "He" : "She"} `;
            utsagnArr[3] = velgTilfeldigFraArr(personGrunnArr);
            break;
        case "land":
            utsagnArr[0] = velgTilfeldigFraArr(landArr);
            utsagnArr[2] = velgTilfeldigFraArr(landGrunnArr);
            break;
        default:
            // Dersom e.target.name ikkje er definert i cases over.
            const problem = "What's this?? I can't insult this target!";
            utsagnOverskrift.innerHTML = problem;
            throw new Error(problem);
    }

    // Set saman til string
    const utsagnStr = utsagnArr.join(" ");

    // Viser på nettsida
    utsagnOverskrift.innerHTML = utsagnStr;

    return;
}


// category event listeners

angripLandKnapp.addEventListener("click", angrip);
angripPersonKnapp.addEventListener("click", angrip);
