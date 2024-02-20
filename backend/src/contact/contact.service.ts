import { Injectable } from '@nestjs/common';
import Entity from 'src/Entity';
import axios from 'axios';

@Injectable()
export class ContactService {
	private readonly apiPath = 'api/v4/contacts';

	async createContact(accessToken: string, baseDomain: string): Promise<Entity> {
		const { data } = await axios({
			method: 'POST',
			url: `https://${baseDomain}/${this.apiPath}`,
			data: [{ name: 'Контакт' }],
			headers: {
				'Content-type': 'application/json',
				'Authorization': `Bearer ${accessToken}`
			}
		});
		return {
			id: data._embedded.contacts[0].id,
			name: 'Контакт'
		}
	}
}
