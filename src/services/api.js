const delay = (ms) => new Promise((res) => setTimeout(res, ms));

export const fetchMockData = async (filePath) => {
    await delay(500) // delay simulation
    const response = await fetch(filePath);
    if(!response.ok) throw new Error('Не вдалося завантажити дані');
    await response.json();
}