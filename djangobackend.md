# Django Backend Specifications & Data Blueprint for Neom Films

This document contains the complete database schema, Django models, serializers, views, configuration files, and exact raw seed data needed to build and run a Django REST Framework (DRF) backend for the **Neom Films Pvt. Ltd.** website.

You can feed this file directly into any AI assistant to generate the entire Django backend structure seamlessly.

---

## 1. Django Models Schema (`models.py`)

Here is the exact Python/Django representation of the project entities matching the frontend structure.

```python
from django.db import models

class PopupConfig(models.Model):
    """
    Configuration for the home page startup announcement video modal.
    Only one active config should exist.
    """
    show_popup = models.BooleanField(default=True, help_text="Toggle popup visibility at home startup")
    title = models.CharField(max_length=255, default="The Himalayan Peak")
    subtitle = models.CharField(max_length=255, default="Official Trailer")
    video_url = models.URLField(help_text="YouTube Embed URL (e.g., https://www.youtube.com/embed/dQw4w9WgXcQ)")
    description = models.TextField(blank=True, null=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Popup Configuration"
        verbose_name_plural = "Popup Configurations"

    def __str__(self):
        return f"Popup: {self.title} ({'Active' if self.show_popup else 'Disabled'})"


class Movie(models.Model):
    """
    Represent cinematic releases distributed by Neom Films.
    """
    STATUS_CHOICES = [
        ('Now Playing', 'Now Playing'),
        ('Coming Soon', 'Coming Soon'),
        ('Archive', 'Archive'),
    ]

    title = models.CharField(max_length=255)
    description = models.TextField()
    poster = models.URLField(help_text="URL of the movie poster image (portrait ratio)")
    backdrop = models.URLField(help_text="URL of the movie backdrop landscape image")
    trailer = models.URLField(help_text="YouTube embed URL for trailer play")
    release_date = models.DateField(help_text="YYYY-MM-DD format")
    genre = models.CharField(max_length=255, help_text="e.g., Action / Drama")
    rating = models.DecimalField(max_digits=3, decimal_places=1, help_text="Out of 10")
    is_featured = models.BooleanField(default=False, help_text="Whether to highlight in hero slider")
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='Coming Soon')
    studio = models.CharField(max_length=255, default="Universal Pictures")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-release_date']

    def __str__(self):
        return self.title


class Theater(models.Model):
    """
    Partner theater chains showing Neom Films movies.
    """
    name = models.CharField(max_length=255)
    location = models.CharField(max_length=255)
    screens = models.IntegerField(default=1)

    def __str__(self):
        return f"{self.name} - {self.location}"


class Partner(models.Model):
    """
    Global studio partners (represented by logo names).
    """
    name = models.CharField(max_length=255, unique=True)

    def __str__(self):
        return self.name


class GalleryItem(models.Model):
    """
    Media frames (Photos/Videos) showcasing events and behind the scenes.
    """
    CATEGORY_CHOICES = [
        ('Behind the Scenes', 'Behind the Scenes'),
        ('Cast', 'Cast'),
        ('Events', 'Events'),
    ]
    TYPE_CHOICES = [
        ('photo', 'Photo Frame'),
        ('video', 'Video Reel'),
    ]

    title = models.CharField(max_length=255)
    image = models.URLField(help_text="Image file or video thumbnail thumbnail URL")
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES, default='Behind the Scenes')
    type = models.CharField(max_length=10, choices=TYPE_CHOICES, default='photo')
    video_url = models.URLField(blank=True, null=True, help_text="YouTube embed URL (Mandatory if type is 'video')")

    def __str__(self):
        return f"[{self.type.upper()}] {self.title} ({self.category})"


class MerchandiseItem(models.Model):
    """
    Collectible movie merchandise items.
    """
    title = models.CharField(max_length=255)
    price = models.CharField(max_length=100, blank=True, null=True, help_text="e.g. Rs. 1,500. Leave blank/null for N/A")
    image = models.URLField(help_text="Merch catalog picture URL")
    movie = models.CharField(max_length=255, help_text="Associated film name (e.g. Everest: Final Frontier)")

    def __str__(self):
        return f"{self.title} - {self.price or 'N/A'}"
```

---

## 2. API Serializers (`serializers.py`)

Using DRF serializers to output exactly what the frontend expect.

