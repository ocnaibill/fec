# Generated by Django 5.2.1 on 2025-07-15 23:02

import django.db.models.deletion
import django.utils.timezone
import uuid
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('events', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Certificate',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('uuid', models.UUIDField(default=uuid.uuid4, editable=False, unique=True)),
                ('file', models.FileField(blank=True, null=True, upload_to='certificates/')),
                ('created_at', models.DateTimeField(default=django.utils.timezone.now)),
                ('subscription', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='events.subscription')),
            ],
            options={
                'db_table': 'certificates',
            },
        ),
    ]
