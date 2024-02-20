import { Headers, Controller, Post, HttpException, HttpStatus } from '@nestjs/common';
import Entity from 'src/Entity';
import { LeadService } from './lead.service';

@Controller('api/lead')
export class LeadController {
	constructor(private readonly leadService: LeadService) {}

	@Post()
	async createLead(
		@Headers('authorization') authHeader: string,
		@Headers('x-base-domain') baseDomain: string
	): Promise<Entity> {
		if (!authHeader || !baseDomain) throw new HttpException('Ошибка авторизации', HttpStatus.UNAUTHORIZED);
		const accessToken = authHeader.split(' ')[1];
		return this.leadService.createLead(accessToken, baseDomain);
	}
}
