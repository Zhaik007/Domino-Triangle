let b = 0;

let possiblecards= ["00","01","02","03","04","05","06","11","12","13","14","15","16","22","23","24","25","26","33","34","35","36","44","45","46","55","56","66"] 

let sandar = possiblecards.map((el)=>Number(el[0])+Number(el[1]))
let cardpair = []
let colpair = []

let copy = possiblecards
let cnt = 0 
for(let i =0;i<sandar.length;i++){
    for(let k = sandar.length;k>=0;k--){
        if(sandar[i]+sandar[k]==12){
            ((!(colpair.includes(copy[i])||cardpair.includes(copy[i])))&&(!(colpair.includes(copy[k])||cardpair.includes(copy[k]))))?(cardpair.push(copy[i]),colpair.push(copy[k])):console.log();
        }
    }
}

let dostypnie_cartochki = []

function chekcards(){
    dostypnie_cartochki = []
    let row = document.querySelector("#rows")
    let rowchilde = row.childNodes
    for (let i = 0;i<rowchilde.length;i++){
        let linepiece = [    ]
        for(let j=0;j<rowchilde[i].childNodes.length;j++){
            linepiece.push(rowchilde[i].childNodes[j].childNodes[0].getAttribute("draggable"))
        }
        dostypnie_cartochki.push(linepiece)
    }
}
setInterval(chekcards,1000)

function eraseline(){
    let row = document.querySelector("#rows")
    let rowchilde = row.childNodes
    for (let i = 0;i<rowchilde.length;i++){
        for(let j=0;j<rowchilde[i].childNodes.length;j++){
            if (rowchilde[i].childNodes[j].length==0 && rowchilde[i].childNodes[j+1].length==0){
                rowchilde[i-1].childNodes[j].classList.add("container")
            }
        }
    }
}
setInterval(eraseline,1000)


cardpair.push(colpair[colpair.length-1])
colpair.splice(colpair.length-1,1)
colpair.push(cardpair[4])

console.log(cardpair,colpair)

let pyramide = []
let index = 0;
let pirindex =[]

function random_card(i,ln){
    let bol = false
    if(i==ln-1){
        bol = true
    }
    let nomer =0
    nomer=Math.floor(Math.random() * cardpair.length);
    let card_shablon = `<div class="${bol==true?"container":""}" id="box${index}" datavalue="${index}"><div class="card2 ${bol==true?"":""}" draggable="" datavalue="${index}" chislo="${Number(cardpair[nomer][0])+Number(cardpair[nomer][1])}" style="background-image:url(img/card${cardpair[nomer]}.png);     background-size: cover;"></div> </div>`;
    cardpair.splice(nomer,1)
    index+=1
    return card_shablon
}

function generate_pyramide(ln = 4){
    let html = ``
    for(let i =0;i<ln;i++){
        let line = `<div class="lin" style=""  id="lin${i}">`;
        let indjoly = []
        for(let j=0;j<=i;j++){
            indjoly.push(index)
            let fishka = random_card(i,ln)
            line+= fishka
            asrr = fishka.split("img/")[1].slice(4,6)
            if(asrr.length==2){
                asrr = [Number(String(asrr)[0])+Number(String(asrr)[1])]
            }
            else{
                asrr = [Number(asrr)]
            }
            pyramide.push(asrr)
        }
        line+="</div>"
        pirindex.push(indjoly)
        html+=line
    }
    asr = document.querySelector("#rows")
    asr.innerHTML = html
    // shuffleArray(colpair)
    coloda.style.backgroundImage = "url(img/card"+colpair[0]+".png)"
    let kot = colpair[0]
    let chisl = Number(kot[0])+Number(kot[1]);
    coloda.setAttribute('chislo', chisl);
    console.log(chisl)
    document.querySelector("#coloda").chislo = `"${chisl}"`;
    console.log(coloda.chislo)
}

