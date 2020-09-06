class binaryHeap {

	constructor(scoring) {
		this.arr = [];
		this.scoring = scoring;
		this.len = 0;
	}

	size() {
		return this.len;
	}

	push(element) {
		this.arr.push(element);
		this.len+=1;
		this.bubbleUp(this.len - 1);
	}

	pop() {
		let result = this.arr[0];
		let end = this.arr.pop();
		this.len-=1;
		if(this.len>0) {
			this.arr[0] = end;
			this.bubbleDown(0);
		}
		return result;
	}


	bubbleUp(n) {
		let element = this.arr[n];
		let score = this.scoring(element);
		while(n>0) {
			let parentidx = Math.floor((n + 1) / 2) - 1;
			let parent = this.arr[parentidx];
			if(score>this.scoring(parent)) {
				break;
			}

			if(score==this.scoring(parent) && element.h>parent.h) {
				break;
			}

			this.arr[parentidx] = element;
			this.arr[n] = parent;
			n = parentidx;
		}
	}

	bubbleDown(n) {
		let len = this.len;
		let element = this.arr[n];
		let score = this.scoring(element);
		while(true) {
			let temp;
			let child2N = (n + 1) * 2;
			let child1N = child2N - 1;
			let swap = null;
			if(child1N<len) {
				let child1 = this.arr[child1N];
				let child1score = this.scoring(child1);
				if(child1score < score) {
					swap = child1N;
				}
				// if(child1score==score && child1.h<element.h) {
				// 	swap = child1N;
				// }
			}
			if(child2N<len) {
				let child2= this.arr[child2N];
				let child2score = this.scoring(child2);
				if(child2score < (swap==null?score:(child1N<len?this.scoring(this.arr[child1N]):child2score))) {
					swap = child2N;
				}
				// if(child2score==(swap==null?score:(child1N<len?this.scoring(this.arr[child1N]):child2score)) && child2.h<(swap==null?element.h:(child1N<len?this.arr[child1N].h:element.h))) {
				// 	swap = child2N;
				// }
			}
			if(swap==null) {
				break;
			}

			this.arr[n] = this.arr[swap];
			this.arr[swap] = element;
			n = swap;
		}
	}
	// remove(val) {
	// 	let len = this.len;
	// 	for(let i =0;i<len;++i) {
	// 		if(this.arr[i]!=val) {
	// 			continue;
	// 		}
	// 		let end = this.arr.pop();
	// 		if(i==len-1) {
	// 			break;
	// 		}
	// 		this.arr[i] = end;
	// 		this.bubbleUp(i);
	// 		this.bubbleDown(i);
	// 		break;
	// 	}
	// }
};

export default binaryHeap;