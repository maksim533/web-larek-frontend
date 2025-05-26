import { IItemView } from '../../types';
import { ensureElement, isEmpty } from '../../utils/utils';
import { Component } from '../base/Components';
import { IEvents } from '../base/events';

export interface IAction {
	onClick: (event: MouseEvent) => void;
}

export class Item extends Component<IItemView> {
	protected itemTitle: HTMLElement;
	protected itemPrice: HTMLElement;

	constructor(
		protected container: HTMLElement,
		protected events: IEvents,
		action?: IAction
	) {
		super(container);
		this.itemTitle = ensureElement('.card__title', this.container);
		this.itemPrice = ensureElement('.card__price', this.container);
	}

	set price(price: number | null) {
		if (isEmpty(price)) {
			this.itemPrice.textContent = `Бесценно`;
		} else {
			this.itemPrice.textContent = `${price} синапсов`;
		}
	}

	set id(value: string) {
		this.container.dataset.id = value;
	}

	set title(value: string) {
		this.itemTitle.textContent = value;
	}
}

export class ItemElement extends Item {
	protected itemImage: HTMLImageElement;
	protected itemCategory: HTMLElement;
	protected button: HTMLButtonElement;
	protected itemCategoryColor: Record<string, string> = {
		другое: 'card__category_other',
		'софт-скил': 'card__category_soft',
		дополнительное: 'card__category_additional',
		кнопка: 'card__category_button',
		'хард-скил': 'card__category_hard',
	};

	constructor(
		protected container: HTMLElement,
		protected events: IEvents,
		action?: IAction
	) {
		super(container, events, action);
		this.itemImage = ensureElement(
			'.card__image',
			this.container
		) as HTMLImageElement;
		this.itemCategory = ensureElement('.card__category', this.container);
		this.button = container.querySelector('.card') as HTMLButtonElement;

		if (action?.onClick) {
			if (this.button) {
				this.button.addEventListener('click', action.onClick);
			} else {
				this.container.addEventListener('click', action.onClick);
			}
		}
	}

	set image(value: string) {
		this.itemImage.src = value;
		this.itemImage.alt = this.title;
	}

	set category(value: string) {
		this.itemCategory.textContent = value;
		this.itemCategory.classList.add(this.itemCategoryColor[value]);
	}
}

export class ItemPreview extends ItemElement {
	protected itemDescription: HTMLElement;
	protected _itemButton: HTMLButtonElement;
	constructor(
		protected container: HTMLElement,
		protected events: IEvents,
		action?: IAction
	) {
		super(container, events, action);
		this.itemDescription = ensureElement('.card__text', this.container);
		this._itemButton = container.querySelector('.card__button');

		this._itemButton.addEventListener('click', () => {
			action?.onClick;
		});
	}

	set itemButton(value: boolean) {
		if (value === true) {
			this._itemButton.textContent = 'Убрать';
		} else {
			this._itemButton.textContent = 'Купить';
		}
	}

	set description(value: string) {
		this.itemDescription.textContent = value;
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
