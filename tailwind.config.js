/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/client/**/*.{html,js,tsx}', './public/index.html'],
    theme: {
        extend: {
            colors: {
                purpScurp: '#db00ff',
                palePurpScurp: '#DB00FF',
                darkerPurpScurp: '#C000DF',
                bonano: '#fff500',
                paleBonano: '#FFF505',
                gunMetalGrey: '3F3F3F',
                goldie: '#FFD700',
                d33pPurple: '#6A0DAD',
                lightPurp: '#D8BFD8',
                veryDarkGray: '#333333',
                veryLightGray: '#FAFAFA',
            },
            animation: {
                'gradient-x': 'gradient-x 15s ease infinite',
                'gradient-y': 'gradient-y 15s ease infinite',
                'gradient-xy': 'gradient-xy 15s ease infinite',
            },
            keyframes: {
                'gradient-y': {
                    '0%, 100%': {
                        'background-size': '400% 400%',
                        'background-position': 'center top',
                    },
                    '50%': {
                        'background-size': '200% 200%',
                        'background-position': 'center center',
                    },
                },
                'gradient-x': {
                    '0%, 100%': {
                        'background-size': '200% 200%',
                        'background-position': 'left center',
                    },
                    '50%': {
                        'background-size': '200% 200%',
                        'background-position': 'right center',
                    },
                },
                'gradient-xy': {
                    '0%, 100%': {
                        'background-size': '400% 400%',
                        'background-position': 'left center',
                    },
                    '50%': {
                        'background-size': '200% 200%',
                        'background-position': 'right center',
                    },
                },
            },
        },
    },
    plugins: [],
}
