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
    /**
    * docstring
    * -> Lagar ein array med tilfeldige "prisar" (tal min-max).
    * -> Returnerer array.
    
    * -> Args:
    * -> 	lengde (number): Talet prisar i arrayen.
    * ->                     Default: 10
    * -> 	minPris (number): Den minste prisen mogleg (inklusiv).
    * ->                     Default: 1
    * -> 	maxPris (number): Den største prisen mogleg (eksklusiv).
    * ->                     Default: 1000
    
    * -> Base variables:
    * -> 	prisArr (array): Array med tilfeldige prisar.
    
    * -> Returns:
    * -> 	prisArr
    */

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
    /**
    * docstring
    * -> Samanliknar to arrayar med prisar.
    * -> Returnerer andelen (i desimal) der lokal er billigare enn konkurrent.
    * -> Merk at funksjonen berre er testa med arrays som er like lange.
    
    * -> Args:
    * -> 	lokal (array): Den "lokale" sine prisar.
    * ->                   Andelen av denne som er billigare vert returnert.
    * ->                   Default: lokalPrisArr.
    * -> 	konkurrent (array): "Konkurrenten" sine prisar.
    * ->                   Default: konkurrentPrisArr.
    
    * -> Base variables:
    * -> 	lokalBilligere (array): Array med alle prisar frå lokal der lokal er billigast.
    * ->                            Brukast til å rekne ut andelLokalBilligere.
    * ->    andelLokalBilligere (number): Andel der lokal er billigare enn konkurrent (i desimal).
    
    * -> Returns:
    * -> 	andelLokalBilligere
    */

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
    /**
    * docstring
    * -> Tek inn andel der lokal er billigare (desimal).
    * -> Viser informasjon om prissituasjonen på nettsida.
    
    * -> Args:
    * -> 	andelLokalBilligere (number): Andel der lokal er billigare (desimal)
    * ->                                  Default: sammenlignPriser()

    * -> Returns:
    * -> 	undefined
    */
    
    prisStatusOverskrift.innerHTML = andelLokalBilligere < 0.6
        ? "Sett prisane ned meir."
        : "Bra jobba.";
    prisStatusOverskrift.innerHTML += ` ${andelLokalBilligere * 100}% av prisane våre er lågare.`;

    return;
}

function visTotal(eierArr, element, eiernavn = "Ein ukjend aktør sin") {
    /**
    * docstring
    * -> Tek inn informasjon om ein eigar.
    * -> Viser den totale prisen i butikken til eigaren.
    
    * -> Args:
    * -> 	eierArr (array): Prisar for den aktuelle eigaren.
    * ->    element (HTML-element): Elementet på nettsida som skal vise totalen til den aktuelle eigaren.
    * ->    eiernavn (string): Navnet på eigaren.
    * ->                       Visast på nettsida, sjekk formulering for å få grammatisk korrekt.
    
    * -> Base variables:
    * -> 	totalPris (number): Summen av alle element i eierArr.
    * ->                        - Den totale prisen til den aktuelle eigaren.
    
    * -> Returns:
    * -> 	undefined
    */
    
    // Summerer alt i eierArr
    const totalPris = eierArr.reduce((a, b) => a + b)

    // Set totalten inn i elementet
    element.innerHTML = `${eiernavn} totalpris er ${totalPris},-`;

    return;
}



// category Køyr program

visPrisStatus();
visTotal(lokalPrisArr, lokalTotalTekst, "Vår");
visTotal(lokalPrisArr, konkurrentTotalTekst, "Konkurrenten sin");