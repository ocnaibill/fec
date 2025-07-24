from celery import shared_task
from django.core.mail import EmailMessage
from .models import Certificate
import logging

logger = logging.getLogger(__name__)

@shared_task
def send_certificate_task(certificate_id):
    """
    Tarefa Celery que busca um certificado pelo ID, monta um e-mail 
    personalizado e o envia com o PDF anexado.
    """
    try:
        certificate = Certificate.objects.get(id=certificate_id)
        
        if not certificate.file:
            logger.warning(f"Certificado {certificate_id} não possui arquivo para ser enviado.")
            return f"Certificado {certificate_id} não possui arquivo."

        user = certificate.user
        
        subject = "Seu Certificado - III Festival da Economia Criativa"
        body = f"""
Olá, {user.name}!

É com grande alegria que enviamos o seu certificado de participação no III Festival da Economia Criativa.
Ele está em anexo neste e-mail.

Agradecemos imensamente a sua presença!

Atenciosamente,
Equipe do Festival da Economia Criativa
"""
        
        email = EmailMessage(
            subject=subject,
            body=body,
            from_email=None, 
            to=[user.email]
        )

        email.attach(
            certificate.file.name.split('/')[-1],
            certificate.file.read(),            
            'application/pdf'                     
        )
        
        email.send()
        
        logger.info(f"E-mail de certificado enviado para {user.email} (Certificado ID: {certificate_id}).")
        return f"E-mail enviado para {user.email} com sucesso."

    except Certificate.DoesNotExist:
        logger.error(f"Tarefa falhou: Certificado com ID {certificate_id} não foi encontrado.")
        return f"Certificado com ID {certificate_id} não encontrado."
    except Exception as e:
        logger.error(f"Falha ao enviar e-mail para certificado {certificate_id}: {e}", exc_info=True)
        return f"Falha ao enviar e-mail para certificado {certificate_id}."