// category HTML-element

const prisStatusOverskrift = document.getElementById("prisStatusOverskrift");
const lokalTotalTekst = document.getElementById("lokalTotalTekst");
const konkurrentTotalTekst = document.getElementById("konkurrentTotalTekst");



// category variablar

// Sortering av array på same måte som i oppgåve 1, MDN-referanse der
const lokalPrisArr = lagPrisArray().sort((a, b) => a - b);
const konkurrentPrisArr = lagPrisArray().sort((a, b) => a - b);


// category funksjonar

function lagPrisArray(lengde = 10, minPris = 1, maxPris = 1000) {

    // Lagar tom array
    const prisArr = [];

    // Legg til tilfeldige tal frå min til max lengde gongar
    for (let i = 0; i < lengde; i++) {
        const tilfeldigTall = Math.floor(Math.random() * maxPris) + minPris;
        prisArr.push(tilfeldigTall);
    }

    // Returnerer fullført array
    return prisArr;
}

function sammenlignPriser(lokal = lokalPrisArr, konkurrent = konkurrentPrisArr) {

    // Array med alle prisar kor den lokale er billigare enn konkurrenten
    const lokalBilligere = lokal.filter(pris =>{
        // Finn index av prisen vi ser på no
        prisIndex = lokal.indexOf(pris)
        return pris < konkurrent[prisIndex];       
    });

    // Finn andel der den lokale er billigare ved å dividere talet billigare på totalt tal prisar
    const andelLokalBilligere = lokalBilligere.length / lokal.length;

    return andelLokalBilligere;
}

function visPrisStatus(andelLokalBilligere = sammenlignPriser()) {
    prisStatusOverskrift.innerHTML = andelLokalBilligere < 0.6
        ? "Sett prisane ned meir."
        : "Bra jobba.";
    prisStatusOverskrift.innerHTML += ` ${andelLokalBilligere * 100}% av prisane våre er lågare.`;

    return;
}

function visTotal(eierArr, element, eiernavn = "Ein ukjend aktør sin") {

    // Summerer alt i eierArr
    const totalPris = eierArr.reduce((a, b) => a + b)

    // Set totalten inn i elementet
    element.innerHTML = `${eiernavn} totalpris er ${totalPris},-`;
}



// category Køyr program

visPrisStatus();
visTotal(lokalPrisArr, lokalTotalTekst, "Vår");
visTotal(lokalPrisArr, konkurrentTotalTekst, "Konkurrenten sin");