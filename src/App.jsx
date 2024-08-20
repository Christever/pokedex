import About from "./pages/About";
import Home from "./pages/Home";
import Error from "./pages/Error";
import CreatePokemon from "./pages/CreatePokemon";
import PokemonDetails from "./pages/PokemonDetails";
import Main from "./layouts/Main";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Main />,
        errorElement: <Error />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: "/about",
                element: <About />,
            },
            {
                path: "/create-pokemon",
                element: <CreatePokemon />,
            },
            {
                path: "/pokemon/:id",
                element: <PokemonDetails />,
            },
        ],
    },
]);

export default function App() {
    return <RouterProvider router={router} />;
}
