import { Injectable } from '@nestjs/common';
import Credentials from './Credentials';
import axios from 'axios';

@Injectable()
export class AuthService {
	async auth(clientId: string): Promise<Credentials> {
		const { data } = await axios({
			method: 'GET',
			url: 'https://test.gnzs.ru/oauth/get-token.php',
			headers: {
				'Content-type': 'application/json',
				'X-Client-Id': clientId
			}
		});
		return data;
	}
}
