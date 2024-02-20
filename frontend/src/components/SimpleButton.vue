<template>
	<button :disabled="props.disabled" @click="emitClickEvent">
		<slot></slot>
	</button>
</template>

<script lang="ts" setup>
import { defineProps, withDefaults, defineEmits } from 'vue';
export interface SimpleButtonProps {
  	disabled?: boolean
}

const props = withDefaults(defineProps<SimpleButtonProps>(), {
  	disabled: false
});

const emit = defineEmits<{
  	click: [event: Event]
}>();

const emitClickEvent = (event: Event) => emit('click', event);
</script>

<style scoped>
button {
    padding: 8px 16px;
    color: #f7f9ff;
    background: #4c8bf7;
    border: 1px solid #447fe2;
    border-radius: 4px;
    font-size: 16px;
    line-height: 24px;
    cursor: pointer;
    transition: all .2s ease-in;
}

button:hover {
    background: #447fe2;
}

button:disabled {
    color: #2e3640;
    background: #fcfcfc;
    border-color: #dfe2e3;
    cursor: default;
}
</style>