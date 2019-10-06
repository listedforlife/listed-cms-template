import React from 'react'
import CMS from 'netlify-cms'
import './cms-utils'

import { HomePageTemplate } from '../templates/HomePage'
import { HomePageTemplate2 } from '../templates/HomePage2'

import { ProductionsPageTemplate } from '../templates/ProductionsPage'
import { ContactPageTemplate } from '../templates/ContactPage'
import { DefaultPageTemplate } from '../templates/ArtistPage'
import { BlogIndexTemplate } from '../templates/BlogIndex'
import { BlogIndexTemplate2 } from '../templates/BlogIndex2'

import { SinglePostTemplate } from '../templates/SinglePost'
import { SinglePostTemplate2 } from '../templates/SinglePost2'
import { ArtistProfileTemplate } from '../templates/ArtistProfile'

if (
  window.location.hostname === 'localhost' &&
  window.localStorage.getItem('netlifySiteURL')
) {
  CMS.registerPreviewStyle(
    window.localStorage.getItem('netlifySiteURL') + '/styles.css'
  )
} else {
  CMS.registerPreviewStyle('/styles.css')
}

CMS.registerPreviewTemplate('home-page', ({ entry }) => (
  <HomePageTemplate {...entry.toJS().data} />
))

CMS.registerPreviewTemplate('home-page2', ({ entry }) => (
  <HomePageTemplate2 {...entry.toJS().data} />
))

CMS.registerPreviewTemplate('artist-page', ({ entry }) => (
  <DefaultPageTemplate {...entry.toJS().data} />
))

CMS.registerPreviewTemplate('productions-page', ({ entry }) => (
  <ProductionsPageTemplate {...entry.toJS().data} />
))
CMS.registerPreviewTemplate('contact-page', ({ entry }) => (
  <ContactPageTemplate {...entry.toJS().data} />
))

CMS.registerPreviewTemplate('blog-page', ({ entry }) => (
  <BlogIndexTemplate {...entry.toJS().data} />
))

CMS.registerPreviewTemplate('blog-page2', ({ entry }) => (
  <BlogIndexTemplate2 {...entry.toJS().data} />
))

CMS.registerPreviewTemplate('posts', ({ entry }) => (
  <SinglePostTemplate {...entry.toJS().data} />
))


CMS.registerPreviewTemplate('posts2', ({ entry }) => (
  <SinglePostTemplate2 {...entry.toJS().data} />
))

CMS.registerPreviewTemplate('artistprofiles', ({ entry }) => (
  <ArtistProfileTemplate {...entry.toJS().data} />
))
