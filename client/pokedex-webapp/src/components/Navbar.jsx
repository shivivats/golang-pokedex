import React from 'react';
import { Link } from 'react-router-dom';
import { Pokeball } from 'lucide-react';

const Navbar: React.FC = () => {
    return (
        <nav className="bg-pokedex-red text-white p-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="flex items-center space-x-2">
                    <Pokeball className="w-8 h-8" />
                    <span className="text-2xl font-bold">Pokédex</span>
                </Link>
                <div className="space-x-4">
                    <Link to="/" className="hover:text-gray-200 transition">
                        Pokémon List
                    </Link>
                    <Link to="/favorites" className="hover:text-gray-200 transition">
                        Favorites
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;