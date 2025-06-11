import { describe, test, expect } from 'vitest'
import reducer, {
  setOrders,
  addOrder,
  deleteOrder,
  clearOrders
} from '../store/slices/ordersSlice';

describe('ordersSlice', () => {
  const initialState = {
    list: [],
    selectedOrder: null,
    loading: false,
    error: null,
    showDeleteModal: false,
  };

  test('setOrders', () => {
    const result = reducer(initialState, setOrders([{ id: 1 }]));
    expect(result.list).toHaveLength(1);
  });

  test('addOrder', () => {
    const result = reducer(initialState, addOrder({ id: 2 }));
    expect(result.list).toEqual([{ id: 2 }]);
  });

  test('deleteOrder', () => {
    const state = { ...initialState, list: [{ id: 1 }, { id: 2 }] };
    const result = reducer(state, deleteOrder(1));
    expect(result.list).toEqual([{ id: 2 }]);
  });

  test('clearOrders', () => {
    const dirtyState = {
      list: [{ id: 1 }],
      selectedOrder: { id: 1 },
      loading: true,
      error: 'Oops!',
      showDeleteModal: true,
    };
    const result = reducer(dirtyState, clearOrders());
    expect(result).toEqual(initialState);
  });
});
