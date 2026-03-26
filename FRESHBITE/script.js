/* script.js */
const nutrients = {
    "Overnight Oats Bowl": "450 kcal | Protein: 15g | Carbs: 60g",
    "Grilled Chicken & Rice": "520 kcal | Protein: 35g | Carbs: 50g",
    "Fresh Veggie Salad Bowl": "390 kcal | Protein: 10g | Carbs: 30g",
    "Healthy Chicken Wrap": "480 kcal | Protein: 28g | Carbs: 40g"
};

const foodCards = document.querySelectorAll('.food-card');
const nutrientPanel = document.getElementById('nutrientPanel');

foodCards.forEach(card => {
    card.addEventListener('click', () => {
        const name = card.querySelector('h3').textContent;
        document.getElementById('nutrientTitle').textContent = name;
        document.getElementById('nutrientDetails').textContent = nutrients[name];
        nutrientPanel.classList.add('active');
    });
});

document.getElementById('closeNutrient').addEventListener('click', () => {
    nutrientPanel.classList.remove('active');
});