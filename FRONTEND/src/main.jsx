import ReactDOM from 'react-dom/client';
import App from './routes/App.jsx';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ChakraProvider } from "@chakra-ui/react";
import ErrorPage from './routes/ErrorPage.jsx';
import Root from './routes/Root.jsx';
import Postulantes from './routes/Postulantes.jsx';
import Todospostulantes from './routes/TodosPostulantes.jsx';
import Postular from './routes/Postular.jsx';


const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <App />,
        
      },

      {
        path: '/postulantesA',
        element: <Postulantes />,
      },

      {
        path: '/postulantes',
        element: < Todospostulantes/>,
      },
      {
        path: '/postular',
        element: < Postular/>,
      },

    ],
  },
 
  



]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <ChakraProvider>
    <RouterProvider router={router} />
  </ChakraProvider>
);