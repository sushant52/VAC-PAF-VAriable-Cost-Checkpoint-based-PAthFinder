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
var hard_reset = true;
var prev = new Node();
console.log(height)
console.log(width)

class Gridin extends React.Component {
    constructor(props) {
        super(props);
        this.myref = React.createRef();
        this.chng = this.chng.bind(this);
        this.clr = this.clr.bind(this);
    }

    Sketch = (p) => {
        var timer = this.props.timer;
        var size = this.props.size;
        var xl = Math.floor(width/size);
        var yl = Math.floor(height/size);
        
        p.setup = () => {
            p.createCanvas(width,height)
            p.background(250);
            p.stroke(220);
            p.strokeWeight(1);
            for(let i=0;i<yl;++i) {
                grid[i] = [];
                for(let j =0;j<xl;++j) {
                    grid[i][j] = new Node();
                    grid[i][j].x = i;
                    grid[i][j].y = j;
                }
            }
            prev.x = -1;
            prev.y = -1;
            p.noLoop();
        } 

        p.draw = () => {
            if(hard_reset)
                p.gridinit();
            for(let i =0;i*size + size <width;i++) {
                for(let j=0;j*size +size<height;j++) {
                    let cur_grid = grid[j][i]
                    cur_grid.f = 0
                    cur_grid.g = 0
                    cur_grid.h = 0
                    cur_grid.closed = false
                    cur_grid.visited = false
                    cur_grid.parent = null
                    p.fill(cur_grid.color)
                    p.rect(i*size,j*size,size,size);
                }
            }
            console.log(start,end,xl,yl,grid)
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
            start = grid[0][0];
            end = grid[0][1];
            start.color = [0,255,0]
            end.color = [255,0,0]
            p.fill(start.color);
            p.rect(0*size,0*size,size,size);
            p.fill(end.color);	
            p.rect(1*size,0*size,size,size);
            prev.x = -1;
            prev.y = -1;
            hard_reset = false
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
            let path = Algo.astar(start, end, grid, yl-1,xl-1);
            let n = path.length
            p.drawpath(path,n)
        }

        p.mouseDragged = (e) => {
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
                start.color = [250,250,250]
                p.fill(start.color);
                p.rect(start.y*size,start.x*size,size,size);
                start.cost = 1;
                start = cur_grid;
                start.color = [0,255,0]
                p.fill(start.color);
                p.rect(y*size,x*size,size,size);
            }
            else if(cur_key == "End") {
                end.color = [250,250,250]
                p.fill(end.color);
                p.rect(end.y*size,end.x*size,size,size);
                end.cost = 1;
                end = cur_grid;
                end.color = [255,0,0]
                p.fill(end.color);
                p.rect(y*size,x*size,size,size);
            }
            else {
                cur_grid.color = this.props.current[cur_key][1]
                p.fill(cur_grid.color);
                p.rect(y*size,x*size,size,size);
                cur_grid.cost = this.props.current[cur_key][0];
            }
        }

        p.mousePressed = (e) => {
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
                start.color = [250,250,250]
                p.fill(start.color);
                p.rect(start.y*size,start.x*size,size,size);
                start.cost = 1;
                start = cur_grid;
                start.color = [0,255,0]
                p.fill(start.color);
                p.rect(y*size,x*size,size,size);
            }
            else if(cur_key == "End") {
                end.color = [250,250,250]
                p.fill(end.color);
                p.rect(end.y*size,end.x*size,size,size);
                end.cost = 1;
                end = cur_grid;
                end.color = [255,0,0]
                p.fill(end.color);
                p.rect(y*size,x*size,size,size);
            }
            else {
                cur_grid.color = this.props.current[cur_key][1]
                p.fill(cur_grid.color);
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
        } else if(this.props.action!=prevProps.action && this.props.action === 'clear'){
            hard_reset = true
            this.myp5.endpath()
            console.log('Clear')
            this.clr()
        }
    }

    chng() {
        this.props.reset()
    }

    clr() {
        this.props.clear()
    }

    render() {
        return(
            <div ref={this.myref} className='no-bord' >

            </div>
        )
    }
}

export default Gridin ;