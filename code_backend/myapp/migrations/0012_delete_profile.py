# Generated by Django 5.0.6 on 2024-06-24 20:31

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('myapp', '0011_alter_profile_bio_alter_profile_location'),
    ]

    operations = [
        migrations.DeleteModel(
            name='Profile',
        ),
    ]
