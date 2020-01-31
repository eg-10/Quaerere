<template>
    <div id="app">
        <NavbarComponent />
        <router-view />
    </div>
</template>

<script>
import NavbarComponent from "./components/Navbar.vue";
import { apiService } from "./common/api.service.js";

export default {
    name: "App",
    components: {
        NavbarComponent
    },
    methods: {
        async setUserInfo() {
            const data = await apiService("/api/user/");
            const requestUser = data["username"];
            window.localStorage.setItem("username", requestUser);
        }
    },
    created() {
        this.setUserInfo();
    }
};
</script>

<style>
#app {
    font-family: 'Lato', sans-serif;
}
</style>
