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

## Архитектура приложения
Архитектура приложения реализована на Model-View-Presenter, которая обеспечивает разделение слоев на:  
- Model - обеспечивает хранение и обработку данных с сервера или пользователя
- View - обеспечивает отображение данных в интерфейсе
- Presenter - выступает в качестве посредником между Model и View

## Интерфейсы данных

Товар
```
interface IItem {
  _id: string
  index?:number
  tag?: string
  title: string
  description?: string
  image?: string
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

### Api 
Класс Api отвечает за отправлени и получение запросов от сервера  

Поля класса:  
- baseUrl: string - хранит url
- options: RequestInit; - хранит опции для запроса на сервер 

Методы класса:  
- handleResponse(response: Response): Promise<object> - обрабатывает ответ от сервера
- get(uri: string) - получает ответ от сервера 
- post(uri: string, data: object, method: ApiPostMethods = 'POST') - отправляет запрос на сервер

### EventEmitter
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
- items: IItem[] - массив товара;
- _id: string - id карточки
- tag: string - тег карточки
- title: string - название карточки
- description: string - описание карточки
- image: string - картинка карточки
- price: number | null - цена карточки

Методы класса:  
- setAllItems(Items: IItem[]):void - cохраняет массив карточек;
- getItem(ItemId: string): IItem - получает карточку по её id;
- getAllItem():IItem[] - получает массив карточек;


### Класс UserData
Класс отвечает за хранение и обработку данных от пользователя

Поля класса:  
- address: string - адрес пользователя
- number: number - номер пользователя
- payment: string - тип оплаты
- email: string - эл. почта пользователя

Методы класса: 
- setAddressAndPayment(data: IUserAddressAndPayment):void - сохраняет адрес и тип оплаты пользователя
- setNumberAndEmail(data: IUserNumberAndEmail): void - сохраняет номер и тип оплаты пользователя
- validityAddressAndPayment():boolean -
валидирует поля адреса и типа оплаты
- validityNumberAndEmail():boolean - 
валидирует поля номера и эл. почты пользователя
- getNumberAndEmail():IUserNumberAndEmail - получает номер и эл.почту от пользователя
- getAddressAndPayment():IUserAddressAndPayment - получает адрес и тип оплаты от пользователя

### Класс BasketData 
Класс отвечает за хранение и обработку данных для корзины от пользователя  

Поля класса:  
- items: IItem[];

Методы класса:  
- getFullPrice():number - считает и возвращает сумму всех товаров в корзине
- getCounter():number возвращает количество товаров в корзине
- addItem(item: IItem):void - добавляет карточку в корзину
- deleteItem(itemId: string): void - удаляет товар с корзины
- deleteAllItem():void - удаляет все карточки с корзины;
- getAllItems():IItem[] - метод получает массив всех товаров с корзины;
- getAllIdItems(items: IItem[]):[] - метод получает id карточек

## Классы представления

### Класс Modal
Класс предназначен для отображения попапа на странице  

Поля класса:  
- closeButton: HTMLButtonElement;
- popup: HTMLElement
- page: HTMLElement
- content: HTMLElement


Методы класса:
- open():void - метод для открытия попапа
- close():void - метод для закрытия попапа
- render():HTMLElement - метод возвращает попап

### Класс Item
Класс предназначен для отображения товаров на странице

Поля класса:  
- itemElement:HTMLElement - темплейт товара
- itemTitle:HTMLElement - название товара
- itemCategory:HTMLElement - категория товара
- itemPrice:HTMLElement - цена товара
- itemImage:HTMLImageElement - изображение товара

Методы класса:  
- setPrice(price: number | null):string - метод переводит цену из числа в строку
- render(item: IItem):HTMLElement - возвращает карточку

### Класс BasketItem
Класс наследуется от Item, предназначен для отображения товара в корзине  

Поля класса:
- index:HTMLElement - индекс элемента
- buttonDelete:HTMLButtonElement - кнопка удаления товара 

Методы класса:
- render(item: IItem):HTMLElement - возвращает карточку

### Класс ItemPreview
Класс наследуется от Item, предназначен для отображения полного описания товара  

Поля класса:  
- itemDescription:HTMLElement - описание товара
- itemButton - кнопка купить

Методы класса:  
- render(Item: IItem):HTMLElement - возвращает карточку

### Класс Basket
Класс предназначен для отображения корзины  

Поля класса:  

- basket:HTMLElement - контейнер корзины
- basketList:HTMLElement - список товаров
- bascetButton:HTMLButtonElement - кнопка оформления
- price:HTMLElement - общая сумма

Методы класса:  
- setFullPrice(price: number):string - метод сохраняет и отображает полную сумму товара в корзине

### Класс BascetHeader
Класс наследуется от Bascet, предназначен для отображения корзины в шапке 

Поля класса:
- headerBascet:HTMLButtonElement - кнопка корзины
- headerCount:HTMLElement - количество товара в корзине

Методы класса: 
- setCount(total: number):number - метод сохраняет значение и отображает количество товара в корзине


### Класс Form
Класс предназначен для отображения форм  

Поля класса:
- form:HTMLFormElement - форма
- buttonSubmit:HTMLButtonElement - кнопка продолжить/оплатить
- formError:HTMLElement - текст ошибки

Методы класса:
- isValid(valid: boolean):void - метод блокирует кнопку при невалидных значения
- render():HTMLFormElement - возвращает форму


### Класс FormAddressAndPaymant
Класс наследуется от Form, предназначен для отображение формы адреса и типа оплаты  

Поля класса:  
- buttons:HTMLButtonElement[] - кнопки типа оплаты

Методы класса:  
- buttonSelected(button: string):void - метод добовляет обводку к выбранной кнопке оплаты


### Класс FormNumberAndEmail
Класс наследуется от Form, предназначен для отображения формы с номером и эл. почтой  

Поля класса:  
- inputs:HTMLInputElement[] - поля ввода

### Класс Success
Класс предназначен для вывода модального окна с успешным статусом  

Поля класса:  
- success:HTMLElement - темплейт модального окна
- description:HTMLElement - элемент для вывода суммы покупки
- button:HTMLButtonElement - кнопка закрытия

Методы класса:  
- render(price:number):HTMLElement - возвращает модальное окно



## Cлой комуникации

### Класс AppApi
Класс наследуется от Api, предназначен для реализации взаимодействия с бекендом сервера

Поля Класса: 
- cdn:string - содержит url куда отпраляется запрос;

Методы класса:  
- getAllItem():Promise - получает список товаров
- getItemId(itemId: string):Promise - получает товар по id
- postItem(data):Promise - отправляет данные на сервер и возвращает результат 

## Взаимодействие данных и представление осуществляется за счет брокера событий выступающего в роли презентера

Все события:  
- item:select - Выбор карточки для отображение в модальном окне
- basket:open - Открытие корзины  
- addItem:add - Добавление товара в корзину
- deleteItem:delete - Удаление товара из корзины
- formAddressAndPayment:validity - Валидация формы адреса и типа оплаты
- formNumberAndEmail:validity -  Валидация формы номера и телефона
- formContinue:select - переход на следующий этап оформление заказа
- formSubmit:submit - подтверждение и отпрака заказа
- clearBasket:delete - очищение всей корзины

