import { createElement, ensureElement } from '../../utils/utils';
import { Component } from '../base/Components';
import { IEvents } from '../base/events';
import { IAction, Item } from './Item';

export interface IBascet {
	items: HTMLElement[];
	fullPrice: number;
}

export class Basket extends Component<IBascet> {
	protected basketList: HTMLUListElement;
	protected basketButton: HTMLButtonElement;
	protected basketPrice: HTMLElement;

	constructor(container: HTMLElement, protected events: IEvents) {
		super(container);
		this.basketList = ensureElement(
			'.basket__list',
			this.container
		) as HTMLUListElement;
		this.basketButton = container.querySelector('.basket__button');
		this.basketPrice = ensureElement('.basket__price', this.container);

		this.basketButton.addEventListener('click', () => {
			this.events.emit('basket:continue');
		});
		this.items = [];
	}

	set items(items: HTMLElement[]) {
		if (items.length) {
			this.basketList.replaceChildren(...items);
			this.basketButton.disabled = false;
		} else {
			this.basketList.replaceChildren(
				createElement<HTMLParagraphElement>('p', {
					textContent: 'Корзина пуста',
				})
			);
			this.basketButton.disabled = true;
		}
	}

	set fullPrice(value: number) {
		if (value === 0) {
			this.basketButton.disabled = true;
			this.basketPrice.textContent = `${value} синапсов`;
		} else {
			this.basketButton.disabled = false;
			this.basketPrice.textContent = `${value} синапсов`;
		}
	}
}

export class BasketItem extends Item {
	protected _index: HTMLElement;
	protected buttonDelete: HTMLButtonElement;

	constructor(
		protected container: HTMLElement,
		protected events: IEvents,
		action?: IAction
	) {
		super(container, events, action);
		this._index = ensureElement('.basket__item-index', this.container);
		this.buttonDelete = ensureElement(
			'.basket__item-delete',
			container
		) as HTMLButtonElement;

		this.buttonDelete.addEventListener('click', action?.onClick);
	}

	set index(value: string) {
		this._index.textContent = value;
	}
}
