import React from 'react';
import p5 from 'p5';
import Node from './Node';
import binaryHeap from './binheap';
import Algo from './Astar';
require("@babel/plugin-transform-runtime");

var height = window.innerHeight;
var width = window.innerWidth;
var grid = [];
var start;
var end;
var chk1 = null;
var chk2 = null;
var chk3 = null;
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
        console.log(timer);
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
            p.stroke(220);
            p.strokeWeight(1);
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

        p.drawpath = (pathn,n) => {
            return new Promise((resolve) => {
                p.visualtimer = setTimeout(function loop() {
                    let singleArr = pathn.shift();
                    if(singleArr[2]==0) {
                        p.fill(50, 130, 200);
                        p.rect(singleArr[1]*size,singleArr[0]*size,size,size);
                    }
                    if(singleArr[2]==1) {
                        p.fill(0, 230, 138);
                        p.rect(singleArr[1]*size,singleArr[0]*size,size,size);
                    }
                    n-=1;
                    if(n) {
                        p.visualtimer = setTimeout(loop,timer);
                    }
                    else
                        resolve();
                    },timer
                )
            })
        }

        p.endpath = () => {
            console.log('Check1')
            clearTimeout(p.visualtimer)
            clearTimeout(p.linetimer)
            p.visualtimer = 0
            p.linetimer = 0
            p.redraw();
        }

        p.linedraw = (arr,n) => {
            return new Promise((resolve) => {
                p.linetimer = setTimeout(function loop() {
                    p.stroke(255, 200, 0)
                    p.strokeWeight(3)
                    p.line(arr[n-1][1]*size + size/2,arr[n-1][0]*size + size/2,arr[n-2][1]*size + size/2,arr[n-2][0]*size + size/2)
                    n--;
                    if(n==1)
                        resolve();
                    else
                        p.linetimer = setTimeout(loop,timer)
                }
                ,timer)
            })
        }

        p.pathdraw = async (path) => {
            let n = path.length
            for(let i = 0;i<n;++i) {
                let n1 = path[i].length
                await p.linedraw(path[i],n1)
            }
        }

        p.findpath = async (arr) => {
            let n = arr.length
            let result_path = []
            for(let i=0;i<n-1;++i) {
                let grid_clone = JSON.parse(JSON.stringify(grid))
                p.stroke(220);
                p.strokeWeight(1);
                let path = Algo.astar(arr[i], arr[i+1], grid_clone, yl-1,xl-1);
                if(this.props.visualize) {
                    let n = path[0].length
                    await p.drawpath(path[0],n)
                }
                result_path.push(path[1])
            }
            p.pathdraw(result_path);
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
            switch(cur_key) {
                case "Start" : {
                    start.color = [250,250,250]
                    p.fill(start.color);
                    p.rect(start.y*size,start.x*size,size,size);
                    start.cost = 1;
                    start = cur_grid;
                    start.color = [0,255,0]
                    p.fill(start.color);
                    p.rect(y*size,x*size,size,size);
                    break;
                }
                case "End" : {
                    end.color = [250,250,250]
                    p.fill(end.color);
                    p.rect(end.y*size,end.x*size,size,size);
                    end.cost = 1;
                    end = cur_grid;
                    end.color = [255,0,0]
                    p.fill(end.color);
                    p.rect(y*size,x*size,size,size);
                    break;
                }
                case "Checkpoint1" : {
                    if(chk1!=null) {
                        chk1.color = [250,250,250]
                        p.fill(chk1.color);
                        p.rect(chk1.y*size,chk1.x*size,size,size);
                        chk1.cost = 1;
                    }
                    chk1 = cur_grid;
                    chk1.color = [247,239,10]
                    p.fill(chk1.color);
                    p.rect(y*size,x*size,size,size);
                    break;
                }
                case "Checkpoint2" : {
                    if(chk2!=null) {
                        chk2.color = [250,250,250]
                        p.fill(chk2.color);
                        p.rect(chk2.y*size,chk2.x*size,size,size);
                        chk2.cost = 1;
                    }
                    chk2 = cur_grid;
                    chk2.color = [247,211,10]
                    p.fill(chk2.color);
                    p.rect(y*size,x*size,size,size);
                    break;
                }
                case "Checkpoint3" : {
                    if(chk3!=null) {
                        chk3.color = [250,250,250]
                        p.fill(chk3.color);
                        p.rect(chk3.y*size,chk3.x*size,size,size);
                        chk3.cost = 1;
                    }
                    chk3 = cur_grid;
                    chk3.color = [247,168,10]
                    p.fill(chk3.color);
                    p.rect(y*size,x*size,size,size);
                    break;
                }
                default : {
                    if(chk1!=null && x==chk1.x && y==chk1.y)
                        chk1=null;
                    if(chk2!=null && x==chk2.x && y==chk2.y)
                        chk2=null;
                    if(chk3!=null && x==chk3.x && y==chk3.y)
                        chk3=null;
                    cur_grid.color = this.props.current[cur_key][1]
                    p.fill(cur_grid.color);
                    p.rect(y*size,x*size,size,size);
                    cur_grid.cost = this.props.current[cur_key][0];
                }
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
            switch(cur_key) {
                case "Start" : {
                    start.color = [250,250,250]
                    p.fill(start.color);
                    p.rect(start.y*size,start.x*size,size,size);
                    start.cost = 1;
                    start = cur_grid;
                    start.color = [0,255,0]
                    p.fill(start.color);
                    p.rect(y*size,x*size,size,size); 
                    break;
                }
                case "End" : {
                    end.color = [250,250,250]
                    p.fill(end.color);
                    p.rect(end.y*size,end.x*size,size,size);
                    end.cost = 1;
                    end = cur_grid;
                    end.color = [255,0,0]
                    p.fill(end.color);
                    p.rect(y*size,x*size,size,size);
                    break;
                }
                case "Checkpoint1" : {
                    if(chk1!=null) {
                        chk1.color = [250,250,250]
                        p.fill(chk1.color);
                        p.rect(chk1.y*size,chk1.x*size,size,size);
                        chk1.cost = 1;
                    }
                    chk1 = cur_grid;
                    chk1.color = [247,239,10]
                    p.fill(chk1.color);
                    p.rect(y*size,x*size,size,size);
                    break;
                }
                case "Checkpoint2" : {
                    if(chk2!=null) {
                        chk2.color = [250,250,250]
                        p.fill(chk2.color);
                        p.rect(chk2.y*size,chk2.x*size,size,size);
                        chk2.cost = 1;
                    }
                    chk2 = cur_grid;
                    chk2.color = [247,211,10]
                    p.fill(chk2.color);
                    p.rect(y*size,x*size,size,size);
                    break;
                }
                case "Checkpoint3" : {
                    if(chk3!=null) {
                        chk3.color = [250,250,250]
                        p.fill(chk3.color);
                        p.rect(chk3.y*size,chk3.x*size,size,size);
                        chk3.cost = 1;
                    }
                    chk3 = cur_grid;
                    chk3.color = [247,168,10]
                    p.fill(chk3.color);
                    p.rect(y*size,x*size,size,size);
                    break;
                }
                default : {
                    if(chk1!=null && x==chk1.x && y==chk1.y)
                        chk1=null;
                    if(chk2!=null && x==chk2.x && y==chk2.y)
                        chk2=null;
                    if(chk3!=null && x==chk3.x && y==chk3.y)
                        chk3=null;
                    cur_grid.color = this.props.current[cur_key][1]
                    p.fill(cur_grid.color);
                    p.rect(y*size,x*size,size,size);
                    cur_grid.cost = this.props.current[cur_key][0];
                }
            }
        }
    }

    componentDidMount() {
        this.myp5 = new p5(this.Sketch , this.myref.current);
    }

    componentDidUpdate(prevProps) {
        if(this.props.action!=prevProps.action && this.props.action === 'start') {
            let arr = []
            arr.push(start)
            if(chk1!=null)
                arr.push(chk1);
            
            if(chk2!=null)
                arr.push(chk2)

            if(chk3!=null)
                arr.push(chk3)

            arr.push(end)
            this.myp5.findpath(arr);
        }
        else if(this.props.action!=prevProps.action && this.props.action === 'end'){
            this.myp5.endpath()
            this.chng()
        } else if(this.props.action!=prevProps.action && this.props.action === 'clear'){
            hard_reset = true
            this.myp5.endpath()
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