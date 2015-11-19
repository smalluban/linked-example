import MyEngine from './engine';

// This is price filter for mapping value to float
const price = {
  set: p => parseFloat(p),
  get: p => String(p)
};

// Initliazing engine from extends version MyEngine
const engine = new MyEngine(document.body, {
  filters: { price }
});

console.table(engine.state.products);
