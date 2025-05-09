# Generated by Django 5.1.7 on 2025-03-27 15:02

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Property',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('location', models.CharField(max_length=255)),
                ('size', models.FloatField()),
                ('bedrooms', models.IntegerField()),
                ('bathrooms', models.IntegerField()),
                ('amenities', models.TextField()),
                ('price', models.FloatField()),
            ],
        ),
    ]
