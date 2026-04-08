# 📘 JavaScript ES6+ Concepts — Assignment 005

A beginner-friendly web project that visually demonstrates and explains
core modern JavaScript (ES6+) concepts through interactive examples.

---

## 🛠️ Technologies Used

- **HTML5** — Structure and markup
- **CSS3** — Styling and layout
- **JavaScript (ES6+)** — Core logic and interactivity

---

## ✨ Features

- 📌 **var, let & const** — Explains scope differences with live examples
- 📌 **Spread Operator (`...`)** — Demonstrates array/object spreading and merging
- 📌 **Array Methods** — Interactive examples of `map()`, `filter()`, and `forEach()`
- 📌 **Arrow Functions** — Shows concise ES6 arrow function syntax vs traditional functions
- 📌 **Template Literals** — Covers string interpolation and multi-line strings

---

## 📦 Dependencies

This project uses **no external libraries or frameworks** — just plain HTML,
CSS, and JavaScript. No installation of packages required.

---

## 🚀 Running Locally

1. **Clone the repository**
```bash
   git clone https://github.com/TOMAL5085/ASSIGNMENT-005.git
```

2. **Navigate into the project folder**
```bash
   cd ASSIGNMENT-005
```

3. **Open in your browser**
   - Simply open `index.html` directly in any modern browser, **or**
   - Use the [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)
     extension in VS Code for auto-reload support.

---

## 🔗 Links

| Resource | Link |
|----------|------|
| 🌐 Live Demo | [View Live](#) *(https://tomal5085.github.io/ASSIGNMENT-005/)* |
| 💻 Repository | [github.com/TOMAL5085/ASSIGNMENT-005](https://github.com/TOMAL5085/ASSIGNMENT-005) |

---

## 📁 Project Structure

```
ASSIGNMENT-005/
├── assets/          # Images and static resources
├── index.html       # Main HTML file
├── style.css        # Stylesheet
└── script.js        # JavaScript logic
```



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
