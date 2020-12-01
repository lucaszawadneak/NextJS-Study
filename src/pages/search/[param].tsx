import { useRouter } from 'next/router';
import { Title} from '../../styles/pages/Search';

export default function Search(){
    const router = useRouter();

    return(
        <Title>{router.query.param}</Title>
    )
}