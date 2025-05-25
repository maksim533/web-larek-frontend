import { ensureElement } from '../../utils/utils';
import { Component } from '../base/Components';
import { IEvents } from '../base/events';

export interface IModal {
	content: HTMLElement;
}

export class Modal extends Component<IModal> {
	protected closeButton: HTMLButtonElement;
	protected _content: HTMLElement;

	constructor(protected container: HTMLElement, protected events: IEvents) {
		super(container);
		this.closeButton = ensureElement<HTMLButtonElement>(
			'.modal__close',
			container
		);
		this._content = ensureElement('.modal__content', this.container);

		this.closeButton.addEventListener('click', this.close.bind(this));
		this.container.addEventListener('click', this.close.bind(this));
		this._content.addEventListener('click', (event) => event.stopPropagation());
	}

	set content(value: HTMLElement) {
		this._content.replaceChildren(value);
	}

	open() {
		this.container.classList.add('modal_active');
		this.events.emit('popup:open');
	}

	close() {
		this.container.classList.remove('modal_active');
		this.events.emit('popup:close');
		this.content = null;
	}

	render(data: Partial<IModal>): HTMLElement {
		super.render(data);
		this.open();
		return this.container;
	}
}
