# Generated by Django 3.2.6 on 2021-09-18 09:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0006_meal_item_no'),
    ]

    operations = [
        migrations.AlterField(
            model_name='meal',
            name='url',
            field=models.CharField(default=None, max_length=256),
        ),
    ]