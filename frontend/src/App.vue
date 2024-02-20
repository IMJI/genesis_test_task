<script setup lang="ts">
import { computed, ref } from 'vue';
import { storeToRefs } from 'pinia';
import axios from 'axios';
import useStore from './store';
import SimpleButton from './components/SimpleButton.vue';
import SpinLoader from './components/SpinLoader.vue';
import DropdownList from './components/DropdownList.vue';
import ListBox from './components/listbox/ListBox.vue';
import ListBoxItem from './components/listbox/ListBoxItem.vue';
import Entity from './model/Entity';

const store = useStore();
const { token, baseDomain, entities } = storeToRefs(store);
const selectedEntityOption = ref(null);
const isLoading = ref(false);
const entityTypes = ref([
  	{ name: 'Сделка', value: 'lead' },
	{ name: 'Контакт', value: 'contact' },
	{ name: 'Компания', value: 'company' }
]);

const isEntitySelected = computed(() => {
  	return selectedEntityOption.value && selectedEntityOption.value.name !== 'Не выбрано';
});

async function getCredentials() {
	if (!token.value || !baseDomain.value) {
		await store.auth();
	}
	return { token, baseDomain };
}

async function requestEntityCreation(entityType: string): Promise<Entity> {
	const { token, baseDomain } = await getCredentials();
	const { data } = await axios({
		method: 'POST',
		url: `http://localhost:3000/api/${entityType}`,
		headers: {
			'Content-type': 'application/json',
			'Authorization': `Bearer ${token.value}`,
			'X-Base-Domain': baseDomain.value
		}
	});
	return data;
}

async function handleCreate(): Promise<void> {
	if (isLoading.value) return;
	isLoading.value = true;
	const selectedEntity = selectedEntityOption.value;
	try {
		const data = await requestEntityCreation(selectedEntity.value);
		store.addEntityToList(data);
	} catch(error) {
		console.error(error);
	} finally {
		isLoading.value = false;
	}
}
</script>

<template>
	<div class="page_layout">
		<div class="controls">
			<dropdown-list
				class="dropdown"
				:options="entityTypes"
				v-model="selectedEntityOption"
			/>
			<simple-button
				:disabled="!isEntitySelected"
				@click="handleCreate"
			>
				<spin-loader v-if="isLoading" class="loader" />
				<span v-else>Создать</span>
			</simple-button>
		</div>
		<div class="listbox_container">
			<list-box class="entities_listbox">
				<list-box-item
					class="entity_card"
					v-for="entity in entities"
					:key="entity.id"
				>
					<span class="entity_name">{{ entity.name }}</span>
					<span class="entity_id">{{ `ID: ${entity.id}` }}</span>
				</list-box-item>
			</list-box>
		</div>
	</div>
</template>

<style scoped>
.page_layout {
	display: flex;
	flex-direction: column;
	height: 100%;
}

.controls {
	padding: 16px;
	display: flex;
	gap: 16px;
}

.dropdown {
  	width: 400px;
}

.listbox_container {
	padding: 16px;
	overflow-y: auto;
}

.entity_card {
	display: flex;
	flex-direction: column;
	gap: 4px;
}

.entity_name {
  	color: #2e3640;
}

.entity_id {
	color: #7a7a7a;
	font-size: 14px;
}

.loader {
	width: 20px;
	height: 20px;
}
</style>
