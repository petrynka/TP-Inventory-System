import { useSelector, useDispatch } from 'react-redux';
import { setSelectedType } from '../../store/slices/productsSlice';
import { Select } from '../../components/UI';

const ProductFilter = () => {
    const dispatch = useDispatch();
    const { productTypes, selectedType, filteredList } = useSelector(state => state.products);

    // Створюємо опції для селекта
    const filterOptions = [
        { value: 'all', label: `Всі типи (${filteredList.length})` },
        ...productTypes.map(type => ({
            value: type,
            label: type
        }))
    ];

    const handleTypeChange = (newType) => {
        dispatch(setSelectedType(newType));
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6">
            <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-800">
                    Фільтри продуктів
                </h2>
                
                <div className="flex items-center space-x-4">
                    <div className="min-w-48">
                        <Select
                            label="Тип продукту"
                            options={filterOptions}
                            value={selectedType}
                            onChange={handleTypeChange}
                            placeholder="Виберіть тип"
                        />
                    </div>
                    
                    {/* Показуємо кількість знайдених продуктів */}
                    <div className="text-sm text-gray-500">
                        Знайдено: <span className="font-medium text-gray-700">{filteredList.length}</span> продуктів
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductFilter;