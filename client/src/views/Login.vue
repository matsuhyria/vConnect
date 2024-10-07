<script setup>
import { ref } from 'vue'
</script>

<template>
  <div>
    <div class="logo mt-5">
      <img src="/logo-b.svg" alt="Logo" width="150" />
    </div>
    <div class="d-flex justify-content-center align-items-center">
      <div class="border rounded p-5 ">
        <h2 class="fw-bold mb-5">Login</h2>
        <form>
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">Email address</label>
            <input type="email" class="form-control" id="exampleInputEmail1" />
          </div>
          <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">Password</label>
            <input type="password" class="form-control" id="exampleInputPassword1">
          </div>
          <button type="submit" class="btn btn-dark">Login</button>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
