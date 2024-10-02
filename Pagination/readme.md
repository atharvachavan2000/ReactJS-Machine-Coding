Pagination Basics: 
1. What all variables are required?
- Track => Current Page, Items Per Page (Mostly Constant), Total Items
- Derived => Total Pages.

Backend Needs: 
1. Limit, Offset

Backend Should Provide:
1. Total Items

BEM Convention:
Block Element Modifier
Methodology for naming and organizing CSS classes in a way that makes the code more readable and maintainable.
It helps to create reusable components and code sharing in front-end development.

Block: Standalone Entity - Meaningful on it's own.
-> header, menu, button

Element: Component of a block that has no meaning standalone
-> header__title, menu__item, button__icon

Modifier: Represents different state / version of block or element
-> header--large, button--primary

Help keep CSS flat and avoid specificity issues
Just a convention -> Material UI uses it, as well as Vuetify
Readbilitiy, Reusability, Maintainability, Scalability