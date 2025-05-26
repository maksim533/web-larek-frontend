import { FormErrors, IOrder, IUser } from '../../types';
import { IEvents } from '../base/events';

export class UserData {
	order: IUser = {
		phone: '',
		address: '',
		email: '',
		payment: null,
	};

	protected formErrors: FormErrors = {};
	protected events: IEvents;

	constructor(events: IEvents) {
		this.events = events;
	}

	clearOrder() {
		this.order = {
			address: '',
			phone: '',
			payment: null,
			email: '',
		};
	}

	setOrderField(field: keyof IUser, value: string): void {
		this.order[field] = value;
		this.events.emit('order:change');
		if (this.validityOrder()) {
			this.events.emit('order:ready', this.order);
		}
	}

	validityOrder() {
		const errors: typeof this.formErrors = {};
		if (!this.order.email) {
			errors.email = 'Необходимо указать email';
		}
		if (!this.order.phone) {
			errors.phone = 'Необходимо указать телефон';
		}
		if (!this.order.address) {
			errors.address = 'Необходимо указать адрес';
		}
		if (!this.order.payment) {
			errors.payment = 'Необходимо выбрать способ оплаты';
		}
		this.formErrors = errors;
		this.events.emit('formErrors:change', this.formErrors);
		return Object.keys(errors).length === 0;
	}
}
