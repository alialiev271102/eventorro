import { FC } from 'react';
import { Nav } from 'rsuite';

import { useAuthorization } from '@/shared/lib/hooks/useAuthorization/useAuthorization';

import { AuthorizationTypeProps } from '../../model/Authorization.type';

export const AuthorizationType: FC<AuthorizationTypeProps> = (props) => {
    const { className = '' } = props;
    const { authorizationSetStates, authorizationStates } = useAuthorization();
    const { authorizationType } = authorizationStates;
    const { setAuthorizationType } = authorizationSetStates;
    return (
        <Nav
            appearance="subtle"
            activeKey={authorizationType}
            onSelect={setAuthorizationType}
            className={className}
        >
            <Nav.Item eventKey="sign-in">Вход</Nav.Item>
            <Nav.Item eventKey="sign-up">Регистрация</Nav.Item>
        </Nav>
    );
};
