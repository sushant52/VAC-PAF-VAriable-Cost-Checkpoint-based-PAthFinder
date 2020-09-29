class Node {
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
        this.color = [250,250,250]
	}
};

export default Node;