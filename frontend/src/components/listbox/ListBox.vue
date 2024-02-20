<template>
    <div class="listbox">
      	<slot></slot>
    </div>
</template>

<style scoped>
.listbox {
    display: flex;
    flex-direction: column;
    gap: 8px;
    overflow-y: auto;
}
</style>