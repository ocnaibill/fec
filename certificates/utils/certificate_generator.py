from PIL import Image, ImageDraw, ImageFont
import img2pdf
import qrcode
from io import BytesIO
from django.core.files.base import ContentFile
import os
from django.conf import settings

def generate_certificate_pdf(certificate_uuid, username, activity_tittle, template_path = None):
    template_path = template_path or os.path.join(settings.BASE_DIR, 'static', 'certificates', 'template.jpg')

    image = Image.open(template_path).convert("RGB")
    draw = ImageDraw.Draw(image)

    font_regular_path = os.path.join(settings.BASE_DIR, 'static', 'fonts', 'Quicksand-Regular.ttf')
    font_medium_path = os.path.join(settings.BASE_DIR, 'static', 'fonts', 'Quicksand-SemiBold.ttf')
    font_bold_path = os.path.join(settings.BASE_DIR, 'static', 'fonts', 'Quicksand-Bold.ttf')

    font_regular = ImageFont.truetype(font_regular_path, 70)
    font_medium = ImageFont.truetype(font_medium_path, 70)
    font_bold = ImageFont.truetype(font_bold_path, 120)

    x, y = 950, image.height/2

    # TITULO
    draw.text(
        (x + 1000, y - 280), 
        'CERTIFICADO',
        fill='#2B3722',
        font=font_bold,
        anchor="mm"
    )

    # PRIMEIRA FRASE
    text = 'Cerficamos que'
    draw.text(
        (x, y), 
        text,
        fill='#2B3722',
        font=font_regular,
        anchor="lm"
    )
    x += draw.textlength(text, font=font_regular)

    text = f' {username} '
    draw.text(
        (x, y), 
        text,
        fill='#2B3722',
        font=font_medium,
        anchor="lm"
    )
    x += draw.textlength(text, font=font_medium)

    text = 'participou'
    draw.text(
        (x, y), 
        text,
        fill='#2B3722',
        font=font_regular,
        anchor="lm"
    )

    # SEGUNDA FRASE
    x = 950
    y += 70
    text = 'da atividade '
    draw.text(
        (x, y), 
        text,
        fill='#2B3722',
        font=font_regular,
        anchor="lm"
    )
    x += draw.textlength(text, font=font_regular)

    text = activity_tittle
    draw.text(
        (x, y), 
        text,
        fill='#2B3722',
        font=font_medium,
        anchor="lm"
    )

    # TERCEIRA FRASE
    x = 950
    y += 70
    text = 'no III Festival da Economia Criativa com carga horária de 4 horas.'
    draw.text(
        (x, y), 
        text,
        fill='#2B3722',
        font=font_regular,
        anchor="lm"
    )

    front_url = os.environ.get('FRONTEND_URL', 'url_do_front')
    qr_link =f'{front_url}/certificates/validate/{certificate_uuid}'
    qr_size = 450

    qr = qrcode.make(qr_link)
    qr = qr.resize((qr_size, qr_size))
    qr = qr.convert("RGB")
    image.paste(qr, (image.width - qr_size - 96, 96))

    img_buffer = BytesIO()
    image.save(img_buffer, format='PNG')
    img_buffer.seek(0)

    pdf_buffer = BytesIO(img2pdf.convert(img_buffer))

    return ContentFile(pdf_buffer.getvalue(), name=f'certificado_{username}_{activity_tittle}.pdf')