import React from 'react';
import p5 from 'p5';
import Node from './Node';
import binaryHeap from './binheap';
import Algo from './Astar';

var height = window.innerHeight;
var width = window.innerWidth;
var grid = [];
var start;
var end;
var type = 0;
var canvas2;
var prev = new Node();
var isrun = true;
console.log(height)
console.log(width)

class Gridin extends React.Component {
    constructor(props) {
        super(props);
        this.myref = React.createRef();
        this.chng = this.chng.bind(this);
    }

    Sketch = (p) => {
        let xl = 0, yl = 0;
        var timer = this.props.timer;
        var size = this.props.size;
        
        p.setup = () => {
            p.createCanvas(width,height)
            // canvas2 = p.createGraphics(width,height);
            // canvas2.clear()
            p.noLoop();
        } 

        p.draw = () => {
            p.noSmooth();
            p.background(250);
            p.stroke(220);
            p.noFill();
            p.strokeWeight(1);
            for(let i =0;i*size + size <width;i++) {
                xl++;
                let tmp = 0;
                for(let j=0;j*size +size<height;j++,tmp++) {
                    p.rect(i*size,j*size,size,size);
                }
                yl = tmp;
            }
            isrun = true;
            prev.x = -1;
            prev.y = -1;
            type = 0;
            // temp();
            // p.image(canvas2,0,0)
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
            // p.strokeWeight(1);
            start = grid[0][0];
            end = grid[0][1];
            p.fill(255,0,0);	
            p.rect(1*size,0*size,size,size);
            p.fill(0,255,0);
            p.rect(0*size,0*size,size,size);
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
                        p.globtimer = setTimeout(loop,timer);
                    }
                },timer
            )
        }

        p.endpath = () => {
            console.log('Check1')
            clearTimeout(p.globtimer)
            p.globtimer = 0
            
            p.redraw();
        }

        p.findpath = () => {
            p.stroke(220);
            p.strokeWeight(1);
            // p.strokeWeight(1);
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
        if(this.props.action!=prevProps.action && this.props.action === 'start') {
            this.myp5.findpath()
        }
        else if(this.props.action!=prevProps.action && this.props.action === 'end'){
            this.myp5.endpath()
            console.log('Cleanup')
            this.chng()
        }
    }

    chng() {
        this.props.reset()
    }

    render() {
        return(
            <div ref={this.myref} className='no-bord' >

            </div>
        )
    }
}

export default Gridin ;