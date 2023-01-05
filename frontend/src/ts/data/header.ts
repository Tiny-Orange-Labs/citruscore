type Header = {
    mode: 'cors' | 'no-cors' | 'same-origin';
    cache: 'default' | 'no-store' | 'reload' | 'no-cache' | 'force-cache' | 'only-if-cached';
    credentials: 'omit' | 'same-origin' | 'include';
    headers: { 'Content-Type': 'application/json' };
};

const header: Header = {
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: { 'Content-Type': 'application/json' },
};

export default header;
