let ingredientDiv = 0;

document.getElementById('add-ingredient-btn').addEventListener('click', function() {
  const container = document.getElementById('ingredients-container');
  ingredientDiv++

  // Create a new div to hold the inputs
  const newRow = document.createElement('div');
  newRow.className = `ingredient-row-${ingredientDiv}`;

  // Add the inputs inside the new div
  newRow.innerHTML = `
    <br>
    <h3>New Ingredient</h3>
    <div class="ingredient-row" data-index="${ingredientDiv}">
      <label for="amount-${ingredientDiv}">Amount</label>
      <input type="number" step="0.01" id="amount-${ingredientDiv}" name="amount[]" placeholder="(e.g., 1.5)" required>
      <label for="unit-${ingredientDiv}">Unit</label>
      <input type="text" id="unit-${ingredientDiv}" name="unit[]" placeholder="(e.g., cups)" required>
      <label for="ingredient_name-${ingredientDiv}">Ingredient Name</label>
      <input type="text" id="ingredient_name-${ingredientDiv}" name="ingredient_name[]" placeholder="(e.g., Flour)" required>
      <label for="notes-${ingredientDiv}">Notes</label>
      <input type="text" id="notes-${ingredientDiv}" name="notes[]" placeholder="(e.g., finely chopped)">
      <button type="button" class="remove-btn">X</button>
    </div>
  `;

  container.appendChild(newRow);

  // Add event listener to the remove button
  newRow.querySelector('.remove-btn').addEventListener('click', function() {
    newRow.remove();
  });
});