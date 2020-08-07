<template>
    <div class="overlay">
      <div class="lds-dual-ring"></div>
    </div>
</template>

<style scoped>
    .overlay {
      justify-content: center;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(229, 238, 238, 0.5);
      z-index: 999;
    }
    .lds-dual-ring {
      position: absolute;
      left: 50%;
      top: 30%;
      margin-left: -40px;
      margin-top: 80px;
      display: inline-block;
      width: 80px;
      height: 80px;
    }

    .lds-dual-ring:after {
      content: " ";
      display: block;
      width: 64px;
      height: 64px;
      margin: 8px;
      border-radius: 50%;
      border: 6px solid #4caf50;
      border-color: #999c99 transparent #999c99 transparent;
      animation: lds-dual-ring 1.1s linear infinite;
    }

    @keyframes lds-dual-ring {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
    }
</style>