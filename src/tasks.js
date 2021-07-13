export default class Tasks {
	/**
	 * The Tasks is queue data structure
	 */
	constructor() {
		this.queue = [];
		this.len = this.queue.length;
	}
	add = (item) => {
		this.queue.push(item);
		this.updateLen();
	};
	remove = () => {
		let newQueue = this.queue.slice(1, this.len);
		this.queue = newQueue;
		this.updateLen();
	};
	empty = () => {
		return this.len === 0;
	};
	show = () => {
		console.log(this.queue);
	};
	updateLen = () => {
		this.len = this.queue.length;
	};
	previousTask = () => {
		return this.queue[this.len - 1];
	};
}