```python
from rest_framework import serializers
from .models import PopupConfig, Movie, Theater, Partner, GalleryItem, MerchandiseItem

class PopupConfigSerializer(serializers.ModelSerializer):
    # Mapping model fields to popupdata.json keys
    showPopup = serializers.BooleanField(source='show_popup')
    videoUrl = serializers.URLField(source='video_url')

    class Meta:
        model = PopupConfig
        fields = ['showPopup', 'title', 'subtitle', 'videoUrl', 'description']


class MovieSerializer(serializers.ModelSerializer):
    # Format release date as YYYY-MM-DD
    releaseDate = serializers.DateField(source='release_date', format='%Y-%m-%d')
    isFeatured = serializers.BooleanField(source='is_featured')

    class Meta:
        model = Movie
        fields = [
            'id', 'title', 'description', 'poster', 'backdrop', 
            'trailer', 'releaseDate', 'genre', 'rating', 
            'isFeatured', 'status', 'studio'
        ]


class TheaterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Theater
        fields = ['name', 'location', 'screens']


class PartnerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Partner
        fields = ['name']


class GalleryItemSerializer(serializers.ModelSerializer):
    # Mapping camelCase videoUrl field
    videoUrl = serializers.URLField(source='video_url', required=False, allow_null=True)

    class Meta:
        model = GalleryItem
        fields = ['id', 'title', 'image', 'category', 'type', 'videoUrl']


class MerchandiseItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = MerchandiseItem
        fields = ['id', 'title', 'price', 'image', 'movie']
```

---

## 3. ViewSets & API Views (`views.py`)

Handles dynamic list retrieving. For settings, the Active PopupConfig is pulled dynamically.

```python
from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import PopupConfig, Movie, Theater, Partner, GalleryItem, MerchandiseItem
from .serializers import (
    PopupConfigSerializer, MovieSerializer, TheaterSerializer, 
    PartnerSerializer, GalleryItemSerializer, MerchandiseItemSerializer
)

class PopupConfigView(APIView):
    """
    Get the single active startup popup config.
    """
    def get(self, request):
        config = PopupConfig.objects.filter(show_popup=True).last()
        if not config:
            # Fallback to disabled popup format
            return Response({"showPopup": False})
        serializer = PopupConfigSerializer(config)
        return Response(serializer.data)


class MovieViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Movie.objects.all()
    serializer_class = MovieSerializer


class TheaterViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Theater.objects.all()
    serializer_class = TheaterSerializer


class PartnerView(APIView):
    """
    Returns global partner array in single flat string list format (matching frontend structure)
    """
    def get(self, request):
        partners = Partner.objects.all().values_list('name', flat=True)
        return Response(list(partners))


class GalleryItemViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = GalleryItem.objects.all()
    serializer_class = GalleryItemSerializer


class MerchandiseItemViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = MerchandiseItem.objects.all()
    serializer_class = MerchandiseItemSerializer
```

---

## 4. Endpoint Routing URL mapping (`urls.py`)

Routing patterns matching `/api/` schema.

```python
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    PopupConfigView, MovieViewSet, TheaterViewSet, 
    PartnerView, GalleryItemViewSet, MerchandiseItemViewSet
)

router = DefaultRouter()
router.register(r'movies', MovieViewSet, basename='movie')
router.register(r'theaters', TheaterViewSet, basename='theater')
router.register(r'gallery', GalleryItemViewSet, basename='gallery')
router.register(r'merchandise', MerchandiseItemViewSet, basename='merchandise')

urlpatterns = [
    path('popup/', PopupConfigView.as_view(), name='popup-config'),
    path('partners/', PartnerView.as_view(), name='partner-list'),
    path('', include(router.urls)),
]
```

---

## 5. Seed / Initial Setup Raw Data

Below is the complete database seed content structured as Django JSON fixture files. Use these to load database seeds immediately.

### File: `popup_fixtures.json`
```json
[
  {
    "model": "api.popupconfig",
    "pk": 1,
    "fields": {
      "show_popup": true,
      "title": "The Himalayan Peak",
      "subtitle": "IKKU 123",
      "video_url": "https://www.youtube.com/embed/dQw4w9WgXcQ",
      "description": "Experience the award-winning epic documentary exploring the untold stories of the Sherpas and the majestic mountains they call home. Now screening in all major theaters."
    }
  }
]
```

