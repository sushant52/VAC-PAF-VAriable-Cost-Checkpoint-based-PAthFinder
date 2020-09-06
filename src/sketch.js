let width = 700;
let height = 700;
let size = 60;
let start;
let end;
let grid = [];
let type = 0;

function ss(node) {
	return node.f;
}

class node {
	constructor() {
		this.x = 0;
		this.y = 0;
		this.f = 0;
        this.g = 0;
        this.h = 0;
        this.cost = 1;
        this.visited = false;
        this.closed = false;
        this.parent = null;
	}
};

function setup() {
	createCanvas(width,height);
	frameRate(60);
	background(250);
	stroke(0);
	noFill();
	strokeWeight(0.1);
	for(let i =0;i<600;i+=60) {
		for(let j=0;j<600;j+=60) {
			rect(i,j,60,60);
		}
	}
	// temp();
	gridinit();
  // put setup code here
}



function gridinit() {
	// console.time('lol');
	// let grid = [[0,0,0,0,0,0,0,0,0,0],
	// 		[0,0,0,0,0,0,0,0,0,0],
	// 		[0,0,0,0,0,0,0,0,0,0],
	// 		[0,0,0,1,0,0,0,0,0,0],
	// 		[0,0,0,1,1,1,1,1,0,0],
	// 		[0,0,0,0,0,0,0,0,0,0],
	// 		[0,0,0,0,0,0,0,0,0,0],
	// 		[0,0,0,0,0,0,0,0,0,0],
	// 		[0,0,0,0,0,0,0,0,0,0],
	// 		[0,0,0,0,0,0,0,0,0,0]];
	let xl = 10, yl = 10;
	for(let i=0;i<xl;++i) {
		grid[i] = [];
		for(let j =0;j<yl;++j) {
			grid[i][j] = new node();
			grid[i][j].x = i;
			grid[i][j].y = j;
		}
	}
	// while(heap.len)
	// 	console.log(heap.pop());
	stroke(0);
	strokeWeight(0.1);
	start = grid[6][7];
	end = grid[3][4];
	fill(255,0,0);	
	rect(4*60,3*60,60,60);
	fill(0,255,0);
	rect(7*60,6*60,60,60);
}

function findpath() {
	stroke(0);
	strokeWeight(0.1);
	let path = astar();
	console.log(path);
	fill(150,0,150);
	let n = path.length;
	stroke(255, 255, 26);
	strokeWeight(5);
	for(let i =0;i<n-1;++i) {
		line(path[i][1]*60 +30, path[i][0]*60 +30, path[i+1][1]*60 +30, path[i+1][0]*60 +30);
	}
	// for(let tile of path) {
	// 	rect(tile[1]*60,tile[0]*60,60,60);
	// }
}

function mouseClicked() {
	stroke(0);
	strokeWeight(0.1);
	if(mouseX>=600 && mouseY>=600) {
		type = 0;
		fill(150);
		rect(600,600,100,100);
		fill(250);
		rect(600,0,100,600);
		rect(0,600,600,100);
		return;
	}
	if(mouseX>600 && mouseY<600) {
		type=1;
		fill(0,255,0);
		rect(600,0,100,600);
		fill(250);
		rect(600,600,100,100);
		rect(0,600,600,100);
		return;
	}
	if(mouseY>600) {
		type = 2;
		fill(255,0,0);
		rect(0,600,600,100);
		fill(250);
		rect(600,0,100,600);
		rect(600,600,100,100);
		return;
	}
	let x = Math.floor(mouseY/60);
	let y = Math.floor(mouseX/60);
	if((x==start.x && y==start.y) || (x==end.x && y==end.y))
		return;
	let cur_grid = grid[x][y];
	if(type===0) {
		if(cur_grid.cost) {
		fill(150);
		rect(y*60,x*60,60,60);
		cur_grid.cost = 0;
		}
		else {
		fill(250);
		rect(y*60,x*60,60,60);
		cur_grid.cost = 1;
		}
	}
	if(type===1) {
		fill(250);
		rect(start.y*60,start.x*60,60,60);
		start.cost = 1;
		start = cur_grid;
		fill(0,255,0);
		rect(y*60,x*60,60,60);
	}
	if(type===2) {
		fill(250);
		rect(end.y*60,end.x*60,60,60);
		end.cost = 1;
		end = cur_grid;
		fill(255,0,0);
		rect(y*60,x*60,60,60);
	}
	
}

function keyPressed() {
	if(keyCode==LEFT_ARROW) {
		findpath();
	}
}

function draw() {
  // put drawing code here
	

	// fill(150,100);
	// let recX = Math.floor(mouseX/size) * size;
	// let recY = Math.floor(mouseY/size) * size;
	// rect(recX,recY,size,size);
}


