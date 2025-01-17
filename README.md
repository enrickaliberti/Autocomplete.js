# 🌟 Autocomplete.js

**Autocomplete.js** is a lightweight and customizable JavaScript library for adding autocomplete functionality to input fields. Perfect for enhancing the user experience in web applications, this library is easy to use and highly configurable. 🚀

![Autocomplete.js Preview](https://placehold.co/800x400?text=Autocomplete.js)

## ✨ Features

- 📋 **Easy to use**: Simple setup with minimal configuration.
- ⚡ **High performance**: Optimized for large datasets.
- 🔧 **Customizable**: Configure filtering, rendering, and selection behaviors.
- 🎨 **Style-friendly**: Easily customizable with CSS.
- 🔄 **Cross-browser compatible**: Works with all modern browsers.

---

## 📦 Installation

1. **Clone the repository or download the file:**
   ```bash
   git clone https://github.com/enrickaliberti/autocomplete-js.git

2. Include the library in your project:
   ```html
   <script src="autocomplete.js"></script>
   
3. Add basic styling:
   ```css
      .autocomplete {
        /*the container must be positioned relative:*/
        position: relative;
        display: inline-block;
      }
      .autocomplete-items {
        position: absolute;
        border: 1px solid #d4d4d4;
        border-bottom: none;
        border-top: none;
        z-index: 99;
        /*position the autocomplete items to be the same width as the container:*/
        top: 100%;
        left: 0;
        right: 0;
      }
      .autocomplete-items div {
        padding: 10px;
        cursor: pointer;
        background-color: #fff;
        border-bottom: 1px solid #d4d4d4;
      }
      .autocomplete-items div:hover {
        /*when hovering an item:*/
        background-color: #e9e9e9;
      }
      .autocomplete-active {
        /*when navigating through the items using the arrow keys:*/
        background-color: DodgerBlue !important;
        color: #ffffff;
      }
   
## 🚀 Usage

## 1️⃣ HTML
Add an input field to your HTML:
     `<div style="position: relative; width: 300px;">
       `<input id="myInput" type="text" placeholder="Start typing...">
     `</div>

## 2️⃣ JavaScript

Initialize Autocomplete.js:
    
      const data = ["Apple", "Orange", "Banana", "Mango", "Cherry", "Strawberry"];
      new Autocomplete(document.getElementById("myInput"), {
        data: data,
        maxSuggestions: 5,
        filter: (item, query) => item.toLowerCase().startsWith(query.toLowerCase()),
        onSelect: (item) => alert("You selected: ${item}"),
        renderSuggestion: (item, query) => "<strong>${query}</strong>${item.substr(query.length)}",
      });

## ⚙️ Configuration

Autocomplete.js is configurable through an options object. Here are the available options:
| Option             | Type       | Default                | Description                                                                 |
|--------------------|------------|------------------------|-----------------------------------------------------------------------------|
| `data`             | `Array`    | `[]`                   | Array of values for autocomplete suggestions.                               |
| `maxSuggestions`   | `Number`   | `10`                   | Maximum number of suggestions to display.                                   |
| `filter`           | `Function` | `(item, query)`        | Function to filter suggestions based on the user's query.                   |
| `onSelect`         | `Function` | `null`                 | Callback triggered when a suggestion is selected. Receives the selected value as an argument. |
| `renderSuggestion` | `Function` | `null`                 | Custom function to render each suggestion. Receives the suggestion and the query as arguments. |

### 🛠️ Development
If you'd like to contribute:

Fork the repository.
Create a new branch:
`git checkout -b feature-new-functionality`.
Make your changes and open a pull request.

### 📄 License
This project is licensed under the MIT License. See the LICENSE file for more details.

### 💬 Feedback or Questions?
We'd love to hear from you! Open an issue or reach out via email.

🎉 Thank you for using Autocomplete.js!

