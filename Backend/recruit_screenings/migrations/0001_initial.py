# Generated by Django 4.1.4 on 2023-08-14 08:44

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('applications', '0001_initial'),
        ('accounts', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Screening',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('screening_type', models.CharField(choices=[('Test', 'test'), ('Interview', 'interview')], default='Interview', max_length=10)),
                ('schedule', models.DateTimeField()),
                ('place', models.CharField(max_length=255)),
                ('application', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='applications.application')),
                ('hruser', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='accounts.hrusermore')),
            ],
            options={
                'unique_together': {('application', 'screening_type')},
            },
        ),
    ]
