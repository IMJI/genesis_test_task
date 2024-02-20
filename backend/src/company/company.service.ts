import { Injectable } from '@nestjs/common';
import axios from 'axios';
import Entity from 'src/Entity';

@Injectable()
export class CompanyService {
	private readonly apiPath = 'api/v4/companies';

	async createCompany(accessToken: string, baseDomain: string): Promise<Entity> {
		const { data } = await axios({
			method: 'POST',
			url: `https://${baseDomain}/${this.apiPath}`,
			data: [{ name: 'Компания' }],
			headers: {
				'Content-type': 'application/json',
				'Authorization': `Bearer ${accessToken}`
			}
		});
		return {
			id: data._embedded.companies[0].id,
			name: 'Компания'
		}
	}
}
