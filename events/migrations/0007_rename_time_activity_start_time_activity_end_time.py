# Generated by Django 5.2.1 on 2025-06-22 01:55

from django.db import migrations, models
from datetime import datetime, timedelta

def set_end_time(apps, schema_editor):
    Activity = apps.get_model('events', 'Activity')

    for activity in Activity.objects.all():
        combined_start = datetime.combine(datetime.today(), activity.start_time)
        combined_end = combined_start + timedelta(hours=1)

        activity.end_time = combined_end.time()
        activity.save()

class Migration(migrations.Migration):

    dependencies = [
        ('events', '0006_alter_subscription_uuid'),
    ]

    operations = [
        migrations.RenameField(
            model_name='activity',
            old_name='time',
            new_name='start_time',
        ),
        migrations.AddField(
            model_name='activity',
            name='end_time',
            field=models.TimeField(default=None),
            preserve_default=False,
        ),
        migrations.RunPython(set_end_time)
    ]
