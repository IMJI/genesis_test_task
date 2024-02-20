import { Controller, Get, Headers, HttpException, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import Credentials from './Credentials';

@Controller('api/auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Get()
	async auth(@Headers('x-client-id') clientId: string): Promise<Credentials> {
		if (!clientId) throw new HttpException('Отсутствует заголовок X-Client-Id', HttpStatus.BAD_REQUEST);
		return await this.authService.auth(clientId);
	}
}
