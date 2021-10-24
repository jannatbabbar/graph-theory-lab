import { useState } from "react";
const GTmain = () => {

    const [displaySt,setDisplaySt] = useState("");
    const [matrix, setMatrix] = useState([[]]);
    const [showbtn,setShowbtn] = useState(false);
    
    const generate_random_matrix = (rows, columns) => {
        const matrix = new Array(rows).fill(0).map(() => new Array(columns).fill(0));    
    
        for(let i = 0;i < rows;i++){
            for(let j = 0;j < columns;j++){
                let num = Math.random()
                if(num <= 0.40) matrix[i][j] = 0;
                else if(num <= 0.80) matrix[i][j] = 1;
                else matrix[i][j] = 2;
            }
        }
        setMatrix(matrix);
        setShowbtn(true);
        setDisplaySt("click button to view the answer");
    }
    
    const maximum_time_to_infect = (matrix, queue) => {
        if(queue.length === 0) return "No infected people in the neighbourhood!!"
    
        const dx = [1, 0, -1, 0];
        const dy = [0, 1, 0, -1];
    
        const [rows, columns] = [matrix.length, matrix[0].length]
        let time_matrix = new Array(rows).fill(Number.MAX_SAFE_INTEGER).map(() => new Array(columns).fill(Number.MAX_SAFE_INTEGER));  
    
        for(let i = 0;i < queue.length;i++){
            time_matrix[queue[i]["x"]][queue[i]["y"]] = 0
        }
    
        while(queue.length > 0){
    
            const [x, y] = [queue[0]["x"], queue[0]["y"]]
            queue.shift();
    
            for(let p = 0;p < 4;p++){
                let X = x + dx[p];
                let Y = y + dy[p];
    
                if(X < 0 || Y < 0 || X >= rows || Y >= columns) continue;
    
                if(matrix[X][Y] !== 1) continue;
                if(time_matrix[X][Y] !== Number.MAX_SAFE_INTEGER) continue;
    
                time_matrix[X][Y] = time_matrix[x][y] + 1;
                matrix[X][Y] = 3;
                queue.push({
                    "x": X,
                    "y": Y
                })
            }

            
            // setTimeout(() => {console.log("Triggered")}, 3000);
        }
        setMatrix(matrix);
        let maximum_time = Number.MIN_SAFE_INTEGER

        let healthyPersons = 0;
        let infected = 0;
    
        for(let i = 0;i < rows;i++){
            for(let j = 0;j < columns;j++){
                if(matrix[i][j] == 1 || matrix[i][j] == 3){
                    if(maximum_time < time_matrix[i][j]) maximum_time = time_matrix[i][j]
                    healthyPersons += 1;
                    infected += (time_matrix[i][j] !== Number.MAX_SAFE_INTEGER && matrix[i][j] == 3);
                }
            }
        }
    
        console.log(time_matrix)
    
        if(maximum_time === Number.MAX_SAFE_INTEGER) return `The entire population was not infected because of social distancing. A total of ${infected} people were infected`

        let entity = null;
        if(maximum_time === 1){
            entity = "week";
        }
        else{
            entity = "weeks"
        }
    

        return `The minimum time taken to infect the entire population is ${maximum_time} ${entity}.`
    }
    
    // let matrix1 = [[]];
    // let displaySt = "";
    const solve = (rows, columns) => {
        
        // matrix1 = matrix;
        let queue = []
        let copyMatrix = new Array(rows).fill(0).map(() => new Array(columns).fill(0)); 
        
    
        for(let i = 0;i < rows;i++){
            for(let j = 0;j < columns;j++){
                copyMatrix[i][j] = matrix[i][j];
                if(matrix[i][j] == 2){
                    queue.push({
                        "x": i,
                        "y": j
                    })
                }
            }
        }
        console.log(matrix)
        setDisplaySt(maximum_time_to_infect(copyMatrix, queue));
        console.log(displaySt);
    }
    
    // const matrix = generate_random_matrix(7,3);
    const arr=[];
    let ind = 0;
    for(let k=0;k<matrix.length;k++){
        for(let j = 0;j<matrix[k].length;j++){
            arr[ind]=matrix[k][j];
            ind++;
        }
    }
    // const handleSquare = (index)=>{
    //     const arr1 = [arr];
    //     arr1[index] = 2;
    //     setArr(arr1);
    //     console.log(arr);
    // }
    // // const returnColor = (item) =>{
        
    // //     if(item===1) return "green";
    // //     else if(item === 2) color = "red";
    // //     else color = "white";

    //     return color; 
    // }

    
    return ( 
        <div className="mainContainer">
            <div>
                <h1 className="mainHeading">MULTISOURCE BFS TO VISUALISE COVID SPREAD</h1>
            </div>
            <div>
                <h5 className = "info" >
                This is a covid spread visualiser, where we have created a grid of squares. The red ones denote infected patients, green denotes a healthy person and white denotes an empty space between them. The virus can spread from an infected person to a healthy person if they are next to each other(not including diagonals). We aim at calculating the total number of people which can be infected, and how much time it takes to infect them, assuming that it takes 1 week to transfer the virus from 1 person to another.
                </h5>
                <div className="clrbtn">
                    <div className = "colorcontain">
                        <div className="colors">
                            <div className="redsq"></div>
                            <h6 className="patient">Infected Patients</h6>
                        </div>
                        <div className="colors">
                            <div className="greensq"></div>
                            <h6 className="patient">Healhty People</h6>
                        </div>
                        <div className="colors">
                            <div className="whitesq"></div>
                            <h6 className="patient">Empty Space</h6>
                        </div>
                    </div>
                    <button className = "btn createbtn" onClick={() => generate_random_matrix(4,7)}>CREATE MATRIX</button>
                </div>
            </div>
            
            <div className="container"> 
            
            {  
            // () => traverse()
                arr.map((item,index)=>{
                    let color = "black";
                    if(item===1) color= "#70AF85";
                    else if(item === 2) color = "#FF7171";
                    else if(item === 0) color = "#FEF5ED";
                    else color = "#FBC687";

                    // count += 1
                    return(
                        <div className="container1">
                            <div style = {{backgroundColor: color}} className="square" >
                            </div>
                        </div>
                        )
                    })
            }
                <div>
                    <div>
                        { showbtn &&<button className="btn resbtn" onClick = {() => solve(4,7)}>GIVE RESULT</button>}
                    </div>
                    
                    <h5 className="info">{displaySt}</h5>
                    <div className = "space">
                        {/* <h1>hello</h1> */}
                    </div>
                </div>
            </div>
        </div>        
    );
}
 
export default GTmain;


