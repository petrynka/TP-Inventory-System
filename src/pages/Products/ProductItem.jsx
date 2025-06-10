import { Calendar, DollarSign, Package2, Hash } from 'lucide-react';
import { formatDate, formatCurrency } from '../../utils/formatters';

const ProductItem = ({ product, orderTitle }) => {
    // Отримуємо дефолтну та альтернативну ціни
    const defaultPrice = product.price?.find(p => p.isDefault === 1);
    const alternativePrice = product.price?.find(p => p.isDefault === 0);

    // Форматуємо дати гарантії
    const guaranteeStart = formatDate(product.guarantee?.start);
    const guaranteeEnd = formatDate(product.guarantee?.end);

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
            {/* Header з фото та основною інформацією */}
            <div className="flex items-start space-x-4 mb-4">
                {/* Фото продукту */}
                <div className="flex-shrink-0">
                    <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden">
                        {product.photo ? (
                            <img 
                                src={product.photo} 
                                alt={product.title}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                    e.target.style.display = 'none';
                                    e.target.nextSibling.style.display = 'flex';
                                }}
                            />
                        ) : null}
                        {/* Fallback якщо фото не завантажилось */}
                        <div 
                            className="w-full h-full bg-gray-200 flex items-center justify-center"
                            style={{ display: product.photo ? 'none' : 'flex' }}
                        >
                            <Package2 className="w-8 h-8 text-gray-400" />
                        </div>
                    </div>
                </div>

                {/* Основна інформація */}
                <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 truncate">
                                {product.title}
                            </h3>
                            <p className="text-sm text-gray-500 mt-1">
                                {product.type}
                            </p>
                        </div>
                        
                        {/* Статус новий/вживаний */}
                        <span className={`
                            px-2 py-1 text-xs font-medium rounded-full
                            ${product.isNew === 1 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-yellow-100 text-yellow-800'
                            }
                        `}>
                            {product.isNew === 1 ? 'Новий' : 'Вживаний'}
                        </span>
                    </div>

                    {/* Серійний номер */}
                    <div className="flex items-center space-x-1 mt-2">
                        <Hash className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600">
                            Серійний номер: <span className="font-medium">{product.serialNumber}</span>
                        </span>
                    </div>
                </div>
            </div>

            {/* Деталі продукту */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Гарантія */}
                <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span className="text-sm font-medium text-gray-700">Гарантія</span>
                    </div>
                    <div className="ml-6 space-y-1">
                        <div className="text-sm text-gray-600">
                            <span className="text-gray-500">Початок:</span> {guaranteeStart.full}
                        </div>
                        <div className="text-sm text-gray-600">
                            <span className="text-gray-500">Кінець:</span> {guaranteeEnd.full}
                        </div>
                        <div className="text-xs text-gray-500">
                            ({guaranteeStart.short} - {guaranteeEnd.short})
                        </div>
                    </div>
                </div>

                {/* Ціни */}
                <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                        <DollarSign className="w-4 h-4 text-gray-400" />
                        <span className="text-sm font-medium text-gray-700">Ціна</span>
                    </div>
                    <div className="ml-6 space-y-1">
                        {defaultPrice && (
                            <div className="text-sm">
                                <span className="font-semibold text-gray-900">
                                    {formatCurrency(defaultPrice.value, defaultPrice.symbol)}
                                </span>
                                <span className="text-gray-500 ml-1">(основна)</span>
                            </div>
                        )}
                        {alternativePrice && (
                            <div className="text-sm text-gray-600">
                                {formatCurrency(alternativePrice.value, alternativePrice.symbol)}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Прихід та специфікації */}
            <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Назва приходу */}
                    <div>
                        <span className="text-sm text-gray-500">Прихід:</span>
                        <p className="text-sm font-medium text-gray-800 mt-1">
                            {orderTitle || 'Невідомий прихід'}
                        </p>
                    </div>

                    {/* Дата створення */}
                    <div>
                        <span className="text-sm text-gray-500">Дата створення:</span>
                        <p className="text-sm font-medium text-gray-800 mt-1">
                            {formatDate(product.date).full}
                        </p>
                    </div>
                </div>

                {/* Специфікації */}
                {product.specification && (
                    <div className="mt-3">
                        <span className="text-sm text-gray-500">Специфікації:</span>
                        <p className="text-sm text-gray-700 mt-1 bg-gray-50 p-2 rounded">
                            {product.specification}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductItem;