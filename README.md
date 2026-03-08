1. var, let, and const are all used to declare variables in JavaScript but they behave differently.
var is the older way of declaring variables. It has function scope and can be both redeclared and reassigned.
let was introduced in ES6. It has block scope and can be reassigned but it cannot be redeclared in the same scope.
const is also block-scoped like let but its value cannot be reassigned after it is declared.

2. The spread operator (...) is used to expand or unpack elements from arrays or objects. It is
commonly used to copy, merge, or pass elements easily. For example it can be used to copy an array 
or combine multiple arrays into one. It also works with objects to merge properties. This operator 
makes the code shorter and easier to read when working with arrays and objects.

3. These are array methods used to work with elements inside an array but they serve different 
purposes.
map() is used when you want to transform each element in an array and return a new array with the 
updated values.
filter() is used to select elements that meet a certain condition and returns a new array with only 
those elements.
forEach() simply loops through each element in the array and executes a function but it does not 
return a new array.

4. An arrow function is a shorter and cleaner way to write functions in JavaScript. It was 
introduced in ES6 and uses the => syntax.
Arrow functions help make code more concise and are commonly used in modern JavaScript, especially 
when working with array methods like map(), filter(), and forEach().
They are especially useful for writing small simple functions.

5. Template literals are a modern way of creating strings in JavaScript. They use backticks ( ` ` ) 
instead of single or double quotes. One of their biggest advantages is that they allow you to 
easily insert variables or expressions inside a string using the ${} syntax. They also support 
multi-line strings, which makes writing long text or formatted output much easier.
