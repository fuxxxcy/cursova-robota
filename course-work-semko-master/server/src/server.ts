import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { getChecklists, getCollectors, getDCO, getEmployees, getItineraries } from "./actions/GetActions";
import { deleteItineraries, deleteChecklists, deleteCollectors, deleteDCO, deleteEmployees } from "./actions/DeleteActions";
import { postEmployees, postItineraries, postChecklists, postCollectors, postDCO } from "./actions/PostActions";

const app = express();
const corsOptions: cors.CorsOptions = {
    origin: "http://localhost:3000"
};

app.use(cors(corsOptions));
app.use(bodyParser.json());


app.get("/api/employees", async (req, res) => await getEmployees(req, res));
app.get("/api/itineraries", async (req, res) => await getItineraries(req, res));
app.get("/api/checklists", async (req, res) => await getChecklists(req, res));
app.get("/api/collectors", async (req, res) => await getCollectors(req, res));
app.get("/api/dco", async (req, res) => await getDCO(req, res));

app.delete("/api/employees/d/:id", async (req, res) => await deleteEmployees(req, res));
app.delete("/api/itineraries/d/:id", async (req, res) => await deleteItineraries(req, res));
app.delete("/api/checklists/d/:id", async (req, res) => await deleteChecklists(req, res));
app.delete("/api/collectors/d/:id", async (req, res) => await deleteCollectors(req, res));
app.delete("/api/dco/d/:id", async (req, res) => await deleteDCO(req, res));


app.post("/api/employees/add", async (req, res) => await postEmployees(req, res));
app.post("/api/itineraries/add", async (req, res) => await postItineraries(req, res));
app.post("/api/checklists/add", async (req, res) => await postChecklists(req, res));
app.post("/api/collectors/add", async (req, res) => await postCollectors(req, res));
app.post("/api/dco/add", async (req, res) => await postDCO(req, res));

const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`listening port ${port}`);
});
