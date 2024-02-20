import axios from 'axios';
import { defineStore } from 'pinia';
import Entity from './model/Entity';

interface State {
    token?: string,
    baseDomain?: string,
    entities: Entity[]
}

const useStore = defineStore('store', {
    state: (): State => ({
        token: undefined,
        baseDomain: undefined,
        entities: []
    }),
    actions: {
        async auth(): Promise<void> {
            const { data } = await axios({
                method: 'GET',
                url: 'http://localhost:3000/api/auth',
                headers: {
                  'Content-type': 'application/json',
                  'X-Client-Id': '31550986'
                }
            });
            this.token = data.access_token;
            this.baseDomain = data.base_domain;
        },
        addEntityToList(entity: Entity): void {
            this.entities = [...this.entities, entity];
        }
    }
});

export default useStore;
