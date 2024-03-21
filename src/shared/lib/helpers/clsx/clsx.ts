interface ClassDictionary {
    [name: string]: boolean | null | undefined;
}

type ClassValue = string | undefined | ClassDictionary;

export const clsx = (...args: ClassValue[]): string => {
    let classNames:string = '';

    for (let index: number = 0; index < args.length; index += 1) {
        const className = args[index];

        // eslint-disable-next-line no-continue
        if (!className) continue;

        if (typeof className === 'string') {
            classNames += ` ${args[index]}`;
        }

        if (typeof className === 'object') {
            const obj: ClassDictionary = args[index] as ClassDictionary;

            // eslint-disable-next-line no-loop-func
            Object.keys(obj).forEach((cn) => {
                if (obj[cn]) {
                    classNames += ` ${cn}`;
                }
            });
        }
    }

    return classNames.trim();
};
