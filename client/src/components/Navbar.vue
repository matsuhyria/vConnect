<template>
    <header class="navbar bg-black">
        <nav class="container d-flex justify-content-between p-0 px-sm-2">
            <div>
                <a href="/" class="navbar-brand text-white">
                    <img :src="`./logo-w.svg`" alt="Logo" width="40" />
                </a>
            </div>
            <ul class="nav me-auto">
                <li class="nav-item">
                    <router-link to="/opportunities"
                        class="nav-link text-white px-1 px-md-3">Opportunities</router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/organizations"
                        class="nav-link text-white px-1 px-md-3">Organizations</router-link>
                </li>
            </ul>

            <div class="nav-item d-flex">
                <router-link to="/login" class="nav-link text-white p-1 fw-bold">Login</router-link>
            </div>
        </nav>
    </header>
</template>

<script>
export default {
    name: 'Navbar'
}
</script>

<style scoped>
.navbar {
    padding: 1rem;
}
</style>