let draggable 
let containers 
let level = 5
let value =0
let btn = document.querySelector("#btn")
    btn.addEventListener("click", ()=>{generate_pyramide(level)
        btn.style.display = "none"
        document.querySelector("span").style.display = "none"
        document.querySelector(".drawing").style.display = "flex"
        tasovka()})
    function tasovka(){
        
        draggable = document.querySelectorAll(".draggable")
        containers = document.querySelectorAll(".container")
        
        containers.forEach(container => {
        container.addEventListener("dragover",(e)=>{
            e.preventDefault()
            container.classList.add("hovered")
        })

        container.addEventListener("dragleave",()=>{
            container.classList.remove("hovered")
        })
        
        container.addEventListener("drop",()=>{
            if(container.innerHTML!=""){
                card.parentElement.classList.remove("container")
                card.parentElement.classList.add("contana")


                draggable = document.querySelectorAll(".draggable")

                draggable.forEach(div=>{
                        let kot = div.style.backgroundImage
                        let chisl = Number(kot.slice(13,15)[0])+Number(kot.slice(13,15)[1]);
                        div.addEventListener("dragstart",()=>{
                            card = div
                            card.chislo = String(chisl)
                        })
                })
                console.log(container.childNodes[0],card)
                if(Number(container.childNodes[0].getAttribute("chislo")) + Number(card.getAttribute("chislo")) == 12){
                container.appendChild(card)
                container.removeChild(container.childNodes[0])
                // coin.removeChild(coin.childNodes[0])
                container.removeChild(container.childNodes[1])
                container.removeChild(container.childNodes[0])
                console.log(card.getAttribute("datavalue"))
                console.log(pyramide[Number(card.getAttribute("datavalue"))][0])
                console.log(pyramide[Number(container.getAttribute("datavalue"))][0])
                
                container.classList.remove("container")
                container.classList.add("contana")
                let kot = card.style.backgroundImage
                value = kot.slice(13,15)[0]+kot.slice(13,15)[1]
                indexer = cardpair.findIndex(fin)
                cardpair.splice(indexer,1)
                // coin.classList.remove("container")
                // coin.classList.add("contana")
            }}
            container.classList.remove("hovered")
            // coin.classList.remove("hovered")

            let ket = true
            ket = checkline()
            if(ket){
                level-=1
                pare = linee.parentElement
                console.log(pare.childNodes)
                pare.removeChild(linee)
                if (pare.childNodes.length == 0 ){
                    document.querySelector("#thegame").style.display="none";
                    document.querySelector("#win-panel").style.display="flex";
                }
                else{
                let newln = pare.childNodes[pare.childNodes.length-1]
                    for(el=0;el<newln.childNodes.length;el++){
                        console.log(newln.childNodes)
                        newln.childNodes[el].classList.add("container")
                        for(j=0;j<newln.childNodes[el].length;j++){
                            newln.childNodes[el].childNodes[j].setAttribute("draggable",true)
                            newln.childNodes[el].childNodes[j].classList.add("draggable")
                            console.log(newln)
                        }
                    }
                }
                tasovka()
            }
        })
    })
    }


function checkline(){
    let ket = true
    search = `#lin${level-1}`
    linee = document.querySelector(search)
    for(let i = 0;i <linee.childNodes.length;i++){
            if(linee.childNodes[i].childNodes.length>0){
                ket = false
        }
    }
    return ket
}

function contr(){
    containers = document.querySelectorAll(".container")
                containers.forEach(container => {
                    container.addEventListener("dragover",(e)=>{
                        e.preventDefault()
                        container.classList.add("hovered")})})
}

function fin(ele){
    return ele===value
}

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

let drawbtn = document.querySelector("#drawbtn")
drawbtn.addEventListener("click", takenext)

let drawnum = 0
let popytka = 0
let once = true
function takenext(){
    draggable = document.querySelectorAll(".draggable")
    containers = document.querySelectorAll(".container")
    draggable.forEach(div=>{
        let kot = div.style.backgroundImage
        let chisl = Number(kot.slice(13,15)[0])+Number(kot.slice(13,15)[1]);
        div.addEventListener("dragstart",()=>{
            card = div
            card.chislo = String(chisl)
        })
    })

    let current = document.querySelector("#current")
    let coloda = document.querySelector("#coloda")
    let curr = document.querySelector("#curr")
    if(once){
        // curr.removeChild(current)
        while (curr.firstChild) {
            curr.removeChild(curr.lastChild);
        }

        if(popytka<5){
            document.querySelector("#chances").innerHTML = `Доступные перетасовки ${4-popytka}`
            document.querySelector("#curr").appendChild(coloda)
            coloda.setAttribute("id","current")
            drawnum +=1
        if(drawnum == colpair.length){
            popytka += 1
            drawnum = 0 
        }
        let chisl = Number(colpair[drawnum][0])+Number(colpair[drawnum][1])
        document.querySelector("#coll").innerHTML = `<div class="card2 draggable" draggable="true" chislo="${chisl}" style="background-size:cover;background-image:url(img/card${colpair[drawnum]}.png)" id="coloda"> </div> `
        
    }
    else{
        document.querySelector("#curr").appendChild(coloda)
        once = false
    }
    }
}