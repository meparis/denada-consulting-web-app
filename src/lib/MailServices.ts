import axios, { AxiosError, AxiosInstance } from 'axios';
import { z } from 'zod';

// Constants
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000;
const TIMEOUT = 5000;
const MAX_CONTENT_LENGTH = 100000;
const DEFAULT_WEBHOOK_URL =
  'https://hook.eu1.make.com/aywkrgj55uaqrx4f71ib03rjnw5qsrxl';

// Schéma de validation
const MailPayloadSchema = z.object({
  lang: z.string().min(2).max(5),
  to: z.string().email('Invalid email format'),
  subject: z.string().min(1).max(255),
  content: z.string().min(1).max(MAX_CONTENT_LENGTH),
});

type MailPayload = z.infer<typeof MailPayloadSchema>;

export class MailService {
  private axiosInstance: AxiosInstance;
  private static instance: MailService;

  constructor(private webhookUrl: string = DEFAULT_WEBHOOK_URL) {
    this.axiosInstance = axios.create({
      timeout: TIMEOUT,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  /**
   * Envoie un mail via un webhook
   * @param lang La langue du message
   * @param to Le destinataire de l'email
   * @param subject Le sujet de l'email
   * @param content Le contenu du mail
   */
  async sendMail(
    lang: string,
    to: string,
    subject: string,
    content: string
  ): Promise<string> {
    try {
      // Validation avec Zod
      const payload = await this.validatePayload({
        lang,
        to,
        subject,
        content,
      });

      return await this.sendWithRetry(payload);
    } catch (error) {
      // Log l'erreur détaillée mais renvoie le message générique pour la compatibilité
      const errorMessage = this.handleError(error);
      console.error(errorMessage);
      throw new Error('Mail sending failed.');
    }
  }

  private async validatePayload(payload: MailPayload): Promise<MailPayload> {
    try {
      return MailPayloadSchema.parse(payload);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const issues = error.errors
          .map((e) => `${e.path.join('.')}: ${e.message}`)
          .join(', ');
        console.error(`Validation failed: ${issues}`);
      }
      throw error;
    }
  }

  private async sendWithRetry(
    payload: MailPayload,
    attempt = 1
  ): Promise<string> {
    try {
      // Vérification payload vide
      if (Object.values(payload).some((value) => !value)) {
        throw new Error('Empty payload detected');
      }

      const response = await this.axiosInstance.post(this.webhookUrl, payload);

      if (!response.data) {
        throw new Error('Empty response received');
      }

      console.debug(`Mail sent successfully on attempt ${attempt}`);
      console.debug(`Réponse du webhook : ${JSON.stringify(response.data)}`);
      return `Mail sent successfully`;
    } catch (error) {
      if (attempt < MAX_RETRIES) {
        console.warn(
          `Attempt ${attempt} failed, retrying in ${RETRY_DELAY}ms...`
        );
        await this.delay(RETRY_DELAY);
        return this.sendWithRetry(payload, attempt + 1);
      }
      throw error;
    }
  }

  private handleError(error: unknown): string {
    if (error instanceof z.ZodError) {
      return `Validation error: ${error.errors.map((e) => e.message).join(', ')}`;
    }

    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;

      if (!axiosError.response) {
        console.error('Erreur réseau:', axiosError.message);
        return `Network error: ${axiosError.message}`;
      }

      console.error(
        "Erreur lors de l'envoi du mail :",
        axiosError.response?.data || axiosError.message
      );

      return `HTTP error ${axiosError.response.status}: ${axiosError.message}`;
    }

    if (error instanceof Error) {
      console.error("Erreur lors de l'envoi du mail :", error.message);
      return `Error: ${error.message}`;
    }

    console.error("Erreur inconnue lors de l'envoi du mail :", error);
    return 'An unknown error occurred';
  }

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
