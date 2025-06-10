import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
    setProducts, 
    setOrders, 
    setLoading, 
    setError, 
    clearProducts 
} from '../../store/slices/productsSlice';
import { getProducts } from '../../services/productsApi';
import { getOrders } from '../../services/ordersApi';
import ProductFilter from './ProductFilter';
import ProductItem from './ProductItem';
import { Button } from '../../components/UI';
import { Package, AlertCircle, Loader2 } from 'lucide-react';

const Products = () => {
    const dispatch = useDispatch();
    const { 
        filteredList, 
        orders, 
        loading, 
        error, 
        selectedType 
    } = useSelector(state => state.products);

    // Завантажуємо дані при монтуванні компонента
    useEffect(() => {
        loadData();

        // Очищаємо стан при демонтуванні
        return () => {
            dispatch(clearProducts());
        };
    }, [dispatch]);

    const loadData = async () => {
        try {
            dispatch(setLoading(true));
            dispatch(setError(null));

            // Завантажуємо продукти та приходи паралельно
            const [productsData, ordersData] = await Promise.all([
                getProducts(),
                getOrders()
            ]);

            dispatch(setProducts(productsData));
            dispatch(setOrders(ordersData));
        } catch (err) {
            console.error('Помилка завантаження даних:', err);
            dispatch(setError(err.message || 'Помилка завантаження даних'));
        } finally {
            dispatch(setLoading(false));
        }
    };

    // Функція для отримання назви приходу по ID
    const getOrderTitle = (orderId) => {
        const order = orders.find(o => o.id === orderId);
        return order ? order.title : null;
    };

    // Повторне завантаження даних
    const handleRetry = () => {
        loadData();
    };

    // Стан завантаження
    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-96">
                <div className="text-center">
                    <Loader2 className="w-12 h-12 text-green-500 animate-spin mx-auto mb-4" />
                    <p className="text-gray-600">Завантаження продуктів...</p>
                </div>
            </div>
        );
    }

    // Стан помилки
    if (error) {
        return (
            <div className="flex items-center justify-center min-h-96">
                <div className="text-center">
                    <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        Помилка завантаження
                    </h3>
                    <p className="text-gray-600 mb-4">{error}</p>
                    <Button onClick={handleRetry}>
                        Спробувати знову
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Заголовок сторінки */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Продукти</h1>
                    <p className="text-gray-600 mt-1">
                        Управління інвентарем та каталогом продуктів
                    </p>
                </div>

                {/* Статистика */}
                <div className="flex items-center space-x-4">
                    <div className="bg-white px-4 py-2 rounded-lg border border-gray-200">
                        <div className="flex items-center space-x-2">
                            <Package className="w-5 h-5 text-green-500" />
                            <div>
                                <p className="text-sm text-gray-500">Всього продуктів</p>
                                <p className="text-lg font-semibold text-gray-900">
                                    {filteredList.length}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Фільтри */}
            <ProductFilter />

            {/* Список продуктів */}
            {filteredList.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
                    <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        Продукти не знайдені
                    </h3>
                    <p className="text-gray-600">
                        {selectedType === 'all' 
                            ? 'У базі даних немає продуктів' 
                            : `Продукти типу "${selectedType}" не знайдені`
                        }
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {filteredList.map((product) => (
                        <ProductItem
                            key={product.id}
                            product={product}
                            orderTitle={getOrderTitle(product.order)}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Products;