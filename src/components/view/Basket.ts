import { createElement, ensureElement } from '../../utils/utils';
import { Component } from '../base/Components';
import { IEvents } from '../base/events';

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
