from PIL import Image, ImageDraw, ImageFont
import img2pdf
import qrcode
from io import BytesIO
from django.core.files.base import ContentFile
import os
import re
from django.conf import settings

def generate_certificate_pdf(certificate_uuid, username, activity_tittle, template_path = None):
    def _format_text(text : str) -> list[list[tuple[str, str]]]:
        lines = text.splitlines()

        result_text = []
        for line in lines:
            result_line = []
            fontweight_splitted = re.split(r'(\*\*[^*]+\*\*|\*[^*]+\*)', line)

            for piece in fontweight_splitted:
                if len(piece) == 0:
                    pass
                elif piece.startswith('**') and piece.endswith('**'):
                    result_line.append(('bold', piece[2:-2]))
                elif piece.startswith('*') and piece.endswith('*'):
                    result_line.append(('medium', piece[1:-1]))
                else:
                    result_line.append(('regular', piece))

            if result_line:
                result_text.append(result_line)
            pass

        return result_text

    def _write_on_image(draw_obj, xy : tuple[str, str], text : str, fontsize : int, fill : str = '#2B3722') -> None:
        structured_text = _format_text(text)
        print(structured_text)

        font_regular_path = os.path.join(settings.BASE_DIR, 'static', 'fonts', 'Quicksand-Regular.ttf')
        font_medium_path = os.path.join(settings.BASE_DIR, 'static', 'fonts', 'Quicksand-SemiBold.ttf')
        font_bold_path = os.path.join(settings.BASE_DIR, 'static', 'fonts', 'Quicksand-Bold.ttf')

        font_weight = {
            'regular' : ImageFont.truetype(font_regular_path, fontsize),
            'medium' : ImageFont.truetype(font_medium_path, fontsize),
            'bold' : ImageFont.truetype(font_bold_path, fontsize),
        }

        x, y = xy
        for line in structured_text:
            linesize = sum(map(lambda x: draw_obj.textlength(x[1], font_weight[x[0]]), line))

            x = xy[0]
            for piece in line:
                draw.text(
                    (x - (linesize / 2), y), 
                    piece[1],
                    fill=fill,
                    font=font_weight[piece[0]],
                    anchor="lm"
                )

                piecesize = draw.textlength(piece[1], font_weight[piece[0]])
                x += piecesize

            y += fontsize
        
    template_path = template_path or os.path.join(settings.BASE_DIR, 'static', 'certificates', 'template.jpg')

    image = Image.open(template_path).convert("RGB")
    draw = ImageDraw.Draw(image)

    x, y = 1950, image.height/2

    # TITULO
    _write_on_image(draw, (x, y - 280), '**CERTIFICADO**', 120)

    _write_on_image(
        draw, (x, y),
        f'''
        Certificamos que *{username}* participou\n
        da atividade *{activity_tittle}*\n
        no III Festival da Economia Criativa com carga horária de 4 horas.
        ''',
        fontsize=70
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

    with open('./teste.pdf', 'wb') as f:
        f.write(pdf_buffer.getvalue())

    return ContentFile(pdf_buffer.getvalue(), name=f'certificado_{username}_{activity_tittle}.pdf')