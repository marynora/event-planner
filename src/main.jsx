import React from 'react';
import ReactDOM from 'react-dom/client';
import { EventPage } from './pages/EventPage';
import { EventsPage } from './pages/EventsPage';
import { AboutPage } from "./pages/AboutPage";
import { EventsProvider } from "./context/EventsContext";
import { Provider } from './components/ui/provider';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Root } from './components/Root';
import { Toaster } from "./components/ui/toaster";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        element: <EventsPage />,
      },
      {
        path: "event/:eventId",
        element: <EventPage />,
      },
      {
        path: "about",
        element: <AboutPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider>
      <EventsProvider>
        <RouterProvider router={router} />
        <Toaster />
      </EventsProvider>
    </Provider>
  </React.StrictMode>,
);