import { useRouter } from 'next/router';
import { Header } from 'rsuite';

import { Layout } from '@/shared/components/Layout';

import { Logo, NavbarOptions } from '../additionUI';
import cls from './Navbar.module.less';

export const Navbar = () => {
    const { push } = useRouter();

    return (
        <Header className={cls.Header}>
            <Layout className={cls.navbar}>
                <Logo onClick={() => push('/')} className={cls.logo} />
                <NavbarOptions />
            </Layout>
        </Header>

    );
};
