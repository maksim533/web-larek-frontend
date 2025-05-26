import { IItem } from '../../types';
import { IEvents } from '../base/events';

export class BasketData {
	protected items: IItem[] = [];
	protected events: IEvents;

	constructor(events: IEvents) {
		this.events = events;
	}

	setAllItems(items: IItem[]) {
		this.items = items;
		this.events.emit('basket:setAllItems');
	}

	getFullPrice() {
		return this.items.reduce((a, b) =>  a + b.price, 0)
	}

	addItem(item: IItem): void {
		this.items.push(item);
		this.events.emit('basket:changed');
	}

	deleteItem(id: string): void {
		this.items = this.items.filter((item) => item.id !== id);
		this.events.emit('basket:changed');
	}

	getBasketItems(item: IItem) {
		return this.items.includes(item);
	}

	getBasketIdItems(): string[] {
		return this.getAllItems()
			.filter((item) => item.price !== null)
			.map((item) => item.id);
	}

	deleteAllItem(): void {
		this.items.length = 0;
		this.events.emit('basket:changed');
	}

	getAllItems(): IItem[] {
		return this.items;
	}
}
