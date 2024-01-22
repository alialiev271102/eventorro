import { CalendarDaysIcon } from '@heroicons/react/24/outline';
import { FC } from 'react';
import { Nav } from 'rsuite';

import { useQueries } from '@/shared/lib/hooks/useMediaQuery';

import { OrganizationTabsProps } from '../../model/My-Profile.type';
import cls from './OrganizationTabs.module.less';

export const OrganizationTabs: FC<OrganizationTabsProps> = (props) => {
    const { tabs, setTabs } = props;
    const { mediaQueryMaxWidth530px } = useQueries();
    return (
        <Nav
            appearance="subtle"
            className={cls.organizationTabs}
            activeKey={tabs}
            onSelect={setTabs}
        >
            {mediaQueryMaxWidth530px ? (
                <Nav.Item className={cls.organizationTab} eventKey="my-events">
                    <CalendarDaysIcon className={cls.organizationIcon} />
                </Nav.Item>
            ) : (
                <Nav.Item className={cls.organizationTab} eventKey="my-events">
                    Ивенты организатора
                </Nav.Item>
            )}
        </Nav>
    );
};