### File: `movie_fixtures.json`
```json
[
  {
    "model": "api.movie",
    "pk": 1,
    "fields": {
      "title": "The Himalayan Peak",
      "description": "An epic journey to the roof of the world, exploring the untold stories of the Sherpas and the majestic mountains they call home.",
      "poster": "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=1000",
      "backdrop": "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=1920",
      "trailer": "https://www.youtube.com/embed/dQw4w9WgXcQ",
      "release_date": "2024-06-15",
      "genre": "Documentary / Adventure",
      "rating": "8.5",
      "is_featured": true,
      "status": "Now Playing",
      "studio": "Universal Pictures"
    }
  },
  {
    "model": "api.movie",
    "pk": 2,
    "fields": {
      "title": "Kathmandu Nights",
      "description": "A neon-soaked thriller set in the bustling streets of Kathmandu. A mysterious package leads a local guide into a web of international intrigue.",
      "poster": "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&q=80&w=1000",
      "backdrop": "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&q=80&w=1920",
      "trailer": "https://www.youtube.com/embed/dQw4w9WgXcQ",
      "release_date": "2024-08-20",
      "genre": "Action / Thriller",
      "rating": "7.9",
      "is_featured": true,
      "status": "Now Playing",
      "studio": "Paramount Pictures"
    }
  },
  {
    "model": "api.movie",
    "pk": 3,
    "fields": {
      "title": "Shadows of the Valley",
      "description": "A hauntingly beautiful drama about a young girl who discovers a forgotten secret in the remote valleys of Mustang.",
      "poster": "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&q=80&w=1000",
      "backdrop": "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&q=80&w=1920",
      "trailer": "https://www.youtube.com/embed/dQw4w9WgXcQ",
      "release_date": "2024-12-10",
      "genre": "Drama / Mystery",
      "rating": "9.2",
      "is_featured": true,
      "status": "Coming Soon",
      "studio": "Warner Bros."
    }
  },
  {
    "model": "api.movie",
    "pk": 4,
    "fields": {
      "title": "Everest: The Final Frontier",
      "description": "Experience the thrill and danger of climbing the world's highest peak in stunning 4K cinematography.",
      "poster": "https://images.unsplash.com/photo-1522163182402-834f871fd851?auto=format&fit=crop&q=80&w=1000",
      "backdrop": "https://images.unsplash.com/photo-1522163182402-834f871fd851?auto=format&fit=crop&q=80&w=1920",
      "trailer": "https://www.youtube.com/embed/dQw4w9WgXcQ",
      "release_date": "2025-02-14",
      "genre": "Adventure",
      "rating": "8.8",
      "is_featured": false,
      "status": "Coming Soon",
      "studio": "Disney"
    }
  },
  {
    "model": "api.movie",
    "pk": 5,
    "fields": {
      "title": "Patan's Secret Heritage",
      "description": "A deep dive into the ancient art and architecture of Patan, revealing stories hidden for centuries.",
      "poster": "https://images.unsplash.com/photo-1623492701902-47dc207df5dc?auto=format&fit=crop&q=80&w=1000",
      "backdrop": "https://images.unsplash.com/photo-1623492701902-47dc207df5dc?auto=format&fit=crop&q=80&w=1920",
      "trailer": "https://www.youtube.com/embed/dQw4w9WgXcQ",
      "release_date": "2023-11-01",
      "genre": "Historical",
      "rating": "8.1",
      "is_featured": false,
      "status": "Archive",
      "studio": "Sony Pictures"
    }
  },
  {
    "model": "api.movie",
    "pk": 6,
    "fields": {
      "title": "Gladiator II",
      "description": "Years after witnessing the death of the revered hero Maximus at the hands of his uncle, Lucius is forced to enter the Colosseum.",
      "poster": "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?auto=format&fit=crop&q=80&w=1000",
      "backdrop": "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?auto=format&fit=crop&q=80&w=1920",
      "trailer": "https://www.youtube.com/embed/dQw4w9WgXcQ",
      "release_date": "2024-11-22",
      "genre": "Action / Drama",
      "rating": "8.0",
      "is_featured": true,
      "status": "Coming Soon",
      "studio": "Paramount Pictures"
    }
  }
]
```

### File: `theater_fixtures.json`
```json
[
  { "model": "api.theater", "pk": 1, "fields": { "name": "QFX Cinemas", "location": "Civil Mall, Kathmandu", "screens": 8 } },
  { "model": "api.theater", "pk": 2, "fields": { "name": "Big Movies", "location": "City Center, Kathmandu", "screens": 3 } },
  { "model": "api.theater", "pk": 3, "fields": { "name": "FCube Cinemas", "location": "Chabahil, Kathmandu", "screens": 4 } },
  { "model": "api.theater", "pk": 4, "fields": { "name": "Q's Cinemas", "location": "Rising Mall, Kathmandu", "screens": 2 } },
  { "model": "api.theater", "pk": 5, "fields": { "name": "One Cinemas", "location": "Eyeplex Mall, Kathmandu", "screens": 3 } }
]
```

