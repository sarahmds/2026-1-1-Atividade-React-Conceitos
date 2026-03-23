"use client";
import { useEffect, useState } from "react";
import { getProdutosTodos } from "@/services/api";

export default function Home() {
  const [produtos, atualizarProdutos] = useState([]);
  const [busca, atualizarBusca] = useState("");

  useEffect(() => {
    getProdutosTodos().then((resultado) => {
      atualizarProdutos(resultado.data.products);
    });
  }, []);

  const produtosFiltrados = produtos.filter((produto) =>
    produto.title.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div className="flex flex-col items-center p-8 bg-zinc-50 min-h-screen">
      <header className="flex flex-col items-center gap-4 mb-10">
        <h1 className="text-2xl font-bold">Pesquisa de produtos</h1>
        <input
          type="text"
          placeholder="Digite o nome do produto..."
          className="p-2 border border-gray-300 rounded-md w-80 text-black"
          value={busca}
          onChange={(e) => atualizarBusca(e.target.value)}
        />
      </header>

      <main className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-5xl">
        {produtosFiltrados.map((produto) => (
          <div key={produto.id} className="bg-white p-4 rounded-lg shadow-md border dark:bg-zinc-900 text-black">
            <img 
              src={produto.images[0]} 
              alt={produto.title} 
              className="w-full h-40 object-contain mb-4"
            />
            <h3 className="font-bold text-lg">{produto.title}</h3>
            <p className="text-sm text-gray-600 mb-2">{produto.description}</p>
            <p className="text-blue-600 font-semibold">R$ {produto.price}</p>
          </div>
        ))}
      </main>
    </div>
  );
}