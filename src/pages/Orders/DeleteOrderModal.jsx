import { useSelector, useDispatch } from 'react-redux';
import { AlertTriangle } from 'lucide-react';
import { Modal, Button } from '../../components/UI';
import { hideDeleteModal, deleteOrder } from '../../store/slices/ordersSlice';
import { UI_TEXTS } from '../../utils/constants';

const DeleteOrderModal = ({ orderToDelete }) => {
    const dispatch = useDispatch();
    const { showDeleteModal } = useSelector(state => state.orders);

    const handleClose = () => {
        dispatch(hideDeleteModal());
    };

    const handleDelete = () => {
        if (orderToDelete) {
            dispatch(deleteOrder(orderToDelete.id));
            dispatch(hideDeleteModal());
        }
    };

    if (!orderToDelete) return null;

    return (
        <Modal
            isOpen={showDeleteModal}
            onClose={handleClose}
            title="Підтвердження видалення"
            size="small"
        >
            <div className="text-center">
                {/* Іконка попередження */}
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                    <AlertTriangle className="h-6 w-6 text-red-600" />
                </div>

                {/* Текст підтвердження */}
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                    {UI_TEXTS.DELETE_CONFIRM}
                </h3>
                
                <p className="text-sm text-gray-500 mb-2">
                    <strong>"{orderToDelete.title}"</strong>
                </p>
                
                <p className="text-sm text-gray-500 mb-6">
                    {UI_TEXTS.DELETE_WARNING}
                </p>

                {/* Кнопки дій */}
                <div className="flex space-x-3 justify-center">
                    <Button
                        variant="secondary"
                        onClick={handleClose}
                    >
                        {UI_TEXTS.CANCEL}
                    </Button>
                    
                    <Button
                        variant="danger"
                        onClick={handleDelete}
                    >
                        {UI_TEXTS.DELETE}
                    </Button>
                </div>
            </div>
        </Modal>
    );
};

export default DeleteOrderModal;