from django.db import models
from django.contrib.auth.models import AbstractUser, Group, Permission
from django.db.models.signals import post_save
import numpy as np
from PIL import Image as PILImage
import base64
import io
import binascii
# Create your models here.

class User(AbstractUser):
    groups = models.ManyToManyField(
        Group,
        related_name='myapp_user_set',  # Custom related name
        blank=True,
        help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.',
        related_query_name='user',
    )
    user_permissions = models.ManyToManyField(
        Permission,
        related_name='myapp_user_set',  # Custom related name
        blank=True,
        help_text='Specific permissions for this user.',
        related_query_name='user',
    )
    username = models.CharField(default="", max_length=100)
    email = models.EmailField(unique = True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    def profile(self):
        profile = Profile.objects.get(user=self)

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    full_name = models.CharField(default="", max_length=100)
    bio = models.CharField(default="", max_length=1000)
    verified = models.BooleanField(default = False)

def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)

def save_user_profile(sender, instance, **kwargs):
    instance.profile.save()

post_save.connect(create_user_profile, sender=User)
post_save.connect(save_user_profile, sender=User)

class Image(models.Model):
    image = models.BinaryField()

    def save_image_as_array(self, image_data):
        if isinstance(image_data, str) and image_data.startswith("data:"):
            try:
                # Extract the base64 portion of the data URL
                header, encoded = image_data.split(",", 1)
                self.image = base64.b64decode(encoded)
            except (ValueError, binascii.Error) as e:
                print(f"Error decoding base64 image data: {e}")
                raise
        else:
            try:
                # Handle file upload
                pil_image = PILImage.open(image_data)
                image_array = np.array(pil_image)
                print(f"Image array shape: {image_array.shape}")

                # Convert the image to bytes (e.g., in PNG format)
                with io.BytesIO() as output:
                    pil_image.save(output, format="PNG")
                    self.image = output.getvalue()
            except Exception as e:
                print(f"Error processing image file: {e}")
                raise

        # Save the image to the database
        self.save()

class ChatHistory(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    result = models.TextField()
    image = models.ForeignKey(Image, on_delete=models.CASCADE, null=True, blank=True)
    timestamp = models.DateTimeField(auto_now_add=True)


# class History(models.Model):
#     user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='history')
#     result = models.TextField()
#     image = models.ImageField(upload_to='history_images/', null=True, blank=True)
#     created_at = models.DateTimeField(auto_now_add=True)