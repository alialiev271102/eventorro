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

    const { mediaQueryMaxWidth900px, mediaQueryMinWidth600px } = useQueries();

    return (
        <div className={cls.information}>
            {bio? <Panel
                header="Описание"
                bordered
                className={cls.descriptionBlock}
                collapsible={mediaQueryMaxWidth900px}
            >
                {bio === null? "Здесь нет описания": bio}
            </Panel> :
                <Panel
                    header="Примечание"
                    bordered
                    className={cls.noteBlock}
                    collapsible={mediaQueryMaxWidth900px}
                >
                    На платформе EVENTORRO Вы зарегистрированы сейчас как ГОСТЬ. Вы можете добавлять события в избранные и бронировать их. Пожалуйста, обратите внимание, что бронь не является гарантией входа на мероприятие. <br /> Для внесения своего мероприятия на платформу EVENTORRO, вам нужно зарегистрироваться как ОРГАНИЗАТОР. <br />Для этого у вас есть две возможности: <br />1) В настройках профиля (верхний правый угол) выберете опцию «Регистрация как ОРГАНИЗАТОР» и смените статус своего текущего аккаунта со статуса ГОСТЬ на статус ОРГАНИЗАТОР. <br />2) Создайте новый аккаунт со статусом ОРГАНИЗАТОР.

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
