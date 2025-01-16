//Enrick Aliberti version 0.2
class Autocomplete {
  constructor(inputElement, options) {
    if (!inputElement) throw new Error("Input element is required.");

    this.inputElement = inputElement;
    this.options = Object.assign({
      data: [], // Array di valori per il completamento automatico
      maxSuggestions: 10, // Numero massimo di suggerimenti da mostrare
      filter: (item, query) => item.toLowerCase().includes(query.toLowerCase()), // Funzione di filtro
      onSelect: null, // Callback per la selezione
      renderSuggestion: null // Funzione personalizzata per il rendering dei suggerimenti
    }, options);

    this.currentFocus = -1;
    this.init();
  }

  init() {
    // Aggiunge gli eventi al campo di input
    this.inputElement.addEventListener("input", this.handleInput.bind(this));
    this.inputElement.addEventListener("keydown", this.handleKeydown.bind(this));
    document.addEventListener("click", this.closeAllLists.bind(this));
  }

  handleInput() {
    const query = this.inputElement.value;
    if (!query) {
      this.closeAllLists();
      return;
    }

    // Filtra e limita i suggerimenti
    const suggestions = this.options.data
      .filter(item => this.options.filter(item, query))
      .slice(0, this.options.maxSuggestions);

    this.renderSuggestions(suggestions);
  }

  renderSuggestions(suggestions) {
    this.closeAllLists(); // Chiude tutte le liste precedenti
    const suggestionList = document.createElement("div");
    suggestionList.setAttribute("id", `${this.inputElement.id}-autocomplete-list`);
    suggestionList.setAttribute("class", "autocomplete-items");

    // Crea gli elementi di suggerimento
    suggestions.forEach(item => {
      const suggestionItem = document.createElement("div");
      
      // Usa il render custom se fornito, altrimenti usa quello predefinito
      if (this.options.renderSuggestion) {
        suggestionItem.innerHTML = this.options.renderSuggestion(item, this.inputElement.value);
      } else {
        suggestionItem.innerHTML = `<strong>${item.substr(0, this.inputElement.value.length)}</strong>${item.substr(this.inputElement.value.length)}`;
      }

      // Aggiunge un input nascosto per mantenere il valore
      suggestionItem.innerHTML += `<input type="hidden" value="${item}">`;

      // Aggiunge evento click per selezionare l'elemento
      suggestionItem.addEventListener("click", () => {
        this.inputElement.value = item;
        this.closeAllLists();
        if (this.options.onSelect) this.options.onSelect(item); // Callback selezione
      });

      suggestionList.appendChild(suggestionItem);
    });

    this.inputElement.parentNode.appendChild(suggestionList);
  }

  handleKeydown(e) {
    const suggestionList = document.getElementById(`${this.inputElement.id}-autocomplete-list`);
    let items = suggestionList ? suggestionList.getElementsByTagName("div") : [];
    if (e.keyCode === 40) {
      // Freccia giù
      this.currentFocus++;
      this.addActive(items);
    } else if (e.keyCode === 38) {
      // Freccia su
      this.currentFocus--;
      this.addActive(items);
    } else if (e.keyCode === 13) {
      // Invio
      e.preventDefault();
      if (this.currentFocus > -1 && items[this.currentFocus]) {
        items[this.currentFocus].click();
      }
    }
  }

  addActive(items) {
    if (!items) return;
    this.removeActive(items);
    if (this.currentFocus >= items.length) this.currentFocus = 0;
    if (this.currentFocus < 0) this.currentFocus = items.length - 1;
    items[this.currentFocus].classList.add("autocomplete-active");
  }

  removeActive(items) {
    Array.from(items).forEach(item => item.classList.remove("autocomplete-active"));
  }

  closeAllLists(elmnt) {
    const items = document.getElementsByClassName("autocomplete-items");
    Array.from(items).forEach(item => {
      if (elmnt !== item && elmnt !== this.inputElement) {
        item.parentNode.removeChild(item);
      }
    });
  }
}
