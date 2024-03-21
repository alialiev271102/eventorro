import { useRouter } from 'next/router';
import { FC } from 'react';
import { Button, Panel, Stack } from 'rsuite';

import { ProgressiveImageLoader } from '@/shared/components/ProgressiveImageLoader';
import { Typography } from '@/shared/components/Typography';

import { OrganizationProps } from '../../model/Event.type';
import cls from './Organization.module.less';

export const Organization: FC<OrganizationProps> = (props) => {
    const { email, avatar, organizationName } = props;
    const { push } = useRouter();
    return (
        <Panel bordered className={cls.organizationPanel} style={{}}>
            <Stack>
                <div className={cls.organizationAvatar}>
                    <ProgressiveImageLoader
                        width={80}
                        height={80}
                        src={avatar}
                        className={cls.organizationAvatar}
                        heightUnitsOfMeasure="px"
                        widthUnitsOfMeasure="px"
                        errorImage=""
                    />
                </div>
                <Stack direction="column" alignItems="flex-start">
                    <Typography variant="body-1" bold className={cls.organizationPanelName}>
                        {organizationName}
                    </Typography>
                    <Button
                        appearance="link"
                        className={cls.organizationPanelLink}
                        onClick={() => push(`/profiles/${email}`)}
                    >
                        {email}
                    </Button>
                </Stack>
            </Stack>
        </Panel>
    );
};
