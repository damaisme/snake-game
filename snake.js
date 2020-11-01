const canvas = document.getElementById("gc")
const ctx = canvas.getContext('2d')
const score = document.getElementsByClassName("score")[0]
const highscore = document.getElementsByClassName("highscore")[0]
document.addEventListener('keydown',control)
interval = setInterval(game,1000/10)

const tombol = document.getElementsByClassName("control")[0]
if(window.innerWidth>800){
	tombol.style.display = "none"
	canvas.width = 600
	petak=30
}else{
	canvas.width = 300
	petak = 20
}

canvas.height = canvas.width

canvasW = canvas.width
ujung=canvasW/petak
ularX=ularY=10
arahX=arahY=0
apelX=apelY=Math.floor(Math.random()*ujung)
jejak=[]
ekor = 2
play=false
count = 0
high = 0

function kiri(){
	if (arahX != 1) {
		arahX = -1
		arahY = 0
	}
}
function atas(){
	if(arahY != 1){
		arahY = -1
		arahX = 0
	}
}
function kanan(){
	if (arahX != -1) {
		arahX = 1
		arahY = 0		
	}
	
}
function bawah(){
	if (arahY != -1){
		arahY = 1
		arahX = 0
	}
}

function control(event){
	switch(event.keyCode){
		// kiri
		case 37:
			kiri()
			break;
		// atas
		case 38:
			atas()
			break;
		// kanan
		case 39:
			kanan()
			break;
		// bawah
		case 40:
			bawah()
			break;
	}
}

function game(){
	ularX += arahX
	ularY += arahY

	// melebihi batas
	if(ularX<0){
		ularX = ujung-1
	}
	if (ularX>ujung-1) {
		ularX = 0
	}
	if (ularY<0) {
		ularY = ujung-1
	}
	if (ularY>ujung-1) {
		ularY = 0
	}
	// gambar background
	bg = []
	for(var i=0;i<ujung;i++){
		var row = []
		for(var j=0;j<ujung;j++){
			let background = (i%2 == 0  && j%2==1) || (i%2 == 1 && j%2==0)? '#1c4e6b' : '#133954'
                row.push({
                    background,
                    x: j * petak,
                    y: i * petak
                });
        }
        bg.push(row)
	}

	bg.forEach((row, rowIndex) => {
        row.forEach((col,colIndex) => {
            ctx.fillStyle = col.background;
            ctx.fillRect(col.x,col.y,petak,petak);
        })
    })

	// gambar ular
	for(var i=0;i<jejak.length;i++){
		ctx.beginPath()
		ctx.fillStyle="yellow"
		ctx.strokeStyle="white"
		ctx.rect(jejak[i].x*petak,jejak[i].y*petak,petak,petak)
		ctx.fill()
		ctx.stroke()
		ctx.closePath()
		// mati
		if(play==true && jejak[i].x==ularX && jejak[i].y==ularY){
			play=false
			ularX=ularY=10
			arahX=arahY=0
			apelX=apelY=15
			jejak=[]
			ekor = 2
			alert(`Your score: ${count}`)
			if(count>high){
				high = count
			}
			count = 0
		}
	}
	if(ekor==3){
		play = true
	}
	jejak.push({x:ularX,y:ularY})
	while(jejak.length>ekor){
		jejak.shift()
	}
	// makanan
	if (ularX==apelX && ularY==apelY) {
		ekor++
		count++
		apelX = Math.floor(Math.random()*ujung)
		apelY = Math.floor(Math.random()*ujung)
	}
	ctx.beginPath()
	ctx.fillStyle = "red"
	ctx.strokeStyle = "black"
	ctx.rect(apelX*petak,apelY*petak,petak,petak)
	ctx.fill()
	ctx.stroke()
	ctx.closePath()

	score.innerHTML = count
	highscore.innerHTML = high
}

