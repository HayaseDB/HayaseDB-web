<template>
  <footer class="footer">
    <div class="footer-top">
      <div class="footer-content">

        <div class="footer-section footer-social">
          <h2 class="footer-heading">Follow Us</h2>
          <div class="social-icons">
            <a href="https://discord.HayaseDB.com" class="social-icon discord" target="_blank" rel="noopener noreferrer">
              <fontAwesomeIcon :icon="['fab', 'discord']" />
            </a>
            <a href="https://github.HayaseDB.com" class="social-icon github" target="_blank" rel="noopener noreferrer">
              <fontAwesomeIcon :icon="['fab', 'github']" />
            </a>
            <a href="https://instagram.HayaseDB.com" class="social-icon instagram" target="_blank" rel="noopener noreferrer">
              <fontAwesomeIcon :icon="['fab', 'instagram']" />
            </a>
            <a href="https://x.HayaseDB.com" class="social-icon x-twitter" target="_blank" rel="noopener noreferrer">
              <fontAwesomeIcon :icon="['fab', 'x-twitter']" />
            </a>
            <a href="https://tiktok.HayaseDB.com" class="social-icon tiktok" target="_blank" rel="noopener noreferrer">
              <fontAwesomeIcon :icon="['fab', 'tiktok']" />
            </a>
          </div>
        </div>
        <div class="footer-section footer-links">
          <h2 class="footer-heading">Quick Links</h2>
          <ul class="footer-link-list">
            <li><a href="/imprint" class="footer-link">Imprint</a></li>
            <li><a href="/imprint" class="footer-link">Privacy Policy</a></li>
          </ul>
        </div>
        <div class="footer-section footer-about">
          <h2 class="footer-heading">About Us</h2>
          <p class="footer-text about-us-text">We offer a free, open-source anime database with a community driven collection of data and a powerful API for developers.</p>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <p class="footer-text">© 2024 HayaseDB. All rights reserved.</p>
    </div>
    <img src="../assets/sleepy_nagatoro.webp" alt="" class="footer-image">

  </footer>
</template>

<script>
export default {
  name: 'FooterSection',
};
</script>

<style scoped>
.footer {
  z-index: 100;
  background: var(--gradient-footer);
  color: var(--text-100);
  padding: 40px 20px 0;
  text-align: center;
  box-shadow: var(--shadow-md);
  position: relative;
  overflow: hidden;
}


.footer-top {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
}

.footer-content {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
  flex-wrap: wrap;
}

.footer-section {
  flex: 1;
  min-width: 200px;
  margin: 0 20px;
}

.footer-heading {
  font-size: var(--text-lg);
  margin-bottom: 15px;

  color: var(--text);
}

.footer-text {
  font-size: var(--text-sm);
  margin: 0;
}



.footer-link-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-link {
  color: var(--primary);
  font-size: var(--text-base);
  text-decoration: none;
  transition: color 0.3s;
  display: block;
  margin: 5px 0;
}

.footer-link:hover {
  color: var(--primary-600);
}

.footer-social {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.about-us-text{
  max-width: 400px;
}

.social-icons {
  display: flex;
  gap: 20px;
  font-size: var(--text-lg);
}

.social-icon {
  color: var(--text);
  transition: color 0.3s;
}

.social-icon:hover {
  color: var(--primary);
}

.footer-bottom {
  margin-top: 30px;
  border-top: 1px solid var(--background-300);
  padding-top: 15px;
  padding-bottom: 15px;
  position: relative;
}

.footer-image {
  position: absolute;
  bottom: 0;
  left: 10%;
  width: 100px;
  height: auto;
  margin-left: 15px;
}
@media (max-width: 768px) {
  .footer-content {
    flex-direction: column;
    align-items: center;
  }

  .footer-section {
    margin: 20px 0;
  }

  .social-icons {
    gap: 15px;
  }
  .footer-image{
    display: none;
  }
}
</style>
