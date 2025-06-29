import { Outlet } from 'react-router';
import AppNav from './AppNav';
import Footer from './Footer';
import { Toaster } from 'react-hot-toast';

const PageLayout = () => {
    return (
        <div className='container h-screen flex flex-col items-center justify-between'>
            <AppNav/>
            <Outlet/>
            <Footer/>
            <div><Toaster/></div>
        </div>
    );
};

export default PageLayout;