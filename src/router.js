import { createRouter, createWebHistory } from 'vue-router';
import Home from './views/HomeView.vue';
import AuthView from "@/views/AuthView.vue";
import AccountView from "@/views/AccountView.vue";
import DeveloperView from "@/views/account/DeveloperView.vue";
import ProfileView from "@/views/account/ProfileView.vue";
import ExploreView from "@/views/db/ExploreView.vue";
import AnimeView from "@/views/db/AnimeView.vue";
import ImprintView from "@/views/ImprintView.vue";
import AnimeExploreView from "@/views/db/AnimeExploreView.vue";

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        meta: {
            showNavBar: true,
            showFooter: true
        }
    },
    {
        path: '/imprint',
        name: 'Imprint',
        component: ImprintView,
        meta: {
            showNavBar: true,
            showFooter: true
        }
    },
    {
        path: '/login',
        name: 'Login',
        component: AuthView,
        meta: {
            showNavBar: true,
            showFooter: false
        }
    },
    {
        path: '/register',
        name: 'Register',
        component: AuthView,
        meta: {
            showNavBar: true,
            showFooter: false
        }
    },
    {
        path: '/account',
        name: 'Account',
        component: AccountView,
        meta: {
            showNavBar: true,
            showFooter: true,
        },
        children: [
            {
                path: 'developer',
                name: 'Developer',
                component: DeveloperView,
                meta: {
                    showNavBar: true,
                    showFooter: true,
                }
            },
            {
                path: 'profile',
                name: 'Profile',
                component: ProfileView,
                meta: {
                    showNavBar: true,
                    showFooter: true,
                }
            }
        ]
    },
    {
        path: '/explore',
        name: 'Explore',
        component: ExploreView,
        meta: {
            showNavBar: true,
            showFooter: true
        }
    },
    {
        path: '/explore/anime',
        name: 'AnimeExploreView',
        component: AnimeExploreView,
        meta: {
            showNavBar: true,
            showFooter: true
        }
    },

    {
        path: '/anime/create',
        name: 'CreateAnime',
        component: AnimeView,
        meta: {
            showNavBar: true,
            showFooter: true
        },
        props: {
            createMode: true,
            editMode: true,
            animeId: null
        }
    },
    {
        path: '/anime/:id/edit',
        name: 'EditAnime',
        component: AnimeView,
        meta: {
            showNavBar: true,
            showFooter: true
        },
        props: route => ({
            createMode: false,
            editMode: true,
            animeId: route.params.id
        })
    },
    {
        path: '/anime/:id',
        name: 'ViewAnime',
        component: AnimeView,
        meta: {
            showNavBar: true,
            showFooter: true
        },
        props: route => ({
            createMode: false,
            editMode: false,
            animeId: route.params.id
        })
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
