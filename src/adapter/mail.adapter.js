const transporter = require('../utils/nodemailer.util');
const { userEmail } = require('../configs/app.config');

class MailAdapter {
    async sendMessage(messageInfo) {
        try {
            await transporter.sendMail({
                from: userEmail,
                to: messageInfo.email,
                subject: 'DG Accesorios',
                html: `
                    <h1>Hola ${messageInfo.first_name}</h1>
                    <p>Nuestras promociones</p>
                `,
               });
            console.log('Mensaje enviado correctamente');
        } catch (error) {
            console.error('Error al enviar el mensaje:', error.message);
        }
    }
}

module.exports = MailAdapter;
