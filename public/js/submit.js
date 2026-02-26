document.getElementById('add-ingredient-btn').addEventListener('click', function() {
  const container = document.getElementById('ingredients-container');

  // Create a new div to hold the inputs
  const newRow = document.createElement('div');
  newRow.className = 'ingredient-row';

  // Add the inputs inside the new div
  newRow.innerHTML = `
    <br>
    <input type="number" step="0.01" name="amount[]" placeholder="Amount (e.g., 1.5)" required>
    <input type="text" name="unit[]" placeholder="Unit (e.g., cups)" required>
    <input type="text" name="ingredient_name[]" placeholder="Ingredient Name" required>
    <input type="text" name="notes[]" placeholder="Notes (e.g., finely chopped)">
    <button type="button" class="remove-btn">X</button>
  `;

  container.appendChild(newRow);

  // Add event listener to the remove button
  newRow.querySelector('.remove-btn').addEventListener('click', function() {
    newRow.remove();
  });
});