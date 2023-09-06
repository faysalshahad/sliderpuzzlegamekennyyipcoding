let rows = 3, columns = 3, turns = 0, currentTile, otherTile,
//imageOrder = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
imageOrder = ["4", "2", "8", "5", "1", "6", "7", "9", "3"];

window.onload = startGame();

function startGame() {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            /**Creating an image tag */
            let tile = document.createElement("img");
            /**The image tag id will "0"-"0","0" -"1"..... "2"-"0", "2"-"1"..*/
            tile.id = r.toString() + "-" + c.toString();
            /**Shift will take the first element of the array. */
            tile.src = "./image/" + imageOrder.shift() + ".jpg";

        /**Adding drag and drop functionalities. */
        /**Click and start dragging an image */
        tile.addEventListener("dragstart", dragStart);
        /**Dragging an image over. */
        tile.addEventListener("dragover", dragOver);
        /**Dragging an image and start entering into another image */
        tile.addEventListener("dragenter", dragEnter);
        /**Dragging an image and leaving with image without having an 
         * actual swap */
        tile.addEventListener("dragleave", dragLeave);
        /**Dragging and start dripping an image onto another image */
        tile.addEventListener("drop", dragDrop);
        /**Dropping the image onto another image and finally leaving 
         * the area after completing the swap. */
        tile.addEventListener("dragend", dragEnd);

            /**We will insert tile inside the game board. */
            document.getElementById("board").append(tile);
        }
        
    }
}

/**Dragging the tile */
function dragStart() {
    /**this refers to the image that you are dragging right now. */
    currentTile = this;
}

function dragOver(e) {
    e.preventDefault();
}

function dragEnter(e) {
    e.preventDefault();
}

function dragLeave() {
    
}

function dragDrop() {
    /**this refers to the existing image which we have 
     * swapped with the currentTile image */
    otherTile = this;
}

function dragEnd() {
    if (!otherTile.src.includes("3.jpg")) {
     return;
     }
    
    /**for an example "0"-"0". This the split function will give us 
     * ["0", "0"]*/
    let currentCoordinates = currentTile.id.split("-");
    let r1 = parseInt(currentCoordinates[0]);
    let c1 = parseInt(currentCoordinates[1]);

     /**for an example "0"-"0". This the split function will give us 
     * ["0", "0"]*/
     let otherCoordinates = otherTile.id.split("-");
     let r2 = parseInt(otherCoordinates[0]);
     let c2 = parseInt(otherCoordinates[1]);

    /**Checking for adjacency between the tiles if they are next to
     * each other or not.*/
    let moveLeft = r1 == r2 && c2 == c1 - 1;
    let moveRight = r1 == r2 && c2 == c1 + 1;
    let moveUp = c1 == c2 && r2 == r1 - 1;
    let moveDown = c1 == c2 && r2 == r1 + 1;

    let isAdjacent = moveLeft || moveRight || moveUp || moveDown;

    if (isAdjacent) {
        let currentImage = currentTile.src;
    let otherImage = otherTile.src;
    currentTile.src = otherImage;
    otherTile.src = currentImage; 

    turns += 1;
    document.getElementById("turns").innerText = turns;
    }

}