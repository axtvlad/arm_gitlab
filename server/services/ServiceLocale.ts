class ServiceLocale {
    /**
     * Example:
     *      - Входные данные: "text {{variable1}} text {{variable1}} {{variable2}}"
     *
     *      - `ServiceLocale.setVariableValues(req.__('i18n-Translate-Code'), value)`
     *          - Результат: "text value text {{variable1}} {{variable2}}"
     *
     *      - `ServiceLocale.setVariableValues(req.__('i18n-Translate-Code'), [value1, value2], false)`
     *          - Результат: "text value1 text value2 {{variable2}}"
     *
     *      - `ServiceLocale.setVariableValues(req.__('i18n-Translate-Code'), [value1, value2])`
     *          - Результат: "text value1 text value1 value2"
     * @param str Строка
     * @param values Строка или массив значений
     * @param isGlobalChangeVariable Изменять ли глобально все одинаковые переменные; по умолчанию true
     */
    static setVariableValues(str: string, values: Array<any> | string, isGlobalChangeVariable: boolean = true) {
        if (!Array.isArray(values)) {
            values = [values];
        }

        if (values && values.length) {
            const match = str.match(/({{([^}}]+)}})/gms);

            match.forEach((x, key) => {
                if (key >= values.length) {
                    return;
                }

                str = str.replace(new RegExp(x, isGlobalChangeVariable && 'g'), values[key]);
            });
        }

        return str;
    }
}

export default ServiceLocale;
