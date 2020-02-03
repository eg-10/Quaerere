<template>
    <div class="container">
        <h1 class="error text-center">{{ message }}</h1>
    </div>
</template>

<script>
export default {
    name: "NotFound",
    data() {
        return {
            message: "404 - Page not Found !"
        }
    }
}
</script>