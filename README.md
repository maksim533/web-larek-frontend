# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:

- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:

- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/scss/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск

Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```

## Сборка

```
npm run build
```

или

```
yarn build

```

## Деплой  

<https://maksim533.github.io/web-larek-frontend/>

## Архитектура приложения

Архитектура приложения реализована на Model-View-Presenter, которая обеспечивает разделение слоев на:

- Model - обеспечивает хранение и обработку данных с сервера или пользователя
- View - обеспечивает отображение данных в интерфейсе
- Presenter - выступает в качестве посредником между Model и View

## Интерфейсы данных

Товар

```
interface IItem {
  id: string
  tag: string
  title: string
  description: string
  image: string
  price: number | null
}
```

Пользователь

```
interface IUser {
  address: string
  number: number
  payment: string
  email: string
}
```

Данные для заполнения формы адреса и типа оплаты

```
type IUserAddressAndPayment = Pick<IUser, 'address' | 'payment'>
```

Данные для заполнения номера и эл. почты

```
type IUserNumberAndEmail = Pick<IUser, 'number' | 'email'>
```

## Базовые классы

### Component

Абстрактный класс предназначен для взаимодействия с элементами страницы

Методы класса:

- toggleClass(element: HTMLElement, className: string, force?: boolean) - поменять класс
- setText(element: HTMLElement, value: unknown) - вставить текст
- setDisabled(element: HTMLElement, state: boolean) - Сменить статус блокировки
- setHidden(element: HTMLElement) - скрыть элемент
- setVisible(element: HTMLElement) - показать элемент
- setImage(element: HTMLImageElement, src: string, alt?: string) - установить изображение с альтернативным текстом
- render(data?: Partial<T>): HTMLElement - вернуть корневой DOM-элемент

### Api

Класс Api отвечает за отправлени и получение запросов от сервера

Поля класса:

- baseUrl: string - хранит url
- options: RequestInit; - хранит опции для запроса на сервер

Методы класса:

- handleResponse(response: Response): Promise<object> - обрабатывает ответ от сервера
- get(uri: string) - получает ответ от сервера
- post(uri: string, data: object, method: ApiPostMethods = 'POST') - отправляет запрос на сервер### EventEmitter
Класс EventEmitter который соответствует интерфейсу IEvents, отвечает за обработку событий.
Поля класса:
- _events: Map<EventName,Set<'Subscriber'>> - отвечает за хранение колекции событий
Метода класса:

- on<T extends object>(eventName: EventName, callback: (event: T) => void) - устанавливает обработчик на событие
- off(eventName: EventName, callback: Subscriber) - снимает обработчик с события
- emit<T extends object>(eventName: string, data?: T) - Инициирует событие с данными
- onAll(callback: (event: EmitterEvent) => void) - слушает все события
- offAll() - сбрасывает все обработчики
- trigger<T extends object>(eventName: string, context?: Partial<T>) - делает коллбек тригер, генерирующий событие при вызове

## Классы данных

### Класс itemData

Класс отвечает за хранение и обработку данных с сервера

Поля класса:

- items: IItem[] - поле для сохранения массива карточек
- events: IEvents - поле для сохранения класса events
- preview: IItem - поле для сохранения одной карточки

Методы класса:

- setAllItems(Items: IItem[]):void - cохраняет массив карточек;
- getItem(ItemId: string): IItem - получает карточку по её id;
- getAllItem():IItem[] - получает массив карточек;
- setPreview(item: IItem) - сохраняет одну карточку для показа

### Класс UserData

Класс отвечает за хранение и обработку данных от пользователя

Поля класса:

- order: IUser - сохраняет данные пользователя
- formErrors: FormErrors - поле для ошибок
- events: IEvents - поле для сохранения класса events

Методы класса:

- setOrderField(field: keyof IUser, value: string): void - сохраняет данные пользователя
- validityOrder() - валидирует данные пользователя

### Класс BasketData

Класс отвечает за хранение и обработку данных для корзины от пользователя

Поля класса:

- items: IItem[] - сохраняет карточки в корзине
- events: IEvents - поле для сохранения класса events

Методы класса:

- setAllItems(items: IItem[]) - сохраняет массив карточек
- getFullPrice():number - считает и возвращает сумму всех товаров в корзине
- getCounter():number возвращает количество товаров в корзине
- addItem(item: IItem):void - добавляет карточку в корзину
- deleteItem(itemId: string): void - удаляет товар с корзины
- getBasketItems(item: IItem) - проверяет есть ли карточка в корзине
- deleteAllItem():void - удаляет все карточки с корзины;
- getAllItems():IItem[] - метод получает массив всех товаров с корзины;
- getAllIdItems(items: IItem[]):[] - метод получает id карточек

## Классы представления

### Класс Modal

Класс предназначен для отображения попапа на странице

Поля класса:

- closeButton: HTMLButtonElement - кнопка закрытия
- \_content: HTMLElement - контент попапа

Методы класса:

- set content(value: HTMLElement) - сохраняет контент попапа
- open():void - метод для открытия попапа
- close():void - метод для закрытия попапа
- render():HTMLElement - метод возвращает попап

### Класс Item

Класс наследуется от Component, класс предназначен для отображения товаров на странице

Поля класса:

- itemTitle:HTMLElement - название товара
- itemPrice:HTMLElement - цена товара

Методы класса:

- set id(value: string) - сеттер сохраняет id товара
- set title(value: string) - сеттер сохраняет название товара
- setPrice(price: number | null):string - метод переводит цену из числа в строку

### Класс ItemElement

Класс наследуется от Item, предназначен для отображение товара на странице

Поля класса:

- itemImage:HTMLImageElement - изображение карточки
- itemCategory:HTMLElement - категория товара
- button: HTMLButtonElement - карточка товара
- itemCategoryColor: Record<string, string> - обьект для стилизации категории товара

Cеттеры класса:

- set image(value: string) - подставляет изображение товара
- set category(value: string) - подставляет категорию товара

### Класс BasketItem

Класс наследуется от Item, предназначен для отображения товара в корзине

Поля класса:

- \_index:HTMLElement - индекс элемента
- buttonDelete:HTMLButtonElement - кнопка удаления товара

Сеттеры класса:

- set index(value: string) - подставляет index товара в корзине

### Класс ItemPreview

Класс наследуется от Item, предназначен для отображения полного описания товара

Поля класса:

- itemDescription:HTMLElement - описание товара
- \_itemButton - кнопка купить

Методы класса:

- set itemButton(value: boolean) - подставляет текст на кнопку добавление/удаления корзины
- set description(value: string) - подставляет описание карточки

### Класс Basket

Класс наследуется от Component, предназначен для отображения корзины

Поля класса:

- basketList:HTMLElement - список товаров
- bascetButton:HTMLButtonElement - кнопка оформления
- basketPrice:HTMLElement - общая сумма

Сеттеры класса:

- set fullPrice(value: number) - сеттер сохраняет и отображает полную сумму товара в корзине
- set items(items: HTMLElement[]) - сеттер сохраняет и отображает товар в корзине

### Класс Page

Класс наследуется от Component, предназначен для отображения корзины в шапке

Поля класса:

- headerBascetButton:HTMLButtonElement - кнопка корзины
- headerBascetCounter:HTMLElement - количество товара в корзине
- itemContainer: HTMLElement - контейнер для товара
- wrapper: HTMLElement

Методы класса:

- set itemList(items: HTMLElement[]) - сеттер сохраняет и отображает товар на странице
- set counter(value: number) - сеттер сохраняет значение и отображает количество товара в корзине
- set locked(value: boolean) - Метод для блокировки/разблокировки прокрутки страницы при открытии модального окна

### Класс Form

Класс предназначен для отображения форм

Поля класса:

- buttonSubmit: HTMLButtonElement - кнопка продолжить/оплатить
- \_errors: HTMLElement - текст ошибки

Методы класса:

- onInputChange(field: keyof T, value: string) - создает событие
- set isValid(valid: boolean):void - сеттер блокирует кнопку при невалидных значения
- set errors(value: string) - сеттер отображает текст ошибки

### Класс FormOrder

Класс наследуется от Form, предназначен для отображение формы адреса и типа оплаты

Поля класса:

- \_buttons:HTMLButtonElement[] - кнопки типа оплаты

Сеттеры класса:

- set payment(button: string):void - сеттер добавляет обводку к выбранной кнопке оплаты
- set address(value: string) - сеттер сохраняет значение поля `address`

### Класс FormContacts

Класс наследуется от Form, предназначен для отображения формы с номером и эл. почтой

Сеттеры класса:

- set phone(value: string) - сеттер сохраняет значение поля `phone`
- set email(value: string) - сеттер сохраняет значение поля `email`

### Класс Success

Класс наследуется от Component, предназначен для вывода модального окна с успешным статусом

Поля класса:

- close: HTMLElement - кнопка `за новыми покупками`
- \_total: HTMLElement - выводит полную стоимость покупки

Сеттеры класса:

- set total(value: number) - сеттер отображает полную стоимость покупки

## Cлой комуникации

### Класс AppApi

Класс наследуется от Api, предназначен для реализации взаимодействия с бекендом сервера

Поля Класса:

- cdn:string - содержит url куда отпраляется запрос;

Методы класса:

- getAllItem():Promise - получает список товаров
- getItemId(itemId: string):Promise - получает товар по id
- postItem(data):Promise - отправляет данные на сервер и возвращает результат
