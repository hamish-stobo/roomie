/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/client/**/*.{html,js,tsx}', './public/index.html'],
    theme: {
        extend: {
            colors: {
                purpScurp: '#db00ff',
                palePurpScurp: '#DB00FF',
                bonano: '#fff500',
                paleBonano: '#FFF505',
                gunMetalGrey: '3F3F3F',
                goldie: '#FFD700',
                d33ppurple: '#6A0DAD',
                lightPurp: '#D8BFD8',
                veryDarkGray: '#333333',
                veryLightGray: '#FAFAFA',
            },
        },
    },
    plugins: [],
}
