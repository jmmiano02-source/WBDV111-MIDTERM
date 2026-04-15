const steps = [
  {
    title: "Select a Specialty",
    desc: "Choose the medical department you need to visit.",
    label: "What type of care are you looking for?"
  },
  {
    title: "Find a Doctor",
    desc: "We will match you with an available professional.",
    label: "Who would you like to meet with?"
  },
  {
    title: "Schedule Your Visit",
    desc: "Choose a time that works best for your day.",
    label: "When can you come in?"
  },
  {
    title: "Review & Confirm",
    desc: "Please check your appointment details below.",
    label: "Does this information look correct?"
  }
];

function updateWizardUI(index) {
  const current = steps[index];
  document.getElementById("stepTitle").textContent = current.title;
  document.getElementById("stepDesc").textContent = current.desc;
  document.getElementById("stepQuestion").textContent = current.label;
}

function handleSelection(type, value) {
  window.HealthSyncState.updateDraft({ [type]: value });
}

document.addEventListener("DOMContentLoaded", () => {
  updateWizardUI(0);
});