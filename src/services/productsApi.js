import { fetchMockData } from "./api";

export const getProducts = () => {
    return fetchMockData('/mock/products.json');
}