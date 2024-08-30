<template>
  <div class="showcase">
    <div>
      <h1>Theme Showcase</h1>
      <h2>Explore the Look and Feel</h2>
    </div>

    <section class="intro">
      <p>
        This is a demonstration of the global styles applied to various elements.
        Observe how the colors, fonts, and layout are consistently applied throughout this component.
      </p>
    </section>

    <section class="controls">
      <button class="btn-primary">Primary Button</button>
      <button class="btn-secondary">Secondary Button</button>
      <button class="btn-accent">Accent Button</button>
      <button class="btn-disabled" disabled>Disabled Button</button>
    </section>

    <section class="form">
      <h3>Input Fields</h3>
      <input type="text" placeholder="Text Input" />
      <textarea placeholder="Textarea"></textarea>
    </section>

    <section class="card">
      <h4>Card Title</h4>
      <p>This is an example of a card component. It uses shadows and rounded corners to create a clean and modern look.</p>
    </section>


  </div>
</template>

<script>
export default {
  name: 'ShowcaseComponent',
};
</script>

<style scoped>
.showcase {
  padding: 20px;
}

.intro p {
  color: var(--text-400);
}

.controls {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}



input, textarea {
  border: 1px solid var(--background-300);
  border-radius: var(--border-radius-md);
  padding: 10px;
  margin-bottom: 10px;
}

input:focus, textarea:focus {
  border-color: var(--primary);
  outline: none;
}

.card {
  background-color: var(--background-50);
  border-radius: var(--border-radius-lg);
  padding: 20px;
  box-shadow: var(--shadow-md);
  margin-bottom: 20px;
}

.card h4 {
  margin-top: 0;
}

.footer {
  text-align: center;
  color: var(--text-300);
}
</style>
