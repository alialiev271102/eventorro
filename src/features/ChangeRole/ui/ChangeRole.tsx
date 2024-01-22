import {Button, IconButton, Loader, Modal, Stack} from "rsuite";
import {useAuthorization} from "@/shared/lib/hooks/useAuthorization/useAuthorization";
import {useCallback, useContext} from "react";
import {axiosInstanceWithBearer} from "@/shared/lib/constants/axiosInstance";
import {userModelSerializer} from "@/shared/lib/helpers/modelserializers";
import {toast} from "react-toastify";
import {axiosErrorHandler} from "@/shared/lib/helpers/axiosErrorHandler";
import {AuthorizationContext} from "@/shared/Providers/AuthorizationProvider";
import {FormProvider, useForm} from "react-hook-form";
import {SignUpFieldsNames} from "@/features/Authorization/model/Authorization.type";
import {HookFormInput} from "@/shared/components/HookFormInput/ui/HookFormInput";
import {BuildingOffice2Icon, XMarkIcon} from "@heroicons/react/24/outline";
import {organizationSchema} from "@/shared/lib/constants/validation";
import {inputStyle260px, inputStyle320px} from "@/features/Authorization/constants/InputStyles";
import {useQueries} from "@/shared/lib/hooks/useMediaQuery";
import cls from './ChangeRole.module.less';
import {Typography} from "@/shared/components/Typography";


export const ChangeRole = () => {
    const {authorizationSetStates, authorizationStates} = useAuthorization();
    const {
        changeRoleLoading, changeRoleModalState
    } = authorizationStates;
    const {setChangeRoleModalState} = authorizationSetStates;

    const {mediaQueryMaxWidth400px} = useQueries();

    const inputStyles = mediaQueryMaxWidth400px ? inputStyle260px : inputStyle320px;
    const inputSize = mediaQueryMaxWidth400px ? 'md' : 'lg';

    const {setUserState, setUserLoading} = useContext(AuthorizationContext);

    const handleClose = useCallback(() => {
        setChangeRoleModalState(false);
    }, [setChangeRoleModalState]);

    const handleOpen = useCallback(() => {
        setChangeRoleModalState(true);
    }, [setChangeRoleModalState]);

    const changeRoleForm = useForm({mode: 'onBlur'});

    const {handleSubmit, formState: {errors}} = changeRoleForm;

    const sendRole = useCallback(async (data: any) => {
        await axiosInstanceWithBearer.put('/accounts/profile/', data)
            .then((response) => {
                setUserState(userModelSerializer(response.data));
                toast.success('Вы успешно изменили данные', {
                    autoClose: 1500
                });
                setChangeRoleModalState(false);
                setTimeout(function() {
                    window.location.reload();
                }, 1000);
            })
            .catch((error) => axiosErrorHandler(error))
            .finally(() => setUserLoading(false));
    }, [setUserLoading, setUserState])

    const roleHandle = async (fieldData: any): Promise<void> => {
        await sendRole({
            organization_name: fieldData.organizationName,
            is_host: true,
            is_guest: false,
        });
    };

    return (
            <Modal
                keyboard
                open={changeRoleModalState}
                onClose={handleClose}
                onOpen={handleOpen}
                size="xs"
                dialogClassName={cls.modalDialog}
                className={cls.modal}
                style={changeRoleLoading ? {pointerEvents: 'none'} : {}}
            >
                {changeRoleLoading
                    && <Loader backdrop content="Загрузка..." size="md" vertical inverse className={cls.loader}/>}
                <Typography tag="h3" variant="title-3" className={cls.title}>
                    Регистрация как Организатор
                    <IconButton onClick={handleClose} icon={<XMarkIcon className={cls.xMarkIcon} />} />
                </Typography>
                <FormProvider {...changeRoleForm}>
                    <form onSubmit={handleSubmit(roleHandle)} className={cls.authorizationType}>
                        <Stack direction="column" spacing={10} alignItems="flex-start">
                            <HookFormInput
                                placeholder="Имя организации *"
                                name={SignUpFieldsNames.ORGANIZATION_NAME}
                                style={inputStyles}
                                startIcon={BuildingOffice2Icon}
                                inputSize={inputSize}
                                isError={errors[SignUpFieldsNames.ORGANIZATION_NAME]! && true}
                                validationSchema={organizationSchema}
                                errorMessage={errors[SignUpFieldsNames.ORGANIZATION_NAME]?.message || undefined}
                            />
                            <Button
                                style={inputStyles}
                                className={cls.submitButton}
                                block
                                type="submit"
                                appearance="ghost"
                                size={mediaQueryMaxWidth400px ? 'sm' : 'md'}
                            >
                                Вход
                            </Button>
                        </Stack>
                    </form>
                </FormProvider>
            </Modal>
    )
}