import {FunnelIcon} from '@heroicons/react/24/outline';
import {startOfDay} from 'date-fns';
import {useState} from 'react';
import {Button, DateRangePicker, InputPicker, Stack,} from 'rsuite';
import {DateRange, RangeType} from 'rsuite/DateRangePicker';

import {Typography} from '@/shared/components/Typography';
import {clsx} from '@/shared/lib/helpers/clsx';
import {useFilter} from '@/shared/lib/hooks/useFilter/useFilter';
import {useQueries} from '@/shared/lib/hooks/useMediaQuery';
import cls from './FilterMobile.module.less';

export const FilterMobile = () => {
    const [show, setShow] = useState<boolean>(false);
    const {filterSetStates, filterStates} = useFilter();
    const {mediaQueryMaxWidth768px} = useQueries();
    const {
        categories, ages, audiences, locations,
        category, age, audience, location, filterLoading,
    } = filterStates;
    const {
        setCategory, setLocation, setAudience, setAge, setDate,
    } = filterSetStates;

    const Ranges: RangeType[] = [
        {
            label: 'Сегодня',
            value: [startOfDay(new Date()), startOfDay(new Date())],
        },
    ];

    const [dateRangeValue, setDateRangeValue] = useState<DateRange | null>(null);
    const onChangeDatePicker = (value: DateRange | null) => {
        if (value) {
            const firstDate = value[0].toISOString().slice(0, 10);
            const secondDate = value[1].toISOString().slice(0, 10);
            setDateRangeValue(value);
            setDate([firstDate, secondDate]);
        } else {
            setDateRangeValue(null)
            setDate([]);
        }
    };
    const resetAllPicker = () => {
        onChangeDatePicker(null);
        setAge('');
        setCategory('');
        setLocation('');
        setAudience('');
    }

    return (
        <div className={cls.filterMobile}>
            <div className={!show? cls.noBigBlock :cls.bigBlock} onClick={() => setShow(false)}> </div>
            <Button
                    block
                    appearance="primary"
                    className={cls.showHiddenButton}
                    onClick={() => setShow((prevState) => !prevState)}
                >
                        {show ? 'Скрыть фильтр' : 'Показать фильтр'}
                        <FunnelIcon width={20} height={20} className={cls.funnelIcon}/>
                </Button>
            <div className={clsx(cls.filters, {[cls.filtersShow]: show})}>
                <div className={cls.filterBlock}>
                    <div className={cls.filter}>
                        <Typography bold variant="body-3">Дата:</Typography>
                        <DateRangePicker
                            block
                            showOneCalendar
                            placeholder="Выберите ДАТУ И ВРЕМЯ НАЧАЛА мероприятия"
                            disabled={filterLoading}
                            editable={false}
                            disabledDate={DateRangePicker.beforeToday && DateRangePicker.beforeToday()}
                            ranges={Ranges}
                            format="dd-MM-yyy"
                            value={dateRangeValue}
                            onChange={onChangeDatePicker}
                        />
                    </div>
                    <div className={cls.filter}>
                        <Typography bold variant="body-3">Локация:</Typography>
                        <InputPicker
                            block
                            disabled={filterLoading}
                            onChange={setLocation}
                            value={location}
                            data={locations}
                            placeholder={filterLoading ? 'Загрузка...' : 'Выберите локацию'}
                        />
                    </div>
                    <div className={cls.filter}>
                        <Typography bold variant="body-3">Категория:</Typography>
                        <InputPicker
                            block
                            disabled={filterLoading}
                            onChange={setCategory}
                            value={category}
                            data={categories}
                            placeholder={filterLoading ? 'Загрузка...' : 'Выберите категории'}
                        />
                    </div>
                    <div className={cls.filter}>
                        <Typography bold variant="body-3">Возраст:</Typography>
                        <InputPicker
                            block
                            disabled={filterLoading}
                            onChange={setAge}
                            value={age}
                            data={ages}
                            placeholder={filterLoading ? 'Загрузка...' : 'Выберите возраст'}
                        />
                    </div>
                    <div className={cls.filter}>
                        <Typography bold variant="body-3">Аудитория:</Typography>
                        <InputPicker
                            block
                            disabled={filterLoading}
                            onChange={setAudience}
                            value={audience}
                            data={audiences}
                            placeholder={filterLoading ? 'Загрузка...' : 'Выберите аудиторию'}
                        />
                    </div>
                    <div>
                        <Typography bold variant="body-3"> </Typography>
                        <Button
                            onClick={resetAllPicker}
                            appearance="primary"
                            size={mediaQueryMaxWidth768px ? 'xs' : 'md'}
                            style={{width: "100%", padding: '7px 57px'}}
                        >
                            Очистить фильтр
                        </Button>
                    </div>

                </div>
            </div>
        </div>
    );
};
