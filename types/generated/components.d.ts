import type { Attribute, Schema } from '@strapi/strapi';

export interface SectionsHero extends Schema.Component {
  collectionName: 'components_decoration_heroes';
  info: {
    icon: 'address-card';
    name: 'Hero';
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
  };
}

export interface SharedSeo extends Schema.Component {
  collectionName: 'components_shared_seos';
  info: {
    icon: 'allergies';
    name: 'Seo';
  };
  attributes: {
    metaDescription: Attribute.Text & Attribute.Required;
    metaTitle: Attribute.String & Attribute.Required;
    shareImage: Attribute.Media<'images'>;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'sections.hero': SectionsHero;
      'shared.seo': SharedSeo;
    }
  }
}
