export function capitalize(input) {
    const [first, ...rest] = input;
    return first.toUpperCase() + rest.join('');
}
