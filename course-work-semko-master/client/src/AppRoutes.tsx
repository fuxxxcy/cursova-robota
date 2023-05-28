import { createBrowserRouter } from "react-router-dom";
import ContextTable from "./components/ContextTable";
import { ChecklistsTable, EmploeesTable, CollectorsTable, ItinerariesTable } from "./components/Tables";
import CashOrdersTable from "./components/Tables/DCO";
import HomePage from "./components/HomePage";
import { CreateCollector, CreateEmployee, CreateItinerary, CreateDCO, CreateChecklist } from "./components/CreateRows";

const AppRoutes = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <div>Ooops, there're nothing</div>
  },
  {
    path: "/employees/",
    element: <ContextTable component={EmploeesTable} />
  },
  {
    path: "/employees/add/",
    element: <CreateEmployee />
  },
  {
    path: "/itineraries/",
    element: <ContextTable component={ItinerariesTable} />
  },
  {
    path: "/itineraries/add/",
    element: <CreateItinerary />
  },
  {
    path: "/collectors/",
    element: <ContextTable component={CollectorsTable} />
  },
  {
    path: "/collectors/add/",
    element: <CreateCollector />
  },
  {
    path: "/checklists/",
    element: <ContextTable component={ChecklistsTable} />
  },
  {
    path: "/checklists/add/",
    element: <CreateChecklist />
  },
  {
    path: "/dco/",
    element: <ContextTable component={CashOrdersTable} />
  },
  {
    path: "/dco/add/",
    element: <CreateDCO />
  },
  {
    path: "*",
    element: <div>Ooops, there're nothing</div>
  }
]);

export default AppRoutes;