### File: `partner_fixtures.json`
```json
[
  { "model": "api.partner", "pk": 1, "fields": { "name": "Universal" } },
  { "model": "api.partner", "pk": 2, "fields": { "name": "Warner Bros" } },
  { "model": "api.partner", "pk": 3, "fields": { "name": "Disney" } },
  { "model": "api.partner", "pk": 4, "fields": { "name": "Paramount" } },
  { "model": "api.partner", "pk": 5, "fields": { "name": "Sony" } },
  { "model": "api.partner", "pk": 6, "fields": { "name": "Lionsgate" } }
]
```

### File: `gallery_fixtures.json`
```json
[
  { "model": "api.galleryitem", "pk": 1, "fields": { "title": "Behind the Peaks", "image": "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=1000", "category": "Behind the Scenes", "type": "photo", "video_url": null } },
  { "model": "api.galleryitem", "pk": 2, "fields": { "title": "Kathmandu Set", "image": "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&q=80&w=1000", "category": "Behind the Scenes", "type": "photo", "video_url": null } },
  { "model": "api.galleryitem", "pk": 3, "fields": { "title": "Shadows Cast", "image": "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&q=80&w=1000", "category": "Cast", "type": "photo", "video_url": null } },
  { "model": "api.galleryitem", "pk": 4, "fields": { "title": "Red Carpet Premier", "image": "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=1000", "category": "Events", "type": "photo", "video_url": null } },
  { "model": "api.galleryitem", "pk": 5, "fields": { "title": "Press Meet", "image": "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=1000", "category": "Events", "type": "photo", "video_url": null } },
  { "model": "api.galleryitem", "pk": 6, "fields": { "title": "Cine Award", "image": "https://images.unsplash.com/photo-1517604417747-8251633d0f70?auto=format&fit=crop&q=80&w=1000", "category": "Events", "type": "photo", "video_url": null } },
  { "model": "api.galleryitem", "pk": 7, "fields": { "title": "Making of The Himalayan Peak", "image": "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=1000", "category": "Behind the Scenes", "type": "video", "video_url": "https://www.youtube.com/embed/dQw4w9WgXcQ" } },
  { "model": "api.galleryitem", "pk": 8, "fields": { "title": "Kathmandu Nights - Director's Interview", "image": "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&q=80&w=1000", "category": "Cast", "type": "video", "video_url": "https://www.youtube.com/embed/dQw4w9WgXcQ" } },
  { "model": "api.galleryitem", "pk": 9, "fields": { "title": "Shadows of the Valley - Official Teaser", "image": "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&q=80&w=1000", "category": "Behind the Scenes", "type": "video", "video_url": "https://www.youtube.com/embed/dQw4w9WgXcQ" } },
  { "model": "api.galleryitem", "pk": 10, "fields": { "title": "Grand Premier Highlights", "image": "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=1000", "category": "Events", "type": "video", "video_url": "https://www.youtube.com/embed/dQw4w9WgXcQ" } }
]
```

### File: `merchandise_fixtures.json`
```json
[
  { "model": "api.merchandiseitem", "pk": 1, "fields": { "title": "Limited Edition Everest Cap", "price": "Rs. 1,500", "image": "https://images.unsplash.com/photo-1588850561447-417f33188db4?auto=format&fit=crop&q=80&w=1000", "movie": "Everest: Final Frontier" } },
  { "model": "api.merchandiseitem", "pk": 2, "fields": { "title": "Kathmandu Nights Poster", "price": "Rs. 800", "image": "https://images.unsplash.com/photo-1513364233939-b84920c999c1?auto=format&fit=crop&q=80&w=1000", "movie": "Kathmandu Nights" } },
  { "model": "api.merchandiseitem", "pk": 3, "fields": { "title": "Peak Adventure Backpack", "price": "Rs. 4,500", "image": "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=1000", "movie": "The Himalayan Peak" } },
  { "model": "api.merchandiseitem", "pk": 4, "fields": { "title": "Sherpa Story Hoodie", "price": "Rs. 2,800", "image": "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=1000", "movie": "The Himalayan Peak" } },
  { "model": "api.merchandiseitem", "pk": 5, "fields": { "title": "Neom Films Vintage T-Shirt", "price": null, "image": "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&q=80&w=1000", "movie": "General Release" } }
]
```
