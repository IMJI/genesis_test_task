import { Headers, Controller, Post, HttpStatus, HttpException } from '@nestjs/common';
import { CompanyService } from './company.service';
import Entity from 'src/Entity';

@Controller('api/company')
export class CompanyController {
	constructor(private readonly companyService: CompanyService) {}

	@Post()
	async createCompany(
		@Headers('authorization') authHeader: string,
		@Headers('x-base-domain') baseDomain: string
	): Promise<Entity> {
		if (!authHeader || !baseDomain) throw new HttpException('Ошибка авторизации', HttpStatus.UNAUTHORIZED);
		const accessToken = authHeader.split(' ')[1];
		return await this.companyService.createCompany(accessToken, baseDomain);
	}
}
