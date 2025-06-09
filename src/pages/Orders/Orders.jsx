import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Package, Calendar, Trash2, Menu } from 'lucide-react';
import { 
    setOrders, 
    setLoading, 
    setError, 
    setSelectedOrder,
    showDeleteModal 
} from '../../store/slices/ordersSlice';
import { setProducts } from '../../store/slices/productsSlice';
import { getOrders } from '../../services/ordersApi';
import { getProducts } from '../../services/productsApi';
import { formatDate, calculateOrderTotal } from '../../utils/formatters';
import { UI_TEXTS } from '../../utils/constants';
import { Button } from '../../components/UI';
import OrderDetail from './OrderDetail';
import DeleteOrderModal from './DeleteOrderModal';

const Orders = () => {
    const dispatch = useDispatch();
    const { list: orders, loading, error, selectedOrder } = useSelector(state => state.orders);
    const { list: products } = useSelector(state => state.products);
    const [orderToDelete, setOrderToDelete] = useState(null);

    // Завантажуємо дані при монтуванні компонента
    useEffect(() => {
        const loadData = async () => {
            dispatch(setLoading(true));
            dispatch(setError(null));
            
            try {
                // Завантажуємо і замовлення, і продукти паралельно
                const [ordersData, productsData] = await Promise.all([
                    getOrders(),
                    getProducts()
                ]);
                
                dispatch(setOrders(ordersData));
                dispatch(setProducts(productsData));
            } catch (err) {
                dispatch(setError(err.message));
                console.error('Помилка завантаження даних:', err);
            } finally {
                dispatch(setLoading(false));
            }
        };

        loadData();
    }, [dispatch]);

    // Обробник кліку на замовлення
    const handleOrderClick = (order) => {
        // Якщо клікнули на те ж замовлення, закриваємо деталі
        if (selectedOrder?.id === order.id) {
            dispatch(setSelectedOrder(null));
        } else {
            dispatch(setSelectedOrder(order));
        }
    };

    // Обробник видалення замовлення  
    const handleDeleteClick = (e, order) => {
        e.stopPropagation(); // Зупиняємо всплиття події
        setOrderToDelete(order);
        dispatch(showDeleteModal());
    };

    // Отримуємо кількість продуктів і суму для кожного замовлення
    const getOrderStats = (orderId) => {
        const orderProducts = products.filter(product => product.order === orderId);
        const totals = calculateOrderTotal(orderProducts);
        
        return {
            productsCount: orderProducts.length,
            totals
        };
    };

    // Якщо завантаження
    if (loading) {
        return (
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold text-gray-900">
                        Приходы / <span className="text-gray-500">--</span>
                    </h1>
                </div>
                
                <div className="grid grid-cols-1 gap-4">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="card animate-pulse">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-4">
                                    <div className="w-8 h-8 bg-gray-200 rounded"></div>
                                    <div className="space-y-2">
                                        <div className="h-4 bg-gray-200 rounded w-48"></div>
                                        <div className="h-3 bg-gray-200 rounded w-32"></div>
                                    </div>
                                </div>
                                <div className="w-16 h-8 bg-gray-200 rounded"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    // Якщо помилка
    if (error) {
        return (
            <div className="space-y-4">
                <h1 className="text-2xl font-bold text-gray-900">
                    Приходы / <span className="text-gray-500">0</span>
                </h1>
                
                <div className="card text-center py-8">
                    <p className="text-red-600 mb-4">{error}</p>
                    <Button 
                        onClick={() => window.location.reload()}
                        variant="secondary"
                    >
                        Спробувати знову
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {/* Заголовок */}
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900">
                    Приходы / <span className="text-gray-500">{orders.length}</span>
                </h1>
            </div>

            {/* Список замовлень */}
            <div className="grid grid-cols-1 gap-4">
                {orders.length === 0 ? (
                    <div className="card text-center py-8">
                        <Package className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                        <p className="text-gray-500">
                            {UI_TEXTS.NO_DATA}
                        </p>
                    </div>
                ) : (
                    orders.map(order => {
                        const stats = getOrderStats(order.id);
                        const formattedDate = formatDate(order.date);
                        const isSelected = selectedOrder?.id === order.id;
                        
                        return (
                            <div
                                key={order.id}
                                onClick={() => handleOrderClick(order)}
                                className={`
                                    card cursor-pointer transition-all duration-200 hover:shadow-md
                                    ${isSelected ? 'ring-2 ring-green-500 bg-green-50' : 'hover:bg-gray-50'}
                                `}
                            >
                                <div className="flex items-center justify-between">
                                    {/* Ліва частина - основна інформація */}
                                    <div className="flex items-center space-x-4 flex-1">
                                        {/* Іконка */}
                                        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                                            <Package className="w-5 h-5 text-green-600" />
                                        </div>

                                        {/* Інформація */}
                                        <div className="flex-1">
                                            <h3 className="font-medium text-gray-900 mb-1">
                                                {order.title}
                                            </h3>
                                            
                                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                                                {/* Дата */}
                                                <div className="flex items-center space-x-1">
                                                    <Calendar className="w-4 h-4" />
                                                    <span>{formattedDate.short}</span>
                                                </div>
                                                
                                                {/* Кількість продуктів */}
                                                <div className="flex items-center space-x-1">
                                                    <Menu className="w-4 h-4" />
                                                    <span>{stats.productsCount} {UI_TEXTS.PRODUCTS_COUNT}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Права частина - ціна і дії */}
                                    <div className="flex items-center space-x-3">
                                        {/* Ціна */}
                                        {stats.totals.usd > 0 || stats.totals.uah > 0 ? (
                                            <div className="text-right">
                                                <div className="font-medium text-gray-900">
                                                    {stats.totals.formatted.usd}
                                                </div>
                                                <div className="text-sm text-gray-500">
                                                    {stats.totals.formatted.uah}
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="text-right">
                                                <div className="text-sm text-gray-400">
                                                    Немає ціни
                                                </div>
                                            </div>
                                        )}

                                        {/* Кнопка видалення */}
                                        <Button
                                            variant="ghost"
                                            size="small"
                                            onClick={(e) => handleDeleteClick(e, order)}
                                            className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>

            {/* Деталі замовлення (бічна панель) */}
            {selectedOrder && <OrderDetail />}

            {/* Модалка видалення */}
            <DeleteOrderModal orderToDelete={orderToDelete} />
        </div>
    );
};

export default Orders;