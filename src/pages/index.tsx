import { GetServerSideProps, GetStaticPaths, 
  // GetStaticProps 
} from 'next';
// import { useRouter } from 'next/router';
import  dynamic from 'next/dynamic'
import { useState } from 'react';
import { Title} from '@/styles/pages/Search';
import SEO from '@/components/SEO';

const LazyComponent = dynamic(()=> import('@/components/lazy.'),
{loading: ()=> <p>loading...</p>,ssr:false})

interface IProduct {
  id: string;
  title: string;
}

interface HomeProps{
  recomProducts: IProduct[];
}

// interface ProductProps{
//   products: IProduct[];
// }

export default function Home({recomProducts}:HomeProps) {
  // const router = useRouter();

  // if(router.isFallback){
  //   return <p>Carregando</p>
  // }

  const [isLazy,setLazy] = useState(false);

  function handleLazy(){
    console.log(process.env.NEXT_PUBLIC_API_URL);

    setLazy(true);
  }

  return (
    <div>
      <SEO title="Study" description="Just studiyng NextJS" image="image.jpeg"/>
      <section>
    <Title>Products</Title>
    <ul>
  {recomProducts && recomProducts.map(item=>(
  <li key={item.id}>{item.title}</li>))
  }    
    </ul>
      </section>
      <button onClick={handleLazy}>Lazy</button>
      {isLazy && <LazyComponent/>}
    </div>
  )
}



export const getServerSideProps:GetServerSideProps<HomeProps> = async ()=>{
  const response = await fetch(`${process.env.SECRET_URL}/recommended`)
  const recomProducts = await response.json();

  return {
    props:{
      recomProducts
    }
  }
}

// export const getStaticPaths:GetStaticPaths = async ()=>{

//   const response = await fetch(`http://localhost:3333/categories}`);
//   const categories = await response.json();

//   const paths = categories.map(category=>{
//     return {
//       params: {
//         slug: category.id
//       }
//     }
//   })

//   return {
//     paths: [],
//     fallback: true,
//   }
// }

// export const getStaticProps: GetStaticProps<ProductProps> = async (context)=>{
//   const { slug } = context.params;
//   const response = await fetch(`http://localhost:3333/products?category_id=${slug}`)
//   const products = await response.json();


//   return{
//     props: {
//       products
//     },
//       revalidate: 60,
//   }
// }