import { Injectable } from '@nestjs/common';
import { CreateEmailDto } from './dto/create-email.dto';
import { UpdateEmailDto } from './dto/update-email.dto';
import { createTransport, Transporter } from 'nodemailer';

@Injectable()
export class EmailService {
  private _transporter: Transporter;

  constructor() {
    this._transporter = createTransport({
      host: 'smtp.qq.com',
      port: 587,
      secure: false,
      auth: {
        user: '',
        pass: '',
      },
    });
  }
  async sendMail({ to, subject, html }) {
    await this._transporter.sendMail({
      from: {
        name: 'Booking meeting room',
        address: '',
      },
      to,
      subject,
      html,
    });
  }
  create(createEmailDto: CreateEmailDto) {
    return 'This action adds a new email';
  }

  findAll() {
    return `This action returns all email`;
  }

  findOne(id: number) {
    return `This action returns a #${id} email`;
  }

  update(id: number, updateEmailDto: UpdateEmailDto) {
    return `This action updates a #${id} email`;
  }

  remove(id: number) {
    return `This action removes a #${id} email`;
  }
}
