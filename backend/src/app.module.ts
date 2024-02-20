import { Module } from '@nestjs/common';
import { CompanyController } from './company/company.controller';
import { CompanyService } from './company/company.service';
import { ContactController } from './contact/contact.controller';
import { ContactService } from './contact/contact.service';
import { LeadController } from './lead/lead.controller';
import { LeadService } from './lead/lead.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';

@Module({
	imports: [
		ServeStaticModule.forRoot({
			rootPath: join(__dirname, '..', '..', 'frontend', 'dist'),
		}),
	],
	controllers: [AuthController, CompanyController, ContactController, LeadController],
	providers: [AuthService, CompanyService, ContactService, LeadService],
})
export class AppModule {}
