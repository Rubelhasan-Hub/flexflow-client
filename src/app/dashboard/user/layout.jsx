import { requireRole } from '@/lib/session';


const UserLayout = async ({ children }) => {

    await requireRole('user');
    return children;

};

export default UserLayout;