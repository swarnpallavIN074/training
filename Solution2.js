
function numberOfPaths(m, n) {
    let matrix = [];

    for (let i = 0; i < m; i++) {
        let subMatrix = [];
        for (let j = 0; j < n; j++) {
            if (i == 0 || j == 0)
                subMatrix.push(1);
            else
                subMatrix.push(0);
        }
        matrix.push(subMatrix);
    }
    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++)
            matrix[i][j] = matrix[i][j - 1] + matrix[i - 1][j];
    }
    return matrix[m-1][n-1];
}

console.log(numberOfPaths(2, 3));