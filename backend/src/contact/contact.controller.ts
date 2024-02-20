import { Headers, Controller, Post, HttpException, HttpStatus } from '@nestjs/common';
import { ContactService } from './contact.service';
import Entity from 'src/Entity';

@Controller('api/contact')
export class ContactController {
	constructor(private readonly contactService: ContactService) {}

	@Post()
	async createContact(
		@Headers('authorization') authHeader: string,
		@Headers('x-base-domain') baseDomain: string
	): Promise<Entity> {
		if (!authHeader || !baseDomain) throw new HttpException('Ошибка авторизации', HttpStatus.UNAUTHORIZED);
		const accessToken = authHeader.split(' ')[1];
		return this.contactService.createContact(accessToken, baseDomain);
	}
}
