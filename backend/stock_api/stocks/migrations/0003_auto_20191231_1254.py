# Generated by Django 2.2.4 on 2019-12-31 07:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('stocks', '0002_stocks_created_at'),
    ]

    operations = [
        migrations.AlterField(
            model_name='stocks',
            name='symbol',
            field=models.CharField(max_length=25, unique=True),
        ),
    ]
