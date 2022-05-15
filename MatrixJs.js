let mainEntry = () => {
    let inAx = document.getElementById("inAx");
    let inAy = document.getElementById("inAy");
    let inBx = document.getElementById("inBx");
    let inBy = document.getElementById("inBy");
    let resetValue = () => { //입력값과 행렬창 리셋
        inAx.value = inAy.value = inBx.value = inBy.value = "";
        drawBoxA.innerHTML = drawBoxB.innerHTML = resultBox.innerHTML = "";
    }

    function drawB(selectId, selectrow, selectcolumn) {
        this.matX = document.getElementById(selectrow).value;
        this.matY = document.getElementById(selectcolumn).value;
        this.matSec = document.getElementById(selectId);
        this.matrixArray = [];
        this.newArray = [];
        this.matrixSet = function (selMethod, leftRow, rightColumn) {
            let i = 0;
            switch (selMethod) {
                case 'resetArray':
                    while (i < this.matY) {
                        this.matrixArray.push([]);
                        i++;
                    }
                    for (let j = 0; j < this.matY; j++) {
                        for (let k = 0; k < this.matX; k++) {
                            this.matrixArray[j][k] = 0;
                        }
                    }
                    break;
                case 'randomArray':
                    i = 0;
                    while (i < this.matY) {
                        this.matrixArray.push([]);
                        i++;
                    }
                    for (j = 0; j < this.matY; j++) {
                        for (k = 0; k < this.matX; k++) {
                            this.matrixArray[j][k] = Math.floor(Math.random() * 1000);
                        }
                    }
                    break;
                case 'multiply':
                    i = 0;
                    while (i < leftRow) {
                        this.matrixArray.push([]);
                        i++;
                    }
                    for (j = 0; j < leftRow; j++) {
                        for (k = 0; k < rightColumn; k++) {
                            this.matrixArray[j][k] = 0;
                        }
                    }
                    break;
            }

        }
        this.drawBox = function () {
            this.matSec.innerHTML = "";
            this.matSec.style.width = 500 + "px";
            this.matrixArray.forEach((rowValue, rowIndex) => {
                rowValue.forEach((colValue, colIndex) => {
                    this.matSec.innerHTML += '<input type="number" id = "' + selectId + rowIndex + colIndex + '"class = "boxDeco" value = "' + colValue + '" > ';
                });
                this.matSec.innerHTML += "<br>";
            });
        }
        this.resultSec = function (drawAbox, drawBbox, Operator, inAy) {
            this.newArray = [];
            let row = [];
            totalSum = 0;
            switch (Operator) {
                case "+":
                    for (let i = 0; i < this.matY; i++) {
                        row = [];
                        for (let j = 0; j < this.matX; j++) {
                            row.push(parseInt(document.getElementById(drawAbox + i + j).value) +
                                parseInt(document.getElementById(drawBbox + i + j).value));
                        }
                        this.newArray.push(row);
                    }
                    break;
                case "-":
                    for (let i = 0; i < this.matY; i++) {
                        row = [];
                        for (let j = 0; j < this.matX; j++) {
                            row.push(parseInt(document.getElementById(drawAbox + i + j).value) -
                                parseInt(document.getElementById(drawBbox + i + j).value));
                        }
                        this.newArray.push(row);
                    }
                    break;
                case "x":
                    for (let i = 0; i < this.matY; i++) {
                        row = [];
                        for (let j = 0; j < this.matX; j++) {
                            for (let k = 0; k < inAy; k++) {
                                totalSum +=
                                    parseInt(document.getElementById(drawAbox + i + k).value) *
                                    parseInt(document.getElementById(drawBbox + k + j).value);
                            }
                            row.push(totalSum);
                            totalSum = 0;
                        }
                        this.newArray.push(row);
                    }
                    break;
            }

            this.matSec.innerHTML = "";
            this.matSec.style.width = 1000 + "px";
            this.matrixArray.forEach((rowValue, rowIndex) => {
                rowValue.forEach((colValue, colIndex) => {
                    this.matSec.innerHTML +=
                        '<div id="' + selectId + rowIndex + colIndex + '"class="boxDeco2">' + this.newArray[rowIndex][colIndex] + '</div>';
                });
                this.matSec.innerHTML += "<br>";
            });
        }
    }
    this.addEventListener("click", (e) => {
        let inAx = parseInt(document.getElementById("inAx").value);
        let inAy = parseInt(document.getElementById("inAy").value);
        let inBx = parseInt(document.getElementById("inBx").value);
        let inBy = parseInt(document.getElementById("inBy").value);
        let boxA = new drawB("drawBoxA", "inAy", "inAx");
        let boxB = new drawB("drawBoxB", "inBy", "inBx");
        let resultBox = new drawB("resultBox", "inAy", "inAx");
        let resultMultiply = new drawB("resultBox", "inBy", "inAx");
        switch (e.target.id) {
            case 'drawB':
                boxA.matrixSet("resetArray");
                boxA.drawBox();
                boxB.matrixSet("resetArray");
                boxB.drawBox();
                break;
            case 'resetB':
                resetValue();
                break;
            case 'randomN':
                boxA.matrixSet("randomArray");
                boxA.drawBox();
                boxB.matrixSet("randomArray");
                boxB.drawBox();
                break;
            case 'plusB':
                if (inAy == inBy && inAx == inBx) {
                    resultBox.matrixSet("resetArray");
                    resultBox.resultSec("drawBoxA", "drawBoxB", "+");
                } else {
                    alert("A행렬과 B행렬의 크기가 같아야 합니다.");
                }
                break;
            case 'minusB':
                if (inAy == inBy && inAx == inBx) {
                    resultBox.matrixSet("resetArray");
                    resultBox.resultSec("drawBoxA", "drawBoxB", "-");
                } else {
                    alert("A행렬과 B행렬의 크기가 같아야 합니다.");
                }
                break;
            case 'multipB':
                if (inAy == inBx) {
                    resultMultiply.matrixSet("multiply", inAx, inBy);
                    resultMultiply.resultSec("drawBoxA", "drawBoxB", "x", inAy);
                } else {
                    alert("A의 열과 B의 행의 크기를 맞추고 시도해주세요!");
                }
                break;
        }
    });
}
onload = () => {
    mainEntry();
}