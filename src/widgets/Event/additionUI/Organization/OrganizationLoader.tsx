import { Loader, Panel } from 'rsuite';

import cls from './Organization.module.less';

export const OrganizationLoader = () => (
    <Panel bordered className={cls.organizationLoaderPanel}>
        <Loader size="md" />
    </Panel>
);
