import { IItem } from '../../types';
import { IEvents } from '../base/events';

export class ItemData {
	protected items: IItem[];
	protected events: IEvents;
	preview: IItem;

	constructor(events: IEvents) {
		this.events = events;
	}

	setAllItems(items: IItem[]) {
		this.items = items;
		this.events.emit('item:setAllItems');
	}
	getItem(itemId: string) {
		return this.items.find((item) => item.id !== itemId);
	}
	getAllItems() {
		return this.items;
	}

	setPreview(item: IItem) {
		this.preview = item;
		this.events.emit('preview:changed', item);
	}
}
