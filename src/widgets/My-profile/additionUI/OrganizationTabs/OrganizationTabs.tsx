import {
    BookmarkIcon, CalendarDaysIcon, PlusIcon, TicketIcon,
} from '@heroicons/react/24/outline';
import { FC } from 'react';
import { Nav } from 'rsuite';

import { useQueries } from '@/shared/lib/hooks/useMediaQuery';

import { OrganizationTabsProps } from '../../model/My-Profile.type';
import cls from './OrganizationTabs.module.less';

export const OrganizationTabs: FC<OrganizationTabsProps> = (props) => {
    const { tabs, setTabs, user} = props;
    const { mediaQueryMaxWidth530px } = useQueries();
    return (
        <Nav
            appearance="subtle"
            className={cls.organizationTabs}
            activeKey={tabs}
            onSelect={setTabs}
        >
            {mediaQueryMaxWidth530px ? (
                <>
                    <Nav.Item className={cls.organizationTab} eventKey="tickets">
                        <TicketIcon className={cls.organizationIcon} />
                    </Nav.Item>
                    <Nav.Item className={cls.organizationTab} eventKey="bookmarks">
                        <BookmarkIcon className={cls.organizationIcon} />
                    </Nav.Item>
                    {user.isHost?
                        <>
                        <Nav.Item className={cls.organizationTab} eventKey="my-events">
                        <CalendarDaysIcon className={cls.organizationIcon}/>
                        </Nav.Item>
                        <Nav.Item className={cls.organizationTab} eventKey="create-event">
                        <PlusIcon className={cls.organizationIcon} />
                        </Nav.Item>
                        </>: " "}
                </>
            ) : (
                <>
                    <Nav.Item className={cls.organizationTab} eventKey="tickets">
                        Мои брони
                    </Nav.Item>
                    <Nav.Item className={cls.organizationTab} eventKey="bookmarks">
                        Избранные
                    </Nav.Item>
                    {user.isHost ?
                        <>
                        <Nav.Item className={cls.organizationTab} eventKey="my-events">
                        Мои ивенты
                        </Nav.Item>
                        <Nav.Item className={cls.organizationTab} eventKey="create-event">
                        Создать ивент
                        </Nav.Item>
                        </>: " "}
                </>
            )}
        </Nav>
    );
};
