const generate_random_matrix = (rows, columns) => {
    const matrix = new Array(rows).fill(0).map(() => new Array(columns).fill(0));    

    for(let i = 0;i < rows;i++){
        for(let j = 0;j < columns;j++){
            let num = Math.random()
            if(num <= 0.5) matrix[i][j] = 0;
            else if(num <= 0.9) matrix[i][j] = 1;
            else matrix[i][j] = 2;
        }
    }
    return matrix
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
            queue.push({
                "x": X,
                "y": Y
            })
        }

    }

    let maximum_time = Number.MIN_SAFE_INTEGER

    for(let i = 0;i < rows;i++){
        for(let j = 0;j < columns;j++){
            if(matrix[i][j] == 1){
                if(maximum_time < time_matrix[i][j]) maximum_time = time_matrix[i][j]
            }
        }
    }

    // console.log(time_matrix)

    if(maximum_time === Number.MAX_SAFE_INTEGER) return "The entire population was not infected because of social distancing"
    return `The minimum time taken to infect the entire population is ${maximum_time}`
}

const solve = (rows, columns) => {
    const matrix = generate_random_matrix(rows, columns)
    let queue = []

    for(let i = 0;i < rows;i++){
        for(let j = 0;j < columns;j++){
            if(matrix[i][j] == 2){
                queue.push({
                    "x": i,
                    "y": j
                })
            }
        }
    }

    console.log(matrix)
    console.log(maximum_time_to_infect(matrix, queue))
}

solve(7, 5)