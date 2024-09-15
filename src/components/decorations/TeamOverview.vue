<template>
  <section class="team-section">
    <div class="team-content">
      <div class="team-info">
        <h2>Our Team <font-awesome-icon class="heart-icon pulse-animation" :icon="['fa', 'heart']"/></h2>
        <p>We are proud to offer HayaseDB to you. As passionate young developers and designers, we dedicate ourselves to this project to provide value to our community.</p>
      </div>

      <div class="team-flex-container">
        <div v-for="member in teamMembers" :key="member.name" class="team-card-horizontal">
          <img :src="member.img" :alt="`${member.name}'s Profile Picture`">
          <div class="card-content">
            <div class="card-content-top">
              <h3>{{ member.name }}</h3>
              <p>{{ member.role }}</p>

            </div>
<div class="card-content-bottom">
  <div class="social-icons">
    <a v-for="(icon, name) in member.socials" :key="name" :href="icon.url" class="social-icon" :class="name" aria-label="Follow on {{ name }}">
      <font-awesome-icon :icon="['fab', name]" role="img" />
    </a>
  </div>
</div>

          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import AIOImage from '@/assets/AIO.png';
import GarfieldTV from '@/assets/GarfieldTV.gif';
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";

export default {
  components: {FontAwesomeIcon},

  data() {
    return {
      teamMembers: [
        {
          name: 'AIO',
          role: 'Full Stack Developer',
          img: AIOImage,
          socials: {
            instagram: { url: '#' },
            discord: { url: '#' },
            twitter: { url: '#' },
            github: { url: '#' }
          }
        },
        {
          name: 'GarfieldTV',
          role: 'Moderator',
          img: GarfieldTV,
          socials: {
            instagram: { url: '#' },
            discord: { url: '#' },
            twitter: { url: '#' },
            github: { url: '#' }
          }
        },


      ]
    };
  }
};
</script>

<style scoped>
.team-section {
  padding: 60px 20px;
  background-color: var(--background-75);
}

.team-content {
  display: flex;
  flex-direction: row;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  gap: 20px;
}

.team-info {
  text-align: left;
  margin-bottom: 40px;
}

.team-info h2 {
  font-size: var(--text-2xl);
  color: var(--text-900);
  margin-bottom: 0;
}

.team-info p {
  font-size: var(--text-base);
  color: var(--text-600);
  line-height: 1.6;
  max-width: 600px;
  margin: 0 auto;
}

.team-flex-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  width: 100%;
}

.team-card-horizontal {
  background-color: var(--background-100);
  color: var(--text);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-md);
  padding: 20px;
  display: flex;
  align-items: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  max-width: 350px;
  width: 100%;
  box-sizing: border-box;
}


.heart-icon{
  margin-left: 7px;
  color: var(--secondary-500);
}

.team-card-horizontal:hover {
  transform: scale(1.02);
  box-shadow: var(--shadow-lg);
}

.team-card-horizontal img {
  border-radius: 10px;
  width: 100px;
  height: 100px;
  object-fit: cover;
  margin-right: 20px;
}

.card-content-top{
  margin-top: 5px;
}
.card-content-bottom{
  margin-bottom: 3px;
}

.card-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}

.card-content h3 {
  font-size: var(--text-lg);
  color: var(--text-900);
  margin: 0;
  padding-bottom: 0;
  padding-top: 0;
}

.card-content p {
  color: var(--text-600);
  margin-bottom: 0;
}

.social-icons {
  display: flex;
  gap: 15px;
  font-size: var(--text-sm);
}

.social-icons a {
  font-size: var(--text-lg);
  color: var(--text-400);
  transition: color 0.3s;
}



@media (max-width: 1260px) {
  .team-content {
    flex-direction: column;
    align-items: center;
  }

  .team-info {
    text-align: center;
    padding: 0 40px;
  };
}

@media (max-width: 870px) {
  .team-card-horizontal img {
    width: 80px;
    height: 80px;
  }

  .team-card-horizontal h3 {
    font-size: var(--text-base);
  }

  .card-content p {
    margin-bottom: 5px;
  }



  .team-section {
    padding: 40px 20px;
  }
}

@media (max-width: 470px) {
  .team-card-horizontal {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .social-icons {
    justify-content: center;
  }




  .team-card-horizontal img {
    margin-bottom: 10px;
    margin-right: 0;
  }
}
</style>
