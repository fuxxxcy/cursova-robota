import { Database } from "../db";
import { Request, Response } from "express-serve-static-core";

const deleteEmployees = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        await Database('Employees')
            .where('id', id)
            .del();

        res.sendStatus(200);
    } catch (error) {
        console.error('Помилка видалення працівника:', error);
        res.status(500).send('Помилка сервера');
    }
};

const deleteItineraries = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        await Database('Itineraries')
            .where('id', id)
            .del();

        res.sendStatus(200);
    } catch (error) {
        console.error('Помилка видалення працівника:', error);
        res.status(500).send('Помилка сервера');
    }
};

const deleteChecklists = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        await Database('Checklists')
            .where('id', id)
            .del();

        res.sendStatus(200);
    } catch (error) {
        console.error('Помилка видалення працівника:', error);
        res.status(500).send('Помилка сервера');
    }
};

const deleteCollectors = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        await Database('Collectors')
            .where('id', id)
            .del();

        res.sendStatus(200);
    } catch (error) {
        console.error('Помилка видалення працівника:', error);
        res.status(500).send('Помилка сервера');
    }
};

const deleteDCO = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        await Database('DCO')
            .where('id', id)
            .del();

        res.sendStatus(200);
    } catch (error) {
        console.error('Помилка видалення працівника:', error);
        res.status(500).send('Помилка сервера');
    }
};

export {
    deleteEmployees,
    deleteItineraries,
    deleteChecklists,
    deleteCollectors,
    deleteDCO
};