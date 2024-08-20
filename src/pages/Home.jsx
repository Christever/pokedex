import { useEffect, useState } from "react";
import Logo from "../components/Logo/Logo";
import Pokecard from "../components/Pokecard/Pokecard";
import Nav from "../components/Nav/Nav";
import "./Home.css";
import { toast } from "react-toastify";

export default function Home() {
    // State
    const [pokemons, setPokemons] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchPokemons = async (add = false) => {
        setLoading(true);
        toast.info("Chargement...");
        const response = await fetch(
            `https://pokeapi.co/api/v2/pokemon?limit=30${
                add && "&offset=" + pokemons.length
            }`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        if (!response.ok) {
            toast.error("Une erreur est survenue");
            setLoading(false);
        }
        const data = await response.json();

        // Get the details
        const promises = data.results.map(async (pokemon) => {
            const response = await fetch(
                `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            return await response.json();
        });
        const pokemonDetails = await Promise.all(promises);
        setPokemons([...pokemons, ...pokemonDetails]);
        setLoading(false);
    };

    useEffect(() => {
        fetchPokemons();
    }, []);

    useEffect(() => {
        console.log("Mise a jour");
    }, [setLoading]);

    return (
        <div>
            <div>
                {/* Pokemons */}
                <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-10 max-w-7xl mx-auto mt-10 md:p-0 p-5">
                    {pokemons.map((pokemon, index) => (
                        <Pokecard key={index} pokemon={pokemon} />
                    ))}
                </div>

                <div className="flex justify-center my-10">
                    <button
                        className="button"
                        onClick={() => {
                            fetchPokemons(true);
                        }}
                        disabled={loading}
                    >
                        Encore plus de Pokemons !
                    </button>
                </div>
            </div>
        </div>
    );
}
