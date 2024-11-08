<template>
  <div class="imprint-container">
    <h1 class="imprint-title">Imprint</h1>
    <div class="imprint-section">
      <h2 class="imprint-subtitle">Business Name and Legal Form</h2>
      <p>HayaseDB</p>
      <p>A personal hobby project by Sebastian Stepper</p>
    </div>

    <div class="imprint-section">
      <h2 class="imprint-subtitle">Address</h2>
      <p>Rudertshofen 52</p>
      <p>92334 Berching</p>
      <p>Germany</p>
    </div>

    <div class="imprint-section">
      <h2 class="imprint-subtitle">Contact Information</h2>
      <p>Phone: <a href="tel:+4915175075602">+49 1517 5075602</a></p>
      <p>Email: <a href="mailto:Sebastian-Stepper@gmx.de">Sebastian-Stepper@gmx.de</a></p>
    </div>

    <div class="imprint-section">
      <h2 class="imprint-subtitle">Representative</h2>
      <p>Sebastian Stepper</p>
    </div>

    <div class="imprint-section">
      <h2 class="imprint-subtitle">Commercial Register Information</h2>
      <p>Not applicable</p>
    </div>

    <div class="imprint-section">
      <h2 class="imprint-subtitle">VAT Identification Number</h2>
      <p>Not applicable</p>
    </div>

    <div class="imprint-section">
      <h2 class="imprint-subtitle">Regulatory Authority</h2>
      <p>Not applicable</p>
    </div>

    <div class="imprint-section">
      <h2 class="imprint-subtitle">Professional Regulations</h2>
      <p>Not applicable</p>
    </div>

    <div class="imprint-section">
      <h2 class="imprint-subtitle">Liability Disclaimer</h2>
      <p>The information provided on this website is for general informational purposes only. HayaseDB utilizes Google Fonts for website design. The data on this site is hosted on a private server in Germany, under the exclusive control of HayaseDB. While reasonable efforts are made to secure the data, it is not encrypted except for passwords, which are hashed. HayaseDB does not assume liability for any data breaches or other issues related to data security. The content provided is accurate to the best of our knowledge, but no guarantees are made regarding the completeness or accuracy of the information.</p>
    </div>

    <div class="imprint-section">
      <h2 class="imprint-subtitle">Privacy Policy</h2>
      <p>Data collected through HayaseDB is stored on a private server located in Germany. This server is not publicly accessible, and HayaseDB retains sole control over it. Although passwords are securely hashed, other data is not encrypted. Users have the right to access, correct, or delete their personal data upon request. HayaseDB is not responsible for any potential data breaches or related issues. For further information on how we handle personal data, please contact us directly at <a href="mailto:info@hayasedb.com">info@HayaseDB.com</a>.</p>
    </div>

    <div class="imprint-section">
      <h2 class="imprint-subtitle">Terms of Service</h2>
      <p>By accessing and using HayaseDB, you agree to comply with German law and any other applicable laws. Users are prohibited from engaging in activities that harm or exploit the service beyond normal usage. Unauthorized access, hacking, or exploitation of the service is strictly prohibited. Any disputes arising from the use of this service will be subject to the jurisdiction of the courts in Germany.</p>
    </div>

    <div class="imprint-section">
      <h2 class="imprint-subtitle">Cookie Policy</h2>
      <p>This website may use cookies to enhance user experience. Cookies are small data files stored on your device. Users can manage cookie preferences through their browser settings. For more details on how cookies are used, please refer to our Privacy Policy.</p>
    </div>

    <div class="imprint-section">
      <h2 class="imprint-subtitle">Google Fonts</h2>
      <p>This website uses Google Fonts to enhance its design. Google Fonts is a web service provided by Google LLC.</p>
    </div>

    <footer class="imprint-footer">
      <p>© {{ currentYear }} HayaseDB.com. All rights reserved. The content and design of this website are protected by copyright law.</p>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'ImprintView',
  computed: {
    currentYear() {
      return new Date().getFullYear();
    }
  }
}
</script>

<style scoped>
.imprint-container {
  max-width: 900px;
  margin: 150px auto;
  padding: 30px;
  background-color: var(--background-75);
  border: 1px solid var(--background-card-border);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
}

.imprint-title {
  color: var(--text);
  text-align: center;
  margin-bottom: 1.5em;
}

.imprint-section {
  margin-bottom: 2em;
  padding: 15px;
  border: 1px solid var(--background-card-border);
  border-radius: var(--border-radius-md);
  background-color: var(--background-card-child);
}

.imprint-subtitle {
  font-size: var(--text-xl);
  color: var(--primary);
  margin-bottom: 0.5em;
  border-bottom: 2px solid var(--accent-200);
  padding-bottom: 0.3em;
}

a {
  color: var(--primary);
  text-decoration: none;
}

a:hover {
  color: var(--primary-600);
  text-decoration: underline;
}

.imprint-footer {
  text-align: center;
  font-size: var(--text-sm);
  color: var(--text-500);
  margin-top: 2em;
}
</style>
