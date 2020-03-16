class EditOffer {
  constructor(data) {
    this.bedrooms = data[`bedrooms`];
    this.city = {
      location: {
        latitude: data.city.location[`latitude`],
        longitude: data.city.location[`longitude`],
        zoom: data.city.location[`zoom`],
      },
      name: data.city[`name`],
    }
    this.description = data[`description`];
    this.goods = data[`goods`];
    this.host = {
      avatar: data.host[`avatar_url`],
      id: data.host[`id`],
      name: data.host[`name`],
      superStar: data.host[`is_pro`]
    };
    this.id = data[`id`];
    this.images = data[`images`];
    this.isFavorite = data[`is_favorite`];
    this.isPremium = data[`is_premium`];
    this.location = {
      latitude: data.location[`latitude`],
      longitude: data.location[`longitude`],
      zoom: data.location[`zoom`],
    }
    this.adults = data[`max_adults`];
    this.preview = data[`preview_image`];
    this.price = data[`price`];
    this.rating = data[`rating`];
    this.title = data[`title`];
    this.type = data[`type`];
  }

  static parseOffer(data) {
    return new EditOffer(data);
  }

  static parseOffers(data) {
    return data.map(EditOffer.parseOffer);
  }

  toRAW() {
    return {
      'bedrooms': this.bedrooms,
      'city': {
        'location': {
          'latitude': this.city.location.latitude,
          'longitude': this.city.location.longitude,
          'zoom': this.city.location.zoom,
        },
        'name': this.city,
      },
      'description': this.description,
      'goods': this.goods,
      'host': {
        'avatar_url': this.host.avatar,
        'id': this.host.id,
        'name': this.host.name,
        'is_pro': this.host.superStar
      },
      'id': this.id,
      'images': this.images,
      'is_favorite': this.isFavorite,
      'is_premium': this.isPremium,
      'location': {
        'latitude': this.location.latitude,
        'longitude': this.location.longitude,
        'zoom': this.location.zoom,
      },
      'max_adults': this.adults,
      'preview_image': this.preview,
      'price': this.price,
      'rating': this.rating,
      'title': this.title,
      'type': this.type
    };
  }
}

export default EditOffer;
