<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light my-navbar">
        <div class="container">
            <router-link class="navbar-brand" :to="{ name: 'home' }">Quarere</router-link>
            <button
                class="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav ml-auto">
                    <li class="nav-item active">
                        <router-link class="nav-link my-nav-link" :to="{ name: 'home' }">Home</router-link>
                    </li>
                    <li class="nav-item active">
                        <router-link class="nav-link my-nav-link" :to="{ name: 'about' }">About</router-link>
                    </li>
                    <li class="nav-item active">
                        <a class="nav-link my-nav-link" href="/accounts/logout/">Logout</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script>
export default {
    name: "NavbarComponent"
};
</script>

<style scoped>
.my-navbar {
    border-bottom: 1px solid #ddd;
}

.navbar-brand {
    color: #ba2929;
}

.navbar-brand:hover {
    color: #ff4747 !important;
}

.my-nav-link:hover {
    color: #ba2929 !important;
}
</style>