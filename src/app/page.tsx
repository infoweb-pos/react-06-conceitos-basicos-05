"use client";

import { useEffect, useState } from "react";

const ProdutoCard = ({info}: {info: ProdutoTipo}) => {
  // props
  // props.info => { info }
  return (
      <div>
        <img src={info.imagemUrl} />
        <h3>{info.titulo}</h3>
        <p>{info.descricao}</p>
        <span>{info.preco}</span>
        <span>{info.avaliacao}</span>
      </div>
  );
}


const Produtos = ({dados}: {dados: Array<ProdutoTipo>}) => {
  const cartoes = dados.map( (item) => {
    return <ProdutoCard info={item} key={item.id} />
  });

  console.log(cartoes);

  // props.dados[0].titulo
  return (
    <div>
      {
        dados.map( (item: ProdutoTipo) => {
          if (item.avaliacao > 3)
            return (<ProdutoCard info={item} key={item.id} />);
          else
            return null;
        })
      }
    </div>

  );
}

type ProdutoTipo = {
  id: number,
  titulo: string,
  descricao: string,
  preco: number,
  avaliacao: number,
  imagemUrl?: string
};

const Home = () => {
  const [produtos, setProdutos] = useState<ProdutoTipo[]>([]);
  
  useEffect(() => {
    fetch("https://dummyjson.com/products/")
      .then(res => res.json())
      .then(json => {
        // console.log(json);
        // setProdutos(json);
        // console.log(json.products);
        return json.products;
      })
      .then((produtosApi: []) => {
        // setProdutos(produtos);
        const produtos = produtosApi.map( (item: any) => {
          return {
            id: item.id,
            titulo: item.title,
            descricao: item.description,
            preco: item.price,
            avaliacao: item.rating,
            imagemUrl: item.thumbnail
          }
        });
        console.log(produtos);
        setProdutos(produtos);
      });
  }, []);

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <header>
        <h1>Minha aplicação web com Next</h1>
      </header>
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <h2>Lista de produtos</h2>
        <Produtos dados={produtos} />
      </main>
    </div>
  );
}

export default Home;