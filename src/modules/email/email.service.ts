import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { randomInt } from 'crypto';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  public generateOTP(): string {
    const otp = randomInt(1000, 9999).toString();
    return otp;
  }

  public async sendOTPEmail(email: string, otp: string) {
    // try {
    await this.mailerService.sendMail({
      to: email,
      subject: 'OTP Verification',
      text: `Your OTP is ${otp}.`,
    });
    // } catch (error) {
    //   throw new Error('Failed to send OTP email.' + error);
    // }
  }
}
