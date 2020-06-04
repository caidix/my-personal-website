<template>
  <div class="test">
    jha阿斯顿le
    <button @click="add">+</button>
    <div>{{number}}</div>
    <button>+</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      number: 0
    };
  },
  methods: {
    add() {
      console.log(this._.indexOf([1, 2, 1, 2], 2))
      this.number = this.number + 2;
    }
  }
};
</script>


<style lang="scss">
body {
  background: red;
}
body {
  height: 100px;
}
.test {
  font-size: 20px;
  transform: translateX(100px);
  box-shadow: 1px 1px 1px #000;
  transition: 1s;
}
.App {
  text-align: center;
}

.App-logo {
  height: 40vmin;
  pointer-events: none;
}

@media (prefers-reduced-motion: no-preference) {
  .App-logo {
    animation: App-logo-spin infinite 20s linear;
  }
}

.App-header {
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
}

.App-link {
  color: #61dafb;
}

@keyframes App-logo-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>