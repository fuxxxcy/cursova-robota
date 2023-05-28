import { Database } from "../db";
import { Request, Response } from "express-serve-static-core";

const postEmployees = async (req: Request, res: Response) => {
    try {
        const { name, position } = req.body;
    
        await Database('Employees').insert({ name, position });
    
        res.status(201).json({ message: 'Дані успішно додані' });
    } catch (error) {
        console.error('Помилка додавання працівника:', error);
        res.status(500).send('Помилка сервера');
    }
};

const postItineraries = async (req: Request, res: Response) => {
    try {
        const { number, name } = req.body;
    
        await Database('Itineraries').insert({ number, name });
    
        res.status(201).json({ message: 'Дані успішно додані' });
    } catch (error) {
        console.error('Помилка додавання працівника:', error);
        res.status(500).send('Помилка сервера');
    }
};

const postChecklists = async (req: Request, res: Response) => {
    try {
        const { date, issued, returned, receipts, itineraryId, conductorId, cashierId } = req.body;
    
        await Database('Checklists').insert({ date, issued, returned, receipts, itineraryId, conductorId, cashierId });
    
        res.status(201).json({ message: 'Дані успішно додані' });
    } catch (error) {
        console.error('Помилка додавання працівника:', error);
        res.status(500).send('Помилка сервера');
    }
};

const postCollectors = async (req: Request, res: Response) => {
    try {
        const { name } = req.body;
    
        await Database('Collectors').insert({ name });
    
        res.status(201).json({ message: 'Дані успішно додані' });
    } catch (error) {
        console.error('Помилка додавання працівника:', error);
        res.status(500).send('Помилка сервера');
    }
};

const postDCO = async (req: Request, res: Response) => {
    try {
        const { date, EDRPOU, basis, sum, corespondingAccount, destinationCode, analyticalAccountingCode, sender, receiver } = req.body;
    
        await Database('DCO').insert({ date, EDRPOU, basis, sum, corespondingAccount, destinationCode, analyticalAccountingCode, sender, receiver });
    
        res.status(201).json({ message: 'Дані успішно додані' });
    } catch (error) {
        console.error('Помилка додавання працівника:', error);
        res.status(500).send('Помилка сервера');
    }
};

export {
    postEmployees,
    postItineraries,
    postChecklists,
    postCollectors,
    postDCO
};