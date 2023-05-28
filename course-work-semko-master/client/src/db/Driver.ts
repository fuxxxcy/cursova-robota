import type { Employee, Itinerary, Collector, Checklist, CashOrder } from "../components/Tables";

export const AddEmploees = async () => {
    let data: Employee[] = [];

    await fetch('http://localhost:4000/api/employees')
        .then(response => response.json())
        .then(_data => {
            data = _data;
        })
        .catch(error => {
            console.error('Помилка отримання даних:', error);
        });
        
    return data;
};

export const AddItineraries = async () => {
    let data: Itinerary[] = [];

    await fetch('http://localhost:4000/api/itineraries')
        .then(response => response.json())
        .then(_data => {
            data = _data;
        })
        .catch(error => {
            console.error('Помилка отримання даних:', error);
        });
        
    return data;
};

export const AddCollectors = async () => {
    let data: Collector[] = [];

    await fetch('http://localhost:4000/api/collectors')
        .then(response => response.json())
        .then(_data => {
            data = _data;
        })
        .catch(error => {
            console.error('Помилка отримання даних:', error);
        });
        
    return data;
};

export const AddChecklists = async () => {
    let data: Checklist[] = [];

    await fetch('http://localhost:4000/api/checklists')
        .then(response => response.json())
        .then(_data => {
            data = _data;
        })
        .catch(error => {
            console.error('Помилка отримання даних:', error);
        });
        
    return data;
};

export const AddCashOrders = async () => {
    let data: CashOrder[] = [];

    await fetch('http://localhost:4000/api/dco')
        .then(response => response.json())
        .then(_data => {
            data = _data;
        })
        .catch(error => {
            console.error('Помилка отримання даних:', error);
        });
        
    return data;
};