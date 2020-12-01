import { GetServerSideProps, GetStaticPaths, 
  // GetStaticProps 
} from 'next';
import { Title} from '../styles/pages/Search';

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

  return (
    <div>
      <section>
    <Title>Products</Title>
    <ul>
  {recomProducts && recomProducts.map(item=>(
  <li key={item.id}>{item.title}</li>))
  }    
    </ul>
      </section>
    </div>
  )
}



export const getServerSideProps:GetServerSideProps<HomeProps> = async ()=>{
  const response = await fetch('http://localhost:3333/recommended')
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
//     paths,
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