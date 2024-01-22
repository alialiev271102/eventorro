import { addDays } from 'date-fns';
import { DateRangePicker, InputPicker, Stack, Button } from 'rsuite';
import { DateRange, RangeType } from 'rsuite/DateRangePicker';

import { Typography } from '@/shared/components/Typography';
import { useFilter } from '@/shared/lib/hooks/useFilter/useFilter';
import { useQueries } from '@/shared/lib/hooks/useMediaQuery';
import React, { useState } from 'react';

import cls from './FilterDesktop.module.less';

export const FilterDesktop = () => {
    const { filterStates, filterSetStates } = useFilter();
    const { mediaQueryMaxWidth768px } = useQueries();

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
            value: [addDays(new Date(), 1), addDays(new Date(), 1)],
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
        <div className={cls.filterDesktop}>
            <Stack direction="column" alignItems="flex-start" spacing={10}>
                <Stack direction="column" alignItems="flex-start" spacing={5}>
                    <Typography bold variant="body-3">Дата:</Typography>
                    <DateRangePicker
                        style={{ width: 228 }}
                        showOneCalendar
                        placeholder="Выберите дату"
                        block
                        disabled={filterLoading}
                        editable={false}
                        disabledDate={DateRangePicker.beforeToday && DateRangePicker.beforeToday()}
                        ranges={Ranges}
                        value={dateRangeValue}
                        format="dd-MM-yyy"
                        onChange={onChangeDatePicker}
                    />
                </Stack>
                <Stack direction="column" alignItems="flex-start" spacing={5}>
                    <Typography bold variant="body-3">Локация:</Typography>
                    <InputPicker
                        style={{ width: 228 }}
                        onChange={setLocation}
                        value={location}
                        data={locations}
                        disabled={filterLoading}
                        placeholder={filterLoading ? 'Загрузка...' : 'Выберите локацию'}
                    />
                </Stack>
                <Stack direction="column" alignItems="flex-start" spacing={5}>
                    <Typography bold variant="body-3">Категория:</Typography>
                    <InputPicker
                        style={{ width: 228 }}
                        onChange={setCategory}
                        value={category}
                        data={categories}
                        disabled={filterLoading}
                        placeholder={filterLoading ? 'Загрузка...' : 'Выберите категории'}
                    />
                </Stack>
                <Stack direction="column" alignItems="flex-start" spacing={5}>
                    <Typography bold variant="body-3">Возраст:</Typography>
                    <InputPicker
                        style={{ width: 228 }}
                        onChange={setAge}
                        value={age}
                        data={ages}
                        disabled={filterLoading}
                        placeholder={filterLoading ? 'Загрузка...' : 'Выберите возраст'}
                    />
                </Stack>
                <Stack direction="column" alignItems="flex-start" spacing={5}>
                    <Typography bold variant="body-3">Аудитория:</Typography>
                    <InputPicker
                        style={{ width: 228 }}
                        onChange={setAudience}
                        value={audience}
                        data={audiences}
                        disabled={filterLoading}
                        placeholder={filterLoading ? 'Загрузка...' : 'Выберите аудиторию'}
                    />
                </Stack>
                <Stack direction="column" alignItems="center" spacing={5} justifyContent='center'>
                    <Typography bold variant="body-3"> </Typography>
                        <Button
                            onClick={resetAllPicker}
                            appearance="primary"
                            size={mediaQueryMaxWidth768px ? 'xs' : 'md'}
                            style={{width: "100%", padding: '7px 57px'}}
                        >
                            Очистить фильтр                    
                        </Button>           
                </Stack>
            </Stack>
        </div>
    );
};
