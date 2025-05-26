import { AppApi } from './components/model/AppApi';
import { API_URL, CDN_URL } from './utils/constants';
import './scss/styles.scss';
import { ItemData } from './components/model/ItemData';
import { EventEmitter } from './components/base/events';
import { UserData } from './components/model/UserData';
import { BasketData } from './components/model/BasketData';
import { Page } from './components/view/Page';
import { ItemElement, ItemPreview, BasketItem } from './components/view/Item';
import { cloneTemplate, ensureElement } from './utils/utils';
import { Modal } from './components/view/Modal';
import { Basket } from './components/view/Basket';
import { IItem, IUser } from './types';
import { FormContacts, FormOrder } from './components/view/Form';
import { Success } from './components/view/Success';

const appApi = new AppApi(CDN_URL, API_URL);
const itemTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');
const successTemplate = ensureElement<HTMLTemplateElement>('#success');
const cardPreviewTemplate = ensureElement<HTMLTemplateElement>('#card-preview');
const cardBasket = ensureElement<HTMLTemplateElement>('#card-basket');
const basketTemplate = ensureElement<HTMLTemplateElement>('#basket');
const orderTemplate = ensureElement<HTMLTemplateElement>('#order');
const contacts = ensureElement<HTMLTemplateElement>('#contacts');

const events = new EventEmitter();

events.onAll(({ eventName, data }) => {
	console.log(eventName, data);
});

const itemData = new ItemData(events);
const userData = new UserData(events);
const basketData = new BasketData(events);
const page = new Page(document.body, events);
const modal = new Modal(ensureElement<HTMLElement>('#modal-container'), events);
const basket = new Basket(cloneTemplate(basketTemplate), events);
const formOrder = new FormOrder(cloneTemplate(orderTemplate), events);
const formContacts = new FormContacts(cloneTemplate(contacts), events);
const success = new Success(cloneTemplate(successTemplate), {
	onClick: () => {
		modal.close();
	},
});

events.on('item:setAllItems', () => {
	page.itemList = itemData.getAllItems().map((item: IItem) => {
		const itemElement = new ItemElement(cloneTemplate(itemTemplate), events, {
			onClick: () => events.emit('card:select', item),
		});
		return itemElement.render({
			price: item.price,
			title: item.title,
			category: item.category,
			image: item.image,
			id: item.id,
		});
	});
});

events.on('card:select', (item: IItem) => {
	itemData.setPreview(item);
});

events.on('preview:changed', (item: IItem) => {
	const itemPreview = new ItemPreview(
		cloneTemplate(cardPreviewTemplate),
		events,
		{
			onClick: () => {
				if (basketData.getBasketItems(item)) {
					events.emit('item:delete', item);
				} else {
					events.emit('item:add', item);
				}
			},
		}
	);
	modal.render({
		content: itemPreview.render({
			id: item.id,
			image: item.image,
			title: item.title,
			category: item.category,
			description: item.description,
			price: item.price,
			itemButton: basketData.getBasketItems(item) ? true : false,
		}),
	});
});

events.on('item:add', () => {
	basketData.addItem(itemData.preview);
	modal.close();
});

events.on('item:delete', (item: IItem) => {
	basketData.deleteItem(item.id);
	modal.close();
});

events.on('basket:open', () => {
	modal.render({
		content: basket.render({}),
	});
});

events.on('basket:changed', () => {
	page.counter = basketData.getAllItems().length;
	basket.fullPrice = basketData.getFullPrice();
	basket.items = basketData.getAllItems().map((item, index) => {
		const itemBasket = new BasketItem(cloneTemplate(cardBasket), events, {
			onClick: () => {
				basketData.deleteItem(item.id);
			},
		});
		return itemBasket.render({
			id: item.id,
			index: index + 1,
			title: item.title,
			price: item.price,
		});
	});
});

events.on('basket:continue', () => {
	userData.clearOrder();
	modal.render({
		content: formOrder.render({
			isValid: false,
			errors: [],
			payment: null,
			address: '',
		}),
	});
});

events.on(
	/^(order|contacts)\..*:change/,
	(data: { field: keyof IUser; value: string }) => {
		userData.setOrderField(data.field, data.value);
	}
);

events.on('formErrors:change', (errors: Partial<IUser>) => {
	const { payment, address, email, phone } = errors;
	formOrder.isValid = !payment && !address;
	formContacts.isValid = !email && !phone;
	formOrder.errors = Object.values({ address, payment })
		.filter((i) => !!i)
		.join('; ');
	formContacts.errors = Object.values({ email, phone })
		.filter((i) => !!i)
		.join('; ');
});

events.on('order:change', () => {
	formOrder.payment = userData.order.payment;
});

events.on('order:submit', () => {
	modal.render({
		content: formContacts.render({
			phone: '',
			email: '',
			isValid: false,
			errors: [],
		}),
	});
});

events.on('contacts:submit', () => {
	appApi
		.postItem({
			total: basketData.getFullPrice(),
			items: basketData.getBasketIdItems(),
			address: userData.order.address,
			phone: userData.order.phone,
			payment: userData.order.payment,
			email: userData.order.email,
		})
		.then((res) => {
			success.total = res.total;
			basketData.deleteAllItem();
			userData.clearOrder();
			modal.render({
				content: success.render({}),
			});
		})
		.catch((err) => {
			console.log(err);
		});
});

events.on('popup:open', () => {
	page.locked = true;
});

events.on('popup:close', () => {
	page.locked = false;
});

appApi
	.getAllItem()
	.then(itemData.setAllItems.bind(itemData))
	.catch((err) => {
		console.error(err);
	});
