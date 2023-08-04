let horseNames = [];
let horsePositions = [];
let horseFinishTimes = [];
let horseColors = ['red', 'blue', 'green', '#202020', 'orange', 'purple', 'brown', 'pink', 'cyan', 'magenta', '#202020', 'black'];

document.getElementById('startButton').addEventListener('click', () => {
    let numHorses = document.getElementById('numHorses').value;
    if (numHorses > 12) {
        alert('The maximum number of horses is 12.');
        return;
    }
    startRace(numHorses);
});

function startRace(numHorses) {
    document.getElementById('raceArea').style.height = (numHorses * 100) + 'px';
    for (let i = 0; i < numHorses; i++) {
        let horseName = prompt("Enter name for horse " + (i+1));
        horseNames.push(horseName);
        let horseDiv = document.createElement('div');
        horseDiv.classList.add('horse');
        horseDiv.id = 'horse' + i;
        horseDiv.style.top = (i * 100) + 'px';
        
        // Create the img tag and set the source to the SVG file
        let horseImg = document.createElement('img');
        horseImg.src = './horse.svg';
        horseDiv.appendChild(horseImg);
        
        let horseP = document.createElement('p');
        horseP.style.backgroundColor = "#FFFFFF";
        horseP.style.color = horseColors[i];
        horseP.textContent = horseName;
        horseDiv.appendChild(horseP);

        document.getElementById('raceArea').appendChild(horseDiv);
        horsePositions[i] = 0;
    }

    let raceInterval = setInterval(() => {
        for (let i = 0; i < numHorses; i++) {
            horsePositions[i] += Math.random() * 10;
            document.getElementById('horse' + i).style.left = horsePositions[i] + 'px';
            if (horsePositions[i] >= document.getElementById('raceArea').offsetWidth - 50) {
                horseFinishTimes[i] = new Date().getTime();
            }
        }
        
        if (horsePositions.every(pos => pos >= document.getElementById('raceArea').offsetWidth - 50)) {
            clearInterval(raceInterval);
            alertFinishOrder();
        }
    }, 100);
}

function alertFinishOrder() {
    let horseOrder = horseNames
        .map((name, i) => ({ name: name, finishTime: horseFinishTimes[i] }))
        .sort((a, b) => a.finishTime - b.finishTime)
        .map((horse, i) => `#${i + 1}: ${horse.name}`)
        .join('\n');
    
    alert('The race is over! The order is:\n' + horseOrder);
}
