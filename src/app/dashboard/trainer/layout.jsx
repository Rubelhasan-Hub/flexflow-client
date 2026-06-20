import { requireRole } from '@/lib/session';


const TrainerLayout = async({ children }) => {

    await requireRole('trainer') ;
    return  children ;

};

export default TrainerLayout;