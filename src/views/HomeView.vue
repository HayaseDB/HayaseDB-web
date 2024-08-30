<template>
  <div class="showcase">
    <header>
      <h1>Theme Showcase</h1>
      <h2>Explore the Look and Feel</h2>
    </header>

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

    <section class="text-sizes">
      <h3>Text Sizes</h3>
      <div class="text-size-demo">
        <p class="text-xs">This is extra small text.</p>
      </div>
      <div class="text-size-demo">
        <p class="text-sm">This is small text.</p>
      </div>
      <div class="text-size-demo">
        <p class="text-base">This is base text.</p>
      </div>
      <div class="text-size-demo">
        <p class="text-lg">This is large text.</p>
      </div>
      <div class="text-size-demo">
        <p class="text-xl">This is extra large text.</p>
      </div>
      <div class="text-size-demo">
        <p class="text-2xl">This is 2XL text.</p>
      </div>
    </section>

    <footer class="footer">
      <p>© 2024 Theme Showcase. All rights reserved.</p>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'ShowcaseComponent',
};
</script>

<style scoped>
.showcase {
  max-width: 1200px;
  margin: auto;
}

header {
  text-align: center;
  margin-bottom: 40px;
}

header h1 {
  font-size: var(--text-2xl);
  color: var(--text);
}

header h2 {
  font-size: var(--text-xl);
  color: var(--text-800);
}

.intro p {
  color: var(--text-600);
  max-width: 800px;
  margin: 0 auto;
  font-size: var(--text-base);
}

.controls {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 40px;
}

.form {
  max-width: 600px;
  margin: 0 auto 40px auto;
}

.form h3 {
  margin-bottom: 20px;
  color: var(--text-300);
  font-size: var(--text-lg);
}

input, textarea {
  border: 1px solid var(--background-300);
  border-radius: var(--border-radius-md);
  padding: 10px;
  margin-bottom: 20px;
  width: 100%;
  font-size: var(--text-base);
}

textarea {
  resize: vertical;
  min-height: 100px;
}

input:focus, textarea:focus {
  border-color: var(--primary-600);
  outline: none;
}

.card {
  background-color: var(--background-100);
  border-radius: var(--border-radius-lg);
  padding: 20px;
  box-shadow: var(--shadow-md);
  margin-bottom: 40px;
}

.card h4 {
  margin-top: 0;
  color: var(--text-300);
  font-size: var(--text-lg);
}

.footer {
  text-align: center;
  color: var(--text-400);
  padding: 20px;
}

.text-sizes {
  margin: 40px 0;
}

.text-sizes h3 {
  font-size: var(--text-xl);
  margin-bottom: 20px;
}

.text-size-demo {
  margin-bottom: 20px;
}

.text-size-demo h4 {
  font-size: var(--text-lg);
  margin-bottom: 10px;
  color: var(--text-800);
}

.text-size-demo p {
  margin: 0;
}

.text-xs { font-size: var(--text-xs); }
.text-sm { font-size: var(--text-sm); }
.text-base { font-size: var(--text-base); }
.text-lg { font-size: var(--text-lg); }
.text-xl { font-size: var(--text-xl); }
.text-2xl { font-size: var(--text-2xl); }
</style>
