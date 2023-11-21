// First i'm gonna initialize a variables
let gridSize = prompt('Choose the side of your grid ! Example 10x10');
let enemyGridSize = prompt('Choose the side of your enemy grid !');
let myGrid = Grid(gridSize);
let enemyGrid = Grid(enemyGridSize);
let myShips = 3;
let enemyShips = 3;
let enemyLocation = {};
//here im declaring same number of ships


// here we are printing in the enemyGrid we are transfering boolean
//because at the function below printGrid we have put it as false so now is true

printGrid(enemyGrid, true);
printGrid(myGrid);
// game set up loop
for (let i = 1; i < 4; i++)
{
    let x = prompt('Enter the x coordinate for your ship' + i);
    let y = prompt('Enter the y coordinate for your ship' + i);
    placeChar (x, y, 'A' , myGrid);
    placeRandomChar('A', enemyGrid, enemyGridSize);
    drawBreak();
    printGrid(enemyGrid, true);
    printGrid(myGrid);
}
// we want to play game while we have ships or enemy have ships
while (enemyShips > 0 && myShips > 0){
    let x = prompt('Enter the x coordinate for your attack');
    let y = prompt('Enter the y coordinate for your attack');
    if(attack(x,y,enemyGrid)){
        enemyShips--;
    }
    x = getRandom(gridSize);
    y = getRandom(gridSize);
    if (enemyShips > 0 && attack(x,y,myGrid)){
        myShips--;
    }
    drawBreak();
    printGrid(enemyGrid, true);
    printGrid(myGrid);
}

if (myShips < enemyShips){
    console.log('We lose it come on we are bad');
}else{
    console.log('WE WON THAT IS HOW WE DO IT');
}

// function Grid is making us to create our grid and the grid of enemy
function Grid(size)
{
    let grid = [];
    for (let i = 0; i < size ; i++){
        grid[i]= [];
        for (let j =0; j < size; j++){
            grid[i][j] = '-';
        }
    }

    return grid;
}

//  here we gonna pass the grid and the boolean parametar  so the function
// would be for printing out the grid
// if is enemy in the if we are making logic to not show us
// after that we have else when is not an enemy or its enemy but ship is not there
// we will just print -  with empty spaces.

function printGrid(grid, isEnemy = false)
{
    let header = createHeader(grid.length);
    console.log(header);
    for (let i = 0; i < grid.length; i++){
        let rowStr = i+ ' ';
        for (let space of  grid[i]){
            if(isEnemy && space === 'O'){
                rowStr += '- ';
            }else {
                rowStr += space + '  ';
            }
        }
        console.log(rowStr);
    }
}

function createHeader(size)
{
    let result = '  ';
    for(let i = 0; i < size; i++)
    {
        result +=i + ' ';
    }
    return result;
}

// where we wanna place the char on the grid
function placeChar(x, y, c, grid)
{
    grid[x][y] = c;
}

//function for random character position the ships
//here we are handling the grid max, we are handling that
// pc don't need to place at the same spot his ship
function placeRandomChar(c, grid, max)
{
    let compPlace = false;
    while(!compPlace){
        let x = getRandom(max);
        let y = getRandom(max);
        if (!enemyLocation[`${x}-${y}`]){
            placeChar(x,y,c, grid);
            // if is true is not gonna allow computer to put
            // another ship in that same space so the game wont crush
            compPlace = true;
            enemyLocation[`${x}-${y}`] = true;
        }
    }
}


// getRandom is doing simple math taking the max value
// giving us a random integer between 0 and the max grid
// for example if we input 3 it will go 0 to 2
function getRandom(max)
{
    return Math.floor(Math.random() * Math.floor(max));
}

//attack function is going to determinate if the attack is hit
// or the attack is miss

function attack(x,y,grid)
{
    if (grid[x][y] === 'A'){
        grid[x][y] ='!';
        return true;
    }else if (grid[x][y] === '-'){
        grid[x][y] = 'x';
        return false;
    }else{
        return false;
    }
}

function drawBreak(){
    console.log('//////////////////////////////////////////////////');
}
