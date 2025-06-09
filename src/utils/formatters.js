/**
 * Форматує дату в різних форматах
 * @param {string} dateString - дата у форматі ISO або MySQL
 * @returns {object} - об'єкт з різними форматами дати
 */
export const formatDate = (dateString) => {
    const date = new Date(dateString);
    
    // Перевіряємо, чи дата валідна
    if (isNaN(date.getTime())) {
        return {
            short: 'Невідома дата',
            full: 'Невідома дата',
            day: '--',
            month: '--',
            year: '--'
        };
    }

    const day = String(date.getDate()).padStart(2, '0');
    const month = date.toLocaleDateString('uk-UA', { month: 'short' });
    const year = date.getFullYear();

    return {
        short: `${day} ${month}`, // "06 Жов"
        full: `${day} ${month} ${year}`, // "06 Жов 2024"
        day,
        month,
        year: String(year)
    };
};

/**
 * Форматує валюту
 * @param {number} amount - сума
 * @param {string} currency - код валюти
 * @returns {string} - відформатована валюта
 */
export const formatCurrency = (amount, currency = 'UAH') => {
    if (typeof amount !== 'number') return '0';
    
    const formattedAmount = new Intl.NumberFormat('uk-UA', {
        minimumFractionDigits: currency === 'UAH' ? 2 : 2,
        maximumFractionDigits: currency === 'UAH' ? 2 : 2,
    }).format(amount);

    return `${formattedAmount} ${currency.toLowerCase()}`;
};

/**
 * Обчислює загальну суму продуктів у приході
 * @param {Array} products - масив продуктів
 * @returns {object} - об'єкт з сумами в різних валютах
 */
export const calculateOrderTotal = (products) => {
    if (!Array.isArray(products) || products.length === 0) {
        return {
            usd: 0,
            uah: 0,
            formatted: {
                usd: formatCurrency(0, 'USD'),
                uah: formatCurrency(0, 'UAH')
            }
        };
    }

    let totalUSD = 0;
    let totalUAH = 0;

    products.forEach(product => {
        if (product.price && Array.isArray(product.price)) {
            const usdPrice = product.price.find(p => p.symbol === 'USD');
            const uahPrice = product.price.find(p => p.symbol === 'UAH');
            
            if (usdPrice) totalUSD += usdPrice.value;
            if (uahPrice) totalUAH += uahPrice.value;
        }
    });

    return {
        usd: totalUSD,
        uah: totalUAH,
        formatted: {
            usd: formatCurrency(totalUSD, 'USD'),
            uah: formatCurrency(totalUAH, 'UAH')
        }
    };
};