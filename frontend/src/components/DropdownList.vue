<template>
    <div class="dropdown_list" ref="dropdown">
        <div 
            class="dropdown_selected_option"
            @click="isOpened = true"
        >
            {{ mappedSelectedOption }}
            <svg class="icon_chevron_down" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 24 24">
                <polyline fill="none" stroke="#2e3640" stroke-miterlimit="10" points="4,8 12,16 20,8 "/>
            </svg>
        </div>
        <div
            v-if="isOpened"
            class="dropdown_options"
        >
            <div
                class="option"
                v-for="(option, index) in [{name:'Не выбрано'}, ...props.options]"
                :key="index"
                @click="setSelectedOption(option)"
            >
                <svg class="icon_select" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 24 24">
                    <polyline fill="none" :class="selectedOption === option ? 'selected_icon_stroke' : ''" stroke-miterlimit="10" points="20.5,4.3 9.2,15.7 3.5,10 "/>
                </svg>
                {{ option.name }}
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { defineProps, withDefaults, defineEmits, ref, computed, onMounted, onBeforeUnmount } from 'vue';
export interface DropdownOption {
    value?: string,
    name: string
}

export interface DropdownProps {
  options: DropdownOption[],
  model?: DropdownOption
}

const props = withDefaults(defineProps<DropdownProps>(), {
    model: null
});

const emit = defineEmits(['update:modelValue']);

const dropdown = ref(null);
const selectedOption = ref(null);
const isOpened = ref(false);

const mappedSelectedOption = computed(() => {
    return (selectedOption.value?.name || selectedOption.value) || 'Не выбрано';
});

const setSelectedOption = (option: DropdownOption) => {
    selectedOption.value = option;
    emit('update:modelValue', option);
    isOpened.value = false;
}

const closeDropdown = (event: Event) => {
    if (!dropdown.value.contains(event.target)) {
        isOpened.value = false;
    }
}

onMounted(() => {
    window.addEventListener('click', closeDropdown);
});

onBeforeUnmount(() => {
    window.removeEventListener('click', closeDropdown);
});
</script>

<style scoped>
.dropdown_list {
    color: #2e3640;
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.dropdown_selected_option {
    padding: 8px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #fafafa;
    border: 1px solid #dfdfdf;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    line-height: 24px;
}

.icon_chevron_down, .icon_select {
    width: 16px;
    height: 16px;
}

.selected_icon_stroke {
    stroke: #231F20;
}

.dropdown_options {
    width: 100%;
    position: absolute;
    top: 44px;
    background: #fafafa;
    border: 1px solid #dfdfdf;
    border-radius: 4px;
}

.option {
    padding: 8px;
    display: flex;
    align-items: center;
    gap: 4px;
    cursor: pointer;
}

.option:hover {
    background: #ededed;
}
</style>