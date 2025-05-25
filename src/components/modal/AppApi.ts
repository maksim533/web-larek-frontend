import { Api, ApiListResponse } from '../base/api';
import { IItem, IOrder, IOrderResult } from '../../types';

export class AppApi extends Api {
	readonly cdn: string;

	constructor(cdn: string, baseUrl: string, options?: RequestInit) {
		super(baseUrl, options);
		this.cdn = cdn;
	}

	getAllItem(): Promise<IItem[]> {
		return this.get('/product/').then((data: ApiListResponse<IItem>) =>
			data.items.map((item) => ({
				...item,
				image: this.cdn + item.image.replace('.svg', '.png'),
			}))
		);
	}

	getItemId(itemId: string): Promise<IItem> {
		return this.get(`/product/${itemId}`).then((item: IItem) => ({
			...item,
			image: this.cdn + item.image.replace('.svg', '.png'),
		}));
	}

	postItem(order: IOrder): Promise<IOrderResult> {
		return this.post('/order', order).then((data: IOrderResult) => data);
	}
}
