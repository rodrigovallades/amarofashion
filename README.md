# `AMARO front-end challenge` 

## Preview

https://amaro-vallades.herokuapp.com/

## About me

  - Rodrigo Vallades [rodrigo.vallades@gmail.com]
  - GitHub: https://github.com/rodrigovallades
  - Linkedin: http://lnkd.in/p9wz2A

## Technologies, techniques and best practices used

- [x] React 16 + Redux 5 + React-Router 4
- [x] ES6 (consts, lets, arrow functions, spread operator, template strings...)
- [x] Persisting Redux store on localStorage
- [x] Tests with Jest + Enzyme
- [x] SCSS
- [x] BEM CSS naming
- [x] Flexbox
- [x] Mobile-first

## Comments

I believe I met all the requirements for this challenges, but I also included some extra improvements:

- The cart products are persisted and also the current cart visibility (opened or closed);
- The cart opens when adding a new product; this is the default behaviour. But if the user adds the same product again, it won't open subsequently. Just a small UX improvement so the user doesn't have to close the cart again if adding more quantity to the same product;
- Added a button filter to show only products on sale;
- Added a text filter by name;
- Some product images are broken in the included JSON file. I made sure to treat this exception and add a placeholder image when no image found;
- If a product size is not available, it won't be shown to the user. I believe this is a better UX approach than showing a disabled button;
- User can add quantity and remove products from cart.

## Getting started

### Prerequisites

Node.js 5.5+

### Installing
```
npm install
```

### Development
```
npm start
```

### Run tests
```
npm test
```

**Rodrigo Vallades**
