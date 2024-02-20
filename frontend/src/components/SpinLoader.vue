<template>
  	<div class="spin_loader"></div>
</template>

<style scoped>
.spin_loader {
    border-top: 2px solid #f7f9ff;
    border-right: 2px solid #f7f9ff;
    border-bottom: 2px solid #f7f9ff00;
    border-left: 2px solid #f7f9ff00;
    border-radius: 100vh;
    animation: rotate 1.5s linear 0s infinite normal forwards;
}

@keyframes rotate {
	0% {
		transform: rotate(0deg);
	}
    100% {
        transform: rotate(360deg);
    }
}
</style>