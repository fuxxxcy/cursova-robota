import { Database } from "../db";
import { Request, Response } from "express-serve-static-core";

const getEmployees = async (req: Request, res: Response) => {
    try {
        const employees = await Database.select('id', 'name', 'position').from('Employees');
        res.json(employees);
    } catch (error) {
        console.error('Помилка отримання працівників:', error);
        res.status(500).send('Помилка сервера');
    }
};

const getItineraries = async (req: Request, res: Response) => {
    try {
        const itineraries = await Database.select('id', 'number', 'name').from('Itineraries');
        res.json(itineraries);
    } catch (error) {
        console.error('Помилка отримання працівників:', error);
        res.status(500).send('Помилка сервера');
    }
};

const getChecklists = async (req: Request, res: Response) => {
    try {
        const checklists = await Database
            .select(
                'c.id',
                'c.date',
                'c.issued',
                'c.returned',
                'c.receipts AS receipts',
                'i.name AS itinerary',
                'e1.name AS conductor',
                'e2.name AS cashier'
            )
            .from('Checklists AS c')
            .join('Itineraries AS i', 'c.itineraryId', 'i.number')
            .join('Employees AS e1', 'c.conductorId', 'e1.id')
            .join('Employees AS e2', 'c.cashierId', 'e2.id');

        res.json(checklists);
    } catch (error) {
        console.error('Помилка отримання працівників:', error);
        res.status(500).send('Помилка сервера');
    }
};

const getCollectors = async (req: Request, res: Response) => {
    try {
        const collectors = await Database
            .select('id', 'name')
            .from('Collectors');

        res.json(collectors);
    } catch (error) {
        console.error('Помилка отримання працівників:', error);
        res.status(500).send('Помилка сервера');
    }
};

const getDCO = async (req: Request, res: Response) => {
    try {
        const dco = await Database
            .select(
                'd.id',
                'd.date',
                'd.EDRPOU',
                'd.basis',
                'd.sum',
                'd.corespondingAccount',
                'd.destinationCode',
                'd.analyticalAccountingCode',
                'e1.name AS sender',
                'e2.name AS receiver'
            )
            .from('DCO AS d')
            .join('Employees AS e1', 'd.sender', 'e1.id')
            .join('Employees AS e2', 'd.receiver', 'e2.id')
            .where('d.corespondingAccount', 324)
            .union(function () {
                this.select(
                    'd.id',
                    'd.date',
                    'd.EDRPOU',
                    'd.basis',
                    'd.sum',
                    'd.corespondingAccount',
                    'd.destinationCode',
                    'd.analyticalAccountingCode',
                    'e.name AS sender',
                    'c.name AS receiver'
                )
                .from('DCO AS d')
                .join('Employees AS e', 'd.sender', 'e.id')
                .join('Collectors AS c', 'd.receiver', 'c.id')
                .where('d.corespondingAccount', 30);
            });

        res.json(dco);
    } catch (error) {
        console.error('Помилка отримання працівників:', error);
        res.status(500).send('Помилка сервера');
    }
};

export {
    getEmployees,
    getItineraries,
    getChecklists,
    getCollectors,
    getDCO
};