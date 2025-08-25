import { IEmailLocals, winstonLogger } from "@lawrencejews/marketplace-shared";
import { config } from "@notifications/config";
import { emailTemplates } from "@notifications/helpers";
import { Logger } from "winston";


const log: Logger = winstonLogger(`${config.ELASTIC_SEARCH_URL}`, 'mailTransport', 'debug');

async function sendEmail(template: string, receiverEmail: string, locals: IEmailLocals): Promise<void>{
  try {

    // Email Templates
    emailTemplates(template, receiverEmail, locals)
    log.info('Email sent successfully')
    
  } catch (error) {
    log.log('error', 'Notification Service MailTransport sendEmail() method error: ', error);
  }
}

export { sendEmail};