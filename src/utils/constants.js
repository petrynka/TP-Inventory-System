// Статуси завантаження
export const LOADING_STATES = {
    IDLE: 'idle',
    LOADING: 'loading',
    SUCCESS: 'success',
    ERROR: 'error'
};

// Валюти
export const CURRENCIES = {
    USD: 'USD',
    UAH: 'UAH'
};

// Тексти для UI
export const UI_TEXTS = {
    LOADING: 'Завантаження...',
    ERROR: 'Помилка завантаження',
    NO_DATA: 'Немає даних',
    DELETE_CONFIRM: 'Ви впевнені, що хочете видалити цей прихід?',
    DELETE_WARNING: 'Цю дію неможливо скасувати',
    CANCEL: 'Скасувати',
    DELETE: 'Видалити',
    PRODUCTS_COUNT: 'продуктів'
};

// Шляхи API
export const API_PATHS = {
    ORDERS: '/mock/orders.json',
    PRODUCTS: '/mock/products.json'
};