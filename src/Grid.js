import React from 'react';
import p5 from 'p5';
import Node from './Node';
import binaryHeap from './binheap';
import Algo from './Astar';

var height = window.innerHeight;
var width = window.innerWidth;
var size = 20;
var grid = [];
var start;
var end;
var type = 0;
var prev = new Node();
var isrun = true;

class Gridin extends React.Component {
    constructor(props) {
        super(props);
        this.myref = React.createRef();
    }

    Sketch = (p) => {
        let xl = 0, yl = 0;
        p.setup = () => {
            p.createCanvas(width,height)
            p.frameRate(60);
            p.background(250);
            p.stroke(220);
            p.noFill();
            p.strokeWeight(1);
            for(let i =0;i+size <width;i+=size) {
                xl++;
                let tmp = 0;
                for(let j=0;j+size<height;j+=size,tmp++) {
                    p.rect(i,j,size,size);
                }
                yl = tmp;
            }
            isrun = true;
            prev.x = -1;
            prev.y = -1;
            type = 0;
            // temp();
            p.gridinit();
        } 

        p.gridinit =  () => {
            
            for(let i=0;i<yl;++i) {
                grid[i] = [];
                for(let j =0;j<xl;++j) {
                    grid[i][j] = new Node();
                    grid[i][j].x = i;
                    grid[i][j].y = j;
                }
            }
            p.stroke(220);
            p.strokeWeight(1);
            start = grid[6][7];
            end = grid[3][4];
            p.fill(255,0,0);	
            p.rect(4*size,3*size,size,size);
            p.fill(0,255,0);
            p.rect(7*size,6*size,size,size);
        }

        p.drawpath = (path,n) => {
            p.globtimer = setTimeout(function loop() {
                    let singleArr = path.shift();
                    if(singleArr[2]==0) {
                        p.fill(50, 130, 200);
                        p.rect(singleArr[1]*size,singleArr[0]*size,size,size);
                    }
                    if(singleArr[2]==1) {
                        p.fill(0, 230, 138);
                        p.rect(singleArr[1]*size,singleArr[0]*size,size,size);
                    }
                    if(singleArr[2]==2) {
                        p.fill(255, 200, 0);
                        p.rect(singleArr[1]*size,singleArr[0]*size,size,size);
                    }
                    n-=1;
                    if(n) {
                        p.globtimer = setTimeout(loop,1);
                    }
                },1
            )
        }

        p.endpath = () => {
            clearTimeout(p.globtimer)
            p.globtimer = 0
            p.setup();
        }

        p.findpath = () => {
            p.stroke(220);
            p.strokeWeight(1);
            let path = Algo.astar(start, end, grid, yl-1,xl-1);
            let n = path.length
            p.drawpath(path,n)
        }

        p.mouseDragged = (e) => {
            p.stroke(220);
            p.strokeWeight(1);
            let x = Math.floor(e.clientY/size);
            let y = Math.floor(e.clientX/size);
            if(Algo.out_of_bounds([x,y], yl-1,xl-1))
                return;
            if((x==start.x && y==start.y) || (x==end.x && y==end.y) || (x==prev.x && y==prev.y))
                return;
            let cur_grid = grid[x][y];
            prev = grid[x][y];
            let cur_key = Object.keys(this.props.current)[0]
            if(cur_key == "Start") {
                p.fill(250);
                p.rect(start.y*size,start.x*size,size,size);
                start.cost = 1;
                start = cur_grid;
                p.fill(0,255,0);
                p.rect(y*size,x*size,size,size);
            }
            else if(cur_key == "End") {
                p.fill(250);
                p.rect(end.y*size,end.x*size,size,size);
                end.cost = 1;
                end = cur_grid;
                p.fill(255,0,0);
                p.rect(y*size,x*size,size,size);
            }
            else {
                p.fill(...this.props.current[cur_key][1]);
                p.rect(y*size,x*size,size,size);
                cur_grid.cost = this.props.current[cur_key][0];
            }
        }

        p.mousePressed = (e) => {
            p.stroke(220);
            p.strokeWeight(1);
            let x = Math.floor(e.clientY/size);
            let y = Math.floor(e.clientX/size);
            if(Algo.out_of_bounds([x,y], yl-1,xl-1))
                return;
            let cur_grid = grid[x][y];
            prev = grid[x][y];
            if((x==start.x && y==start.y) || (x==end.x && y==end.y))
                return;
            
            let cur_key = Object.keys(this.props.current)[0]
            if(cur_key == "Start") {
                p.fill(250);
                p.rect(start.y*size,start.x*size,size,size);
                start.cost = 1;
                start = cur_grid;
                p.fill(0,255,0);
                p.rect(y*size,x*size,size,size);
            }
            else if(cur_key == "End") {
                p.fill(250);
                p.rect(end.y*size,end.x*size,size,size);
                end.cost = 1;
                end = cur_grid;
                p.fill(255,0,0);
                p.rect(y*size,x*size,size,size);
            }
            else {
                p.fill(...this.props.current[cur_key][1]);
                p.rect(y*size,x*size,size,size);
                cur_grid.cost = this.props.current[cur_key][0];
            }
        }
    }

    componentDidMount() {
        this.myp5 = new p5(this.Sketch , this.myref.current);
    }

    componentDidUpdate(prevProps) {
        if(prevProps.start!=this.props.start)
            this.myp5.findpath()
        if(prevProps.end!=this.props.end)
            this.myp5.endpath()
    }

    render() {
        return(
            <div ref={this.myref} className='no-bord' >

            </div>
        )
    }
}

export default Gridin ;

// if((x==start.x && y==start.y))
//                 type = 1;
//             else if((x==end.x && y==end.y))
//                 type = 2;
//             else if(grid[x][y].cost == 1)
//                 type = 0;
//             else
//                 type = -1;