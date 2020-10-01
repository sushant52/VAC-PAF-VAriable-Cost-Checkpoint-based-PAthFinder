import binaryHeap from './binheap'

const Algo = {
    out_of_bounds(node_position, x_bound, y_bound) {
        if(node_position[0]<0 || node_position[1]<0 || node_position[0]>x_bound || node_position[1]>y_bound) {
            return true;
        }
        return false;
    },
    
    diagelem(grid,cur_pos, x_bound, y_bound) {
        let ans = [];
        if(!this.out_of_bounds([cur_pos[0]+1,cur_pos[1]+1], x_bound, y_bound) && (grid[cur_pos[0]+1][cur_pos[1]].cost!=0 || grid[cur_pos[0]][cur_pos[1]+1].cost!=0))
            ans.push([1,1]);
    
        if(!this.out_of_bounds([cur_pos[0]-1,cur_pos[1]-1], x_bound, y_bound) && (grid[cur_pos[0]-1][cur_pos[1]].cost!=0 || grid[cur_pos[0]][cur_pos[1]-1].cost!=0))
            ans.push([-1,-1]);
    
        if(!this.out_of_bounds([cur_pos[0]+1,cur_pos[1]-1], x_bound, y_bound) && (grid[cur_pos[0]+1][cur_pos[1]].cost!=0 || grid[cur_pos[0]][cur_pos[1]-1].cost!=0))
            ans.push([1,-1]);
    
        if(!this.out_of_bounds([cur_pos[0]-1,cur_pos[1]+1], x_bound, y_bound) && (grid[cur_pos[0]-1][cur_pos[1]].cost!=0 || grid[cur_pos[0]][cur_pos[1]+1].cost!=0))
            ans.push([-1,1]);
        return ans;
    },
    
    ss(node) {
        return node.f;
    },
    
    astar(start, end, grid, x_bound, y_bound) {
        let path = [];
        let temp = [];
        start.visited = true;
        let heap = new binaryHeap(this.ss);
        heap.push(start);
        console.log(start);
        console.log(end);
        while(heap.len) {
            let cur_node = heap.pop();
            if(!cur_node.visited){
                cur_node.visited = true;
                temp = [cur_node.x , cur_node.y, 0];
                path.push(temp);
            }
            // fill(51, 255, 255);
            // rect(cur_node.y*60,cur_node.x*60,60,60);
            if(cur_node.x==end.x && cur_node.y==end.y) {
                let current = cur_node;
                let final_path = []
                while(current!=null) {
                    final_path.push([current.x,current.y,2]);
                    current = current.parent;
                }
                return [path,final_path];
            }
                cur_node.closed = true;
                temp = [cur_node.x , cur_node.y, 1];
                path.push(temp);
            
            // fill(119, 255, 51);
            // rect(cur_node.y*60,cur_node.x*60,60,60);
            let posarr = [[0,1],[1,0],[0,-1],[-1,0]];
            for(let update of posarr) {
                let node_position = [cur_node.x+update[0], cur_node.y+update[1]];
                if(this.out_of_bounds(node_position, x_bound, y_bound)) {
                    continue;
                }
                let new_node = grid[node_position[0]][node_position[1]];
                if(new_node.cost ==0 || new_node.closed) {
                    continue;
                }
                
                if(!new_node.visited) {
                    new_node.parent = cur_node;
                    new_node.g = cur_node.g + new_node.cost;
                    let dy = Math.abs(new_node.x - end.x);
                    let dx = Math.abs(new_node.y - end.y);
                    new_node.h = Math.max(dy+dx);
                    new_node.f = new_node.g + new_node.h;
                    new_node.visited = true;
                    temp = [new_node.x , new_node.y, 0];
                    path.push(temp);
                    // fill(51, 255, 255);
                    // rect(new_node.y*60,new_node.x*60,60,60);
                    heap.push(new_node);
                }
                else {
                    let dg = cur_node.g + new_node.cost; 
                    if(dg<new_node.g) {
                        new_node.parent = cur_node;
                        new_node.g = dg;
                        new_node.f = new_node.g + new_node.h;
                        heap.push(new_node);
                    }
                }
            }
            let posdiag = this.diagelem(grid,[cur_node.x,cur_node.y], x_bound, y_bound);
            for(let update of posdiag) {
                let node_position = [cur_node.x+update[0], cur_node.y+update[1]];
                if(this.out_of_bounds(node_position, x_bound, y_bound)) {
                    continue;
                }
                let new_node = grid[node_position[0]][node_position[1]];
                if(new_node.cost ==0 || new_node.closed) {
                    continue;
                }
                
                if(!new_node.visited) {
                    new_node.parent = cur_node;
                    new_node.g = cur_node.g + new_node.cost*Math.sqrt(2);
                    let dy = Math.abs(new_node.x - end.x);
                    let dx = Math.abs(new_node.y - end.y);
                    new_node.h = Math.max(dy+dx) ;
                    new_node.f = new_node.g + new_node.h;
                    new_node.visited = true;
                    temp = [new_node.x , new_node.y, 0];
                    path.push(temp);
                    // fill(51, 255, 255);
                    // rect(new_node.y*60,new_node.x*60,60,60);
                    heap.push(new_node);
                }
                else {
                    let dg = cur_node.g + new_node.cost*Math.sqrt(2); 
                    if(dg<new_node.g) {
                        new_node.parent = cur_node;
                        new_node.g = dg;
                        new_node.f = new_node.g + new_node.h;
                        heap.push(new_node);
                    }
                }
            }
        }
        return [];
    }
}

export default Algo;
