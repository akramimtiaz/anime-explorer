const gap = {
    xxs: '2px',
    xs: '4px',
    s: '8px',
    m: '16px',
    l: '24px',
};

const fontSizing = {
    xs: '4px',
    s: '8px',
    m: '18px',
    ml: '24px',
    l: '32px',
    xl: '48px',
};

const colors = {
    primary: '#fe5e00',
    secondary: '#0000',
    tertiary: '#24252b',
    contentPrimary: '#ffff',
    contentSecondary: '#a2a2a2',
    base: '#0000',
};

const theme = {
    colors,
    gap,
    font: {
        sizing: fontSizing,
    }
};

export type ThemeType = typeof theme;

export default theme;