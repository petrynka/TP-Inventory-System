import { fetchMockData } from "./api";

export const getOrders = () =>{
    return fetchMockData('/mock/orders.json')
}