import { useRouter } from 'next/router';
import { Title} from '@/styles/pages/Search';
import SEO from '@/components/SEO';

export default function Search(){
    const router = useRouter();

    return(
        <div>
        <SEO title="Item" shouldExcludeTitleSuffix={true}/>
        <Title>{router.query.param}</Title>
        </div>
    )
}