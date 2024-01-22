import {
    AtSymbolIcon, BuildingOffice2Icon, PhoneIcon,
} from '@heroicons/react/24/outline';
import { FC } from 'react';
import { Panel, Stack } from 'rsuite';

import { Typography } from '@/shared/components/Typography';
import { useQueries } from '@/shared/lib/hooks/useMediaQuery';

import { OrganizationInformationProps } from '../../model/My-Profile.type';
import cls from './OrganizationInformation.module.less';

export const OrganizationInformation: FC<OrganizationInformationProps> = ({ information }) => {
    const {
        bio, organizationName, email, phone,
    } = information;

    const { mediaQueryMaxWidth1200px, mediaQueryMinWidth600px } = useQueries();

    return (
        <div className={cls.information}>
            {bio !== undefined? <Panel
                header="Описание"
                bordered
                defaultExpanded={mediaQueryMinWidth600px}
                className={cls.descriptionBlock}
                collapsible={mediaQueryMaxWidth1200px}
            >
                {bio === null? "Здесь нет описания": bio}
            </Panel> :
                <Panel
                    bordered
                    defaultExpanded={mediaQueryMinWidth600px}
                    className={cls.noteBlock}
                    collapsible={mediaQueryMaxWidth1200px}
                >
                    Для создания события просим вас зарегистрироваться как организатор.
                    Для этого при регистрации выберите статус "Организатор"
                </Panel>}
            <Panel
                className={cls.informationBlock}
                header="Информация"
                bordered
            >
                <Stack direction="column" spacing={10} alignItems="flex-start">
                    <Stack alignItems="flex-start" justifyContent="center" spacing={5}>
                        <AtSymbolIcon className={cls.informationPanelIcon} />
                        <Typography variant="body-3">{email}</Typography>
                    </Stack>
                    {organizationName !== undefined ? <Stack alignItems="flex-start" justifyContent="center" spacing={5}>
                        <BuildingOffice2Icon className={cls.informationPanelIcon}/>
                        <Typography variant="body-3">{organizationName}</Typography>
                    </Stack>: " "}
                    <Stack alignItems="flex-start" justifyContent="center" spacing={5}>
                        <PhoneIcon className={cls.informationPanelIcon} />
                        <Typography variant="body-3">{phone === "" ? 'Нет контактов' : phone}</Typography>
                    </Stack>
                </Stack>
            </Panel>
        </div>
    );
};
