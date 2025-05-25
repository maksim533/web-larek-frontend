import { ensureElement } from '../../utils/utils';
import { Component } from '../base/Components';
import { IEvents } from '../base/events';

interface IPage {
	itemList: HTMLElement[];
	counter: number;
	locked: boolean;
}

export class Page extends Component<IPage> {
	protected headerBascetButton: HTMLButtonElement;
	protected headerBascetCounter: HTMLElement;
	protected itemContainer: HTMLElement;
	protected wrapper: HTMLElement;

	constructor(protected container: HTMLElement, protected events: IEvents) {
		super(container);
		this.headerBascetButton = ensureElement(
			'.header__basket',
			this.container
		) as HTMLButtonElement;
		this.headerBascetCounter = ensureElement(
			'.header__basket-counter',
			this.container
		);
		this.itemContainer = ensureElement('.gallery', this.container);
		this.wrapper = ensureElement('.page__wrapper', this.container);

		this.headerBascetButton.addEventListener('click', () => {
			this.events.emit('basket:open');
		});
	}

	set itemList(items: HTMLElement[]) {
		this.itemContainer.replaceChildren(...items);
	}

	set counter(value: number) {
		this.headerBascetCounter.textContent = String(value);
	}

	set locked(value: boolean) {
		if (value) {
			this.wrapper.classList.add('page__wrapper_locked');
		} else {
			this.wrapper.classList.remove('page__wrapper_locked');
		}
	}
}
