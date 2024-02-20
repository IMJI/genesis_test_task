import { Injectable } from '@nestjs/common';
import Entity from 'src/Entity';
import axios from 'axios';

@Injectable()
export class LeadService {
	private readonly apiPath = 'api/v4/leads';

	async createLead(accessToken: string, baseDomain: string): Promise<Entity> {
		const { data } = await axios({
			method: 'POST',
			url: `https://${baseDomain}/${this.apiPath}`,
			data: [{ name: 'Сделка' }],
			headers: {
				'Content-type': 'application/json',
				'Authorization': `Bearer ${accessToken}`
			}
		});
		return {
			id: data._embedded.leads[0].id,
			name: 'Сделка'
		}
	}
}
