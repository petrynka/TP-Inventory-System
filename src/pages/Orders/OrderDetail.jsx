import { useSelector, useDispatch } from 'react-redux';
import { X, Calendar, Package, DollarSign } from 'lucide-react';
import { setSelectedOrder } from '../../store/slices/ordersSlice';
import { formatDate, calculateOrderTotal } from '../../utils/formatters';
import { Button } from '../../components/UI';
import { UI_TEXTS } from '../../utils/constants';

const OrderDetail = () => {
    const dispatch = useDispatch();
    const { selectedOrder } = useSelector(state => state.orders);
    const { list: products } = useSelector(state => state.products);

    if (!selectedOrder) return null;

    // Знаходимо продукти, що належать до цього приходу
    const orderProducts = products.filter(product => product.order === selectedOrder.id);
    
    // Обчислюємо загальну суму
    const totals = calculateOrderTotal(orderProducts);
    
    // Форматуємо дату
    const formattedDate = formatDate(selectedOrder.date);

    const handleClose = () => {
        dispatch(setSelectedOrder(null));
    };

    return (
        <div className="fixed right-0 top-0 h-full w-1/2 bg-white shadow-xl border-l border-gray-200 z-40 animate-slideIn">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50">
                <h2 className="text-lg font-semibold text-gray-900">
                    Деталі приходу
                </h2>
                <Button
                    variant="ghost"
                    size="small"
                    onClick={handleClose}
                    className="p-1"
                >
                    <X className="w-5 h-5" />
                </Button>
            </div>

            {/* Content */}
            <div className="p-4 overflow-y-auto h-full pb-20">
                {/* Основна інформація */}
                <div className="mb-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-3">
                        {selectedOrder.title}
                    </h3>
                    
                    {selectedOrder.description && (
                        <p className="text-gray-600 text-sm mb-4">
                            {selectedOrder.description}
                        </p>
                    )}

                    {/* Метрики */}
                    <div className="grid grid-cols-1 gap-3">
                        {/* Дата */}
                        <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                            <Calendar className="w-5 h-5 text-gray-500" />
                            <div>
                                <p className="text-sm font-medium text-gray-900">
                                    Дата створення
                                </p>
                                <p className="text-sm text-gray-500">
                                    {formattedDate.full}
                                </p>
                            </div>
                        </div>

                        {/* Кількість продуктів */}
                        <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                            <Package className="w-5 h-5 text-gray-500" />
                            <div>
                                <p className="text-sm font-medium text-gray-900">
                                    Кількість продуктів
                                </p>
                                <p className="text-sm text-gray-500">
                                    {orderProducts.length} {UI_TEXTS.PRODUCTS_COUNT}
                                </p>
                            </div>
                        </div>

                        {/* Загальна сума */}
                        <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                            <DollarSign className="w-5 h-5 text-gray-500" />
                            <div>
                                <p className="text-sm font-medium text-gray-900">
                                    Загальна сума
                                </p>
                                <p className="text-sm text-gray-500">
                                    {totals.formatted.usd} / {totals.formatted.uah}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Список продуктів */}
                {orderProducts.length > 0 && (
                    <div>
                        <h4 className="text-md font-medium text-gray-900 mb-3">
                            Продукти в приході
                        </h4>
                        
                        <div className="space-y-3">
                            {orderProducts.map(product => {
                                const usdPrice = product.price?.find(p => p.symbol === 'USD');
                                const uahPrice = product.price?.find(p => p.symbol === 'UAH');
                                
                                return (
                                    <div key={product.id} className="border border-gray-200 rounded-lg p-3">
                                        <div className="flex items-start space-x-3">
                                            {/* Фото продукту */}
                                            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                                                {product.photo ? (
                                                    <img 
                                                        src={product.photo} 
                                                        alt={product.title}
                                                        className="w-full h-full object-cover rounded-lg"
                                                        onError={(e) => {
                                                            e.target.style.display = 'none';
                                                        }}
                                                    />
                                                ) : (
                                                    <Package className="w-6 h-6 text-gray-400" />
                                                )}
                                            </div>

                                            {/* Інформація про продукт */}
                                            <div className="flex-1">
                                                <h5 className="font-medium text-gray-900 text-sm">
                                                    {product.title}
                                                </h5>
                                                <p className="text-xs text-gray-500 mb-1">
                                                    {product.type}
                                                </p>
                                                <p className="text-xs text-gray-500">
                                                    SN: {product.serialNumber}
                                                </p>
                                                
                                                {/* Ціна */}
                                                <div className="mt-2 text-xs">
                                                    <span className="text-gray-900 font-medium">
                                                        {usdPrice && `${usdPrice.value} USD`}
                                                        {usdPrice && uahPrice && ' / '}
                                                        {uahPrice && `${uahPrice.value} UAH`}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Статус (новий/б/у) */}
                                            <div className="text-right">
                                                <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                                                    product.isNew 
                                                        ? 'bg-green-100 text-green-600' 
                                                        : 'bg-yellow-100 text-yellow-600'
                                                }`}>
                                                    {product.isNew ? 'Новий' : 'Б/У'}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* Порожній стан */}
                {orderProducts.length === 0 && (
                    <div className="text-center py-8">
                        <Package className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                        <p className="text-gray-500 text-sm">
                            У цьому приході немає продуктів
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default OrderDetail;